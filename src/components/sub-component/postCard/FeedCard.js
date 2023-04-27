import React, { useCallback, useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import moment from "moment";
import { Image, Feed, Icon, Comment, Button, Card, Header, Dropdown, Modal, Segment, Input, Popup, Loader, List, } from "semantic-ui-react";
import ReactPlayer from 'react-player';
import "./style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { DELETE, PATCH, POST } from "../../../Services";
import { getUser, makeUserProfileImgURL } from "../../../utils/common";
import Assets from "../../../assets/Assets.js";

const dropdownOptions = [
  { key: "1", text: "Share", icon: "share alternate" },
  { key: "3", text: "Report", icon: "warning sign" },
  { key: "2", text: "Block", icon: "dont" }
];

let fetchFeedCommentObj = {
  "userId": "",
  "feedId": "",
  "pageNumber": 0,
  "pageLimit": 10,
  "timeZone": ""
};

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


const FeedCard = ({ avatar, item, user, postTime, mediaUrls = [], likeCount, commentCount, shareCount }) => {
  const [state, setState] = useState(defaultObj);
  const [open, setOpen] = useState(false);

  let loggedUser = getUser();
  fetchFeedCommentObj.userId = loggedUser._id;
  fetchFeedLikeObj.userId = loggedUser._id;

  useEffect(() => {
    function callEffect() {
      try {
        let _isFollowLabel = item.isFollow === 0 ? "Follow" : "Unfollow"
        setState((pre) => ({ ...pre, isLike: item.isLike, likeCount: likeCount, followLabel: _isFollowLabel, isSaved: item.isSave }));
      } catch (er) { console.log(er); };
    }; callEffect();
  }, [likeCount])

  const commentHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setState((pre) => ({
      ...pre,
      [name]: value
    }));
  };

  const commentHandlerEnter = (e, item, index) => {
    if (e.key === 'Enter') {
      if (e.target.name === 'commentValue') {
        replyCommentBtn();
      } else {
        replyOnCommentBtn(item, index);
      }
    }
  }

  const replyCommentLinkBtn = (index) => {
    try {
      let userFeedData = state.userCommentData;
      userFeedData[index].replyCommentBox = 1;
      setState((pre) => ({ ...pre, userCommentData: userFeedData }));
    } catch (er) { console.log(er); };
  };

  const replySubCommentLinkBtn = (item, index, subItem, sIndex) => {
    try {
      let feedComData = state.userCommentData;
      feedComData[index].reply[sIndex].replySubCommentBox = 1;
      setState((pre) => ({ ...pre, userCommentData: feedComData }));
    } catch (er) { console.log(er); };
  };


  const replyCommentBtn = async () => {
    try {
      let value = state.commentValue;
      if (!value) { return };
      let { status, payload } = await POST("/feed/add-feed-comment", { userId: loggedUser._id, feedId: item.id, comment: value });
      if (status === 0) { return };
      let commentObjInfo = {
        createdAt: new Date(),
        feedTime: moment(new Date()).fromNow(),
        comment: value,
        userInfo: {
          id: loggedUser._id,
          first_name: loggedUser.Name,
          profile_pic: '',
        },
        id: payload._id,
        reply: []
      };
      let allComment = state.userCommentData || [];
      allComment = [commentObjInfo].concat(allComment);
      setState((pre) => ({ ...pre, userCommentData: allComment, commentValue: '' }));
    } catch (er) { console.log(er); };
  };

  const replyOnCommentBtn = async (itemRepCom, index) => {
    try {
      let value = state.commentReplyValue;
      if (!value) { return };
      let replyData = itemRepCom.reply;

      let repCommentObj = {
        userId: loggedUser._id,
        feedId: item.id,
        commentId: itemRepCom.id,
        comment: value,
        replyTo: "Vishwajeet Sharma"
      };
      let { status, payload } = await POST("/feed/add-feed-comment", repCommentObj);
      if (status === 0) { return };

      let replyObj = {
        createdAt: new Date(),
        id: payload._id,
        feedTime: moment(new Date()).fromNow(),
        userInfo: {
          id: loggedUser._id,
          first_name: loggedUser.Name,
          profile_pic: '',
        },
        comment: value
      };
      replyData = [replyObj].concat(replyData);
      let userComm = state.userCommentData;
      userComm[index].reply = replyData;
      setState((pre) => ({ ...pre, userCommentData: userComm, commentReplyValue: '' }));
    } catch (er) { console.log(er); };
  };


  const replyOnCommentReplyBtn = () => {
    try {
      let value = state.commentValue;
      let commentObjInfo = {
        createdAt: new Date(),
        comment: value,
        userInfo: {
          first_name: loggedUser.Name,
          profile_pic: '',
        },
        reply: [{ adf: "adsf" }]
      };
      let allComment = state.userCommentData || [];
      allComment.push(commentObjInfo);
      setState((pre) => ({ ...pre, userCommentData: allComment, commentValue: '' }));
    } catch (er) { console.log(er); };
  };


  const fetchFeeComment = useCallback(async () => {
    try {
      showCommentInput();
      fetchFeedCommentObj.feedId = item.id;
      fetchFeedCommentObj.pageNumber = 0;
      // fetchCommentAPI();
      setState((pre) => ({ ...pre, isLoader: true }));
      let { status, totalPages, message, payload } = await POST('/feed/fetch-all-feed-comment', fetchFeedCommentObj);
      setState((pre) => ({ ...pre, isLoader: false }));
      if (status === 0) { return console.log("Fetch Feed Data ", message); };
      let feedObjData = [];
      if (feedObjData.length > 250) { feedObjData = []; };
      feedObjData.push(...payload);
      setState((pre) => ({
        ...pre,
        totalCommentCount: totalPages,
        userCommentData: feedObjData
      }));
    } catch (er) { console.log(er); };
  });

  const fetchMoreFeedComment = useCallback(async () => {
    try {
      setState((pre) => ({ ...pre, isLoader: true }));
      fetchFeedCommentObj.pageNumber += 1;
      let { status, totalPages, message, payload } = await POST('/feed/fetch-all-feed-comment', fetchFeedCommentObj);
      setState((pre) => ({ ...pre, isLoader: false }));
      if (status === 0) { return console.log("Fetch More Feed Data ", message); };
      let feedObjData = state.userCommentData || [];
      if (feedObjData.length > 250) { feedObjData = []; };
      feedObjData.push(...payload);
      setTimeout(() => {
        setState((pre) => ({
          ...pre,
          totalCommentCount: totalPages,
          userCommentData: feedObjData
        }));
      }, 2);
    } catch (er) { console.log(er); };
  });

  const fetchCommentAPI = async () => {
    try {
      setState((pre) => ({ ...pre, isLoader: true }));
      let { status, totalPages, message, payload } = await POST('/feed/fetch-all-feed-comment', fetchFeedCommentObj);
      setState((pre) => ({ ...pre, isLoader: false }));
      if (status === 0) { return console.log("Fetch Feed Comment Data ", message); };
      let feedObjData = [];
      if (feedObjData.length > 250) { feedObjData = []; };
      feedObjData.push(...payload);
      setState((pre) => ({
        ...pre,
        totalCommentCount: totalPages,
        userCommentData: feedObjData
      }));
    } catch (er) { console.log(er); };
  };

  const showCommentInput = () => {
    try {
      setTimeout(() => {
        setState((pre) => ({ ...pre, commentInput: true }));
      }, 12);
    } catch (er) { console.log(er); };
  };

  const deleteComment = async (itemC, index) => {
    try {
      await DELETE('/feed/delete-feed-comment', itemC.id);
      let userComm = state.userCommentData;
      let filterCommentData = userComm.filter((item) => {
        return item.id !== itemC.id
      });
      setState((pre) => ({ ...pre, userCommentData: filterCommentData }));
    } catch (er) { console.log(er); };
  };

  const deleteCommentReply = async (itemC, sindex, index) => {
    try {
      await DELETE('/feed/delete-feed-comment', itemC.id);
      let replyComment = state.userCommentData;
      let userComm = replyComment[index].reply;
      let filterCommentData = userComm.filter((item) => {
        return item.id !== itemC.id
      });
      replyComment[index].reply = filterCommentData;
      setState((pre) => ({ ...pre, userCommentData: replyComment }));
    } catch (er) { console.log(er); };
  };

  /* Feed User Like Include  */
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
      fetchFeedLikeObj.feedId = item?.id;
      fetchFeedLikeObj.pageNumber = 0;
      let { status, message, payload } = await POST('/feed/fetch-all-user-likes', fetchFeedLikeObj);
      if (status === 0) { return console.log(message); };
      setState((pre) => ({ ...pre, likeData: payload }));
      setOpen(true);
    } catch (er) { console.log(er); };
  });

  const fetchMoreUserLikeList = useCallback(async () => {
    try {
      setState((pre) => ({ ...pre, isLikeLoader: true }));
      fetchFeedLikeObj.pageNumber += 1;
      let { status, message, payload } = await POST('/feed/fetch-all-user-likes', fetchFeedLikeObj);
      setState((pre) => ({ ...pre, isLikeLoader: false }));
      if (status === 0) { return console.log("Fetch More Feed Like Data ", message); };
      let feedLikeData = state.likeData || [];
      if (feedLikeData.length > 250) { feedLikeData = []; };
      feedLikeData.push(...payload);
      setState((pre) => ({ ...pre, likeData: feedLikeData }));
    } catch (er) { console.log(er); };
  });
  /* Feed User Like Exclude  */

  const followUserBtn = async () => {
    try {
      let isStatus = 0;
      if (state.followLabel === "Follow") {
        isStatus = 1;
      }
      let followObj = {
        "userId": loggedUser._id,
        "followedUserId": user.id,
        "status": isStatus
      };
      const { status, payload } = await POST('/user/follow-unfollow-user', followObj);
      if (status === 0) { return };
      setState((pre) => ({ ...pre, isFollow: 1, followLabel: payload.statusType }));
    } catch (er) { console.log(er); };
  };

  const saveRemoveFeedBtn = async () => {
    try {
      let isSave = state.isSaved === 1 ? 0 : 1;
      const saveDelObj = {
        "userId": loggedUser._id,
        "feedId": item.id,
      };
      const { status, payload } = await POST('/feed/save-feed-post', saveDelObj);
      if (payload.deletedCount === 1) { isSave = 0; };
      if (status === 0) { return };
      setState((pre) => ({ ...pre, isSaved: isSave }));
    } catch (er) { console.log(er); };
  };

  return (
    <>
      <Card color="blue" fluid >
        <Card.Content className="post-feed-header" >
          <Feed>
            <Feed.Event>
              <Feed.Label >
                {avatar ? <Image src={avatar} /> : <Icon name="user" circular color="grey" />}
              </Feed.Label>
              <Feed.Content className="head-label">
                <Feed.Summary><a>{user.first_name ? user.first_name : "Profile Name"}</a></Feed.Summary>
                <Feed.Meta>
                  {postTime ? <Feed.Date content={`${moment(new Date(postTime)).fromNow()}`} /> : ""}
                </Feed.Meta>
              </Feed.Content>
              <Feed.Extra>
                {user.id !== loggedUser._id ?
                  <>
                    <Button color="blue" basic circular compact onClick={() => followUserBtn()}>
                      <Icon name={state.followLabel === "Follow" ? "add user" : "user delete"} />   {state.followLabel}
                    </Button>&nbsp;
                    <Icon link name={state.isSaved === 0 ? "bookmark outline" : "bookmark"}
                      circular color="blue" fitted onClick={() => saveRemoveFeedBtn()}
                    />&nbsp;
                    <Dropdown icon="ellipsis vertical" direction="left" as="h5" className="dropdown-dots">
                      <Dropdown.Menu>
                        {(dropdownOptions || []).map((option) => (
                          <Dropdown.Item key={option.value}{...option} />))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                  : null}
              </Feed.Extra>
            </Feed.Event>
          </Feed>
          <Card.Description style={{ paddingTop: '6px', paddingBottom: '6px' }}>{item.payload}</Card.Description>
        </Card.Content>
        <div style={{ background: "#000" }}>        {mediaUrls.length > 0 ? <Carousel
          infiniteLoop
          useKeyboardArrows
          autoPlay
          showThumbs={false}
          showIndicators={false}
          className="crousel-slider-box"
        >
          {(mediaUrls || []).map((mItem, index) => {
            let src = mItem.src ? mItem.src : mItem;
            let thumbUrl = mItem.thumbUrl ? mItem.thumbUrl : mItem;
            let isVideo = false;
            let mp4 = src.search(".mp4"), mov = src.search(".mov"), avi = src.search(".avi");

            if (mp4 > 0 || mov > 0 || avi > 0) { isVideo = true };
            return <React.Fragment key={index}>
              {isVideo === false ?
                <div className="content-slider">
                  <Image src={src} centered className="content-container" />
                </div>
                :
                <div className="video-player">
                  <ReactPlayer
                    playing={true}
                    light={thumbUrl}
                    url={src}
                    controls={true}
                  />
                </div>
              }
            </React.Fragment>
          })}
        </Carousel> : <Image src={Assets.defaultPlaceholders.waterMarkSq.img} alt={Assets.defaultPlaceholders.waterMarkSq.alt} centered style={{ height: "500px" }} />}
        </div>

        <Card.Content className="post-feed-footer" >
          <div className="post-feed-footer-icon">
            <Header as="a">
              <Feed.Like>
                <Card.Content onClick={() => likeDisLikeBtn()}>
                  {state.isLike === 0 ? <Icon name="heart outline" fitted />
                    : <Icon name='like' color="red" fitted />
                  }
                </Card.Content> &nbsp;
                <Card.Content onClick={() => fetchUserLikeList()}> {state.likeCount}{" "}
                  {(state.likeCount === 0 || state.likeCount === 1) ? <> Like</> : <>Likes</>}
                </Card.Content>
              </Feed.Like>
            </Header>

            <Header as="a">
              <Feed.Like onClick={() => fetchFeeComment()}>
                <Card.Content as="a" >
                  <Icon name='comment outline' fitted /> {commentCount}
                </Card.Content> {" "}
                <span>Comment</span>
              </Feed.Like>
            </Header>

            <Header as="a">
              <Feed.Like>
                <Icon name='share' fitted /> {shareCount} Share
              </Feed.Like>
            </Header>
          </div>
        </Card.Content>

        {/* {state.commentInput === true ?
          <Input fluid placeholder='Comment...'
            value={state.commentValue}
            name="commentValue"
            onKeyPress={commentHandlerEnter}
            onChange={commentHandler}
            icon={<Icon name='send' inverted circular link onClick={() => replyCommentBtn()} />} />
          : false}

        {state.userCommentData.length > 0 ?
          <Card.Content className="feed-comment-section">
            {state.isLoader === true ? <Loader active inline='centered' /> : ""}
            <Comment.Group>
              {((state.userCommentData || []).map((item, index) => {
                return <Comment key={index}>
                  <Comment.Avatar circular src={makeUserProfileImgURL(item.userInfo.profile_pic)} />
                  <Comment.Content>
                    <Comment.Author as='a'>{item.userInfo.first_name}</Comment.Author>
                    <Comment.Metadata>
                      <div>{item.feedTime}
                      </div>

                    </Comment.Metadata>
                    {loggedUser._id === item.userInfo.id ?
                      <Icon name='trash' fitted color='red'
                        style={{ float: 'right', paddingTop: '3px', cursor: 'pointer' }}
                        onClick={() => deleteComment(item, index)}
                      />
                      : ""}

                    <Comment.Text>
                      {item.comment.length > 70 ?
                        <>
                          {item.comment.substr(0, 69)}
                          <Popup
                            trigger={<Card.Content as="a">... More </Card.Content>}
                            content={item.comment} basic
                            position='top center'
                          />
                        </>
                        : <>{item.comment}</>
                      }
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action onClick={() => replyCommentLinkBtn(index)} as="a">Reply</Comment.Action>
                      {item.replyCommentBox === 1 ?
                        <Input placeholder='Reply Comment...'
                          value={state.commentReplyValue}
                          name="commentReplyValue"
                          onKeyPress={(e) => commentHandlerEnter(e, item, index)}
                          onChange={commentHandler}
                          icon={<Icon name='send' inverted circular link onClick={() => replyOnCommentBtn(item, index)} />} />
                        : ""}
                    </Comment.Actions>
                  </Comment.Content>

                  {item.reply.length ?
                    <Comment.Group size="mini">
                      {((item.reply || []).map((subItem, sIndex) => {
                        return <Comment key={sIndex}>
                          <Comment.Avatar circular src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                          <Comment.Content>
                            <Comment.Author as='a'>{subItem.userInfo.first_name}</Comment.Author>
                            <Comment.Metadata>
                              <div>{subItem.feedTime} &nbsp;&nbsp;&nbsp;
                                {loggedUser._id === subItem.userInfo.id ?
                                  <Icon name='trash' fitted color='red' style={{ float: 'right', paddingTop: '0px', cursor: 'pointer' }}
                                    onClick={() => deleteCommentReply(subItem, sIndex, index)}
                                  />
                                  : ""}
                              </div>
                            </Comment.Metadata>
                            <Comment.Text>
                              {subItem.comment}

                            </Comment.Text>
         
                          </Comment.Content>

                        </Comment>
                      }))}
                    </Comment.Group>
                    : ""}
                </Comment>
              }))}
            </Comment.Group>
            {state.totalCommentCount > 10 ?
              <Card.Description as="a" onClick={() => fetchMoreFeedComment()}>
                View more comment <span style={{ float: 'right' }}>{state.userCommentData.length} of {state.totalCommentCount}</span>
              </Card.Description>
              : ""}
          </Card.Content>
          : ""} */}
      </Card>

      {/* <Modal
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        size="tiny"
      >
        <Modal.Header>
          <Header as='h3'>
            <Icon name="heart" color="red" />
          </Header>
        </Modal.Header>

        <Modal.Content scrolling style={{ minHeight: '320px', maxHeight: '440px' }}>
          <List verticalAlign='middle'>
            {(state.likeData || []).map((likeItem) => {
              return <List.Item key={likeItem.id} style={{ marginBottom: '5px' }}>
                {likeItem.statusType ?
                  <List.Content floated='right'>
                    <Button circular basic compact icon labelPosition="right" color="blue" >{likeItem.statusType}<Icon name="plus" /></Button>
                  </List.Content>
                  : ""}
                <Image avatar src={makeUserProfileImgURL(likeItem.profilePic)} />
                <List.Content>
                  {likeItem.name}
                  <List.Description>Hello</List.Description>
                </List.Content>
              </List.Item>
            })}
          </List>
        </Modal.Content>

        <Modal.Description>
          {state.likeCount > 10 ?
            <>
              <Segment textAlign="right">
                <span onClick={() => fetchMoreUserLikeList()}
                  style={{ float: 'left', cursor: 'pointer' }}>View more Likes </span>
                {state.likeData.length} of {state.likeCount}
              </Segment>
            </>
            : ""}
        </Modal.Description>
      </Modal> */}
    </>
  );
};
export default FeedCard;