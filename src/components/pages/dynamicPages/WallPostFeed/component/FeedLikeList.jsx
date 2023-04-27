import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Image, Feed, Icon, Button, Card, Modal, List, } from "semantic-ui-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { PATCH, POST } from "../../../../../Services";
import { getUser, ListPlaceholder, makeUserProfileImgURL, trimUserName } from "../../../../../utils/common";
import "../../../../sub-component/postCard/style.css";

let fetchFeedLikeObj = {
  "userId": "",
  "feedId": "",
  "pageNumber": 0,
  "pageLimit": 10
};

let defaultObj = {
  isLoader: false,
  isLikeLoader: true,
  commentLoader: false,
  totalCommentCount: 0,
  userCommentData: [],
  commentInput: false,
  commentValue: '',
  commentReplyValue: '',
  likeCount: 0,
  isLike: 0,
  likeData: [],
  isFollow: 0,
  followLabel: "Follow",
  isSaved: 0,
  commentSubReplyValue: ''
};

const FeedLikeList = ({ item, user, likeCount }) => {
  let router = useHistory();
  let loggedUser = getUser();
  fetchFeedLikeObj.userId = loggedUser._id;
  const [state, setState] = useState(defaultObj);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(0);

  useEffect(() => {
    function callEffect() {
      try {
        let _isFollowLabel = item.isFollow === 0 ? "Follow" : "Unfollow"
        setState((pre) => ({ ...pre, isLike: item.isLike, likeCount: likeCount, followLabel: _isFollowLabel, isSaved: item.isSave }));
      } catch (er) { console.log(er); };
    }; callEffect();
  }, [likeCount])

  const likeDisLikeBtn = async () => {
    try {
      let _isLike = 0, _likeCount = parseInt(state.likeCount);
      if (state.isLike === 1) {
        _likeCount -= 1;
      } else {
        _isLike = 1;
        _likeCount += 1;
      };
      setState((pre) => ({ ...pre, isLike: _isLike, likeCount: _likeCount }));
      await PATCH('/feed/like-dislike-feed', item.id, { action: _isLike, userId: loggedUser._id });
    } catch (er) { console.log(er); };
  };

  const fetchUserLikeList = useCallback(async () => {
    try {
      setLoader(0)
      if (state.likeCount === "0") { return };
      fetchFeedLikeObj.feedId = item?.id;
      fetchFeedLikeObj.pageNumber = 0;
      let { status, message, payload } = await POST('/feed/fetch-all-user-likes', fetchFeedLikeObj);
      if (status === 0) { return console.log(message); };
      setLoader(status)
      setState((pre) => ({ ...pre, likeData: payload }));
      setOpen(true);
    } catch (er) { console.log(er); };
  });

  const fetchMoreUserLikeList = useCallback(async () => {
    try {
      setLoader(0)
      setState((pre) => ({ ...pre, isLikeLoader: true }));
      fetchFeedLikeObj.pageNumber += 1;
      let { status, message, payload } = await POST('/feed/fetch-all-user-likes', fetchFeedLikeObj);
      setState((pre) => ({ ...pre, isLikeLoader: false }));
      if (status === 0) { return console.log(message); };
      setLoader(status)
      let feedLikeData = state.likeData || [];
      if (feedLikeData.length > 250) { feedLikeData = []; };
      feedLikeData.push(...payload);
      setState((pre) => ({ ...pre, likeData: feedLikeData }));
    } catch (er) { console.log(er); };
  });

  const followUserBtn = async (likeItem, index) => {
    try {
      let isStatus = 0;
      if (likeItem.statusType === "Follow") { isStatus = 1; };
      let followObj = {
        "userId": loggedUser._id,
        "followedUserId": likeItem.id,
        "status": isStatus
      };
      const { status, payload } = await POST('/user/follow-unfollow-user', followObj);
      if (status === 0) { return };
      let _likeData = state.likeData;
      _likeData[index].statusType = payload.statusType;
      setState((pre) => ({ ...pre, likeData: [] }));
      setState((pre) => ({ ...pre, likeData: _likeData }));
    } catch (er) { console.log(er); };
  };

  const userProfile = (item) => {
    try {
      let name = item.tiktokName ? item.tiktokName : item.name;
      router.push({
        pathname: "/user-profile/" + name,
        state: { id: item.id },
      });
      window.location.reload();
    } catch (er) { console.log(er); };
  };

  return (
    <>
      <Feed.Like>
        <Card.Content onClick={() => likeDisLikeBtn()}>
          {state.isLike == 0 ? <Icon name="heart outline" fitted />
            : <Icon name='like' color="red" fitted />
          }
        </Card.Content> &nbsp;
        <Card.Content onClick={() => fetchUserLikeList()}> {state.likeCount}{" "}
          {(state.likeCount === 0 || state.likeCount === 1) ? <> Like</> : <>Likes</>}
        </Card.Content>
      </Feed.Like>

      <Modal
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        closeIcon
        size="tiny"
      >
        <Modal.Header>
          <Icon name="heart" color="red" /> Likes
        </Modal.Header>
        <Modal.Content scrolling >
          <List verticalAlign='middle'>
            {
              loader === 0 ?
                <ListPlaceholder listCount={fetchFeedLikeObj.pageLimit} />
                :
                <>
                  {(state.likeData || []).map((likeItem, index) => {
                    return <List.Item key={likeItem.id} style={{ marginBottom: '5px' }}>
                      {likeItem.statusType ?
                        <List.Content floated='right'>
                          <Button primary circular compact onClick={() => followUserBtn(likeItem, index)} style={{ width: "120px" }}>
                            <Icon name={likeItem.statusType === "Follow" ? "add user" : "user delete"} />   {likeItem.statusType}
                          </Button>
                        </List.Content>
                        : ""}
                      <Image avatar src={makeUserProfileImgURL(likeItem.profilePic)} />
                      <List.Content as={"a"} onClick={() => userProfile(likeItem)} title={likeItem.tiktokName}>
                        {trimUserName(likeItem.tiktokName, 15)}
                        <List.Description>{trimUserName(likeItem.name, 15)}</List.Description>
                      </List.Content>
                    </List.Item>
                  })}
                </>
            }
          </List>
        </Modal.Content>
        {state.likeCount > 10 &&
          <Modal.Actions>
            <>
              Showing {state.likeData.length} of {state.likeCount}
              <Button compact onClick={() => fetchMoreUserLikeList()} >
                View More
              </Button>
            </>
          </Modal.Actions>
        }
      </Modal >
    </>
  );
};

export default React.memo(FeedLikeList);