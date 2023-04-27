import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Segment, Feed, Icon, Header, Modal, Button, Label, Image, Divider } from "semantic-ui-react";
import { USER } from "../../../../../route/apiPath";
import { GET, POST } from "../../../../../Services";
import { getUser, ListPlaceholder, makeUserProfileImgURL, trimUserName } from "../../../../../utils/common";
import verifyImage from "../../../../../assets/images/verify.png";
import "../style.css";

let fetchObj = {
  userId: "",
  pageNumber: 0,
  pageLimit: 10,
  statusValue: "",
  filterValue: "",
  search: "",
  sort: {},
  timeZone: ""
};

const FriendSuggetionList = ({ className }) => {
  let router = useHistory();
  let loggedUser = getUser();
  const [loader, setLoader] = useState(0)
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    friendsSuggestionsList: [],
    totalPage: 0,
    totalRecord: 0,
    hashMore: true,
    isLoader: false,
    followLabel: "Follow",
  });
  let preArrState = [];

  useEffect(() => {
    try {
      function callEffect() {
        fetchFriendsSuggestions();
      }; callEffect();
    } catch (err) { console.log(err); };
  }, []);

  const fetchFriendsSuggestions = useCallback(async (type) => {
    try {
      setLoader(0)
      fetchObj.userId = loggedUser?._id;
      fetchObj.pageNumber = type ? fetchObj.pageNumber + 1 : 0;
      const { status, message, payload } = await GET(USER.FETCH_FRIEND_SUGGESTIONS, fetchObj);
      if (status === 0) {
        return console.log(message);
      }
      if (fetchObj.pageNumber === 0) {
        setLoader(status);
        setState((pre) => ({
          ...pre,
          friendsSuggestionsList: payload
        }));
        preArrState = payload;
      } else {
        setLoader(status);
        preArrState.push(...payload);
        setState((pre) => ({
          ...pre,
          friendsSuggestionsList: preArrState
        }));
      }
    } catch (err) { console.log(err); };
  }, []);

  const followUserBtn = async (user, index) => {
    try {
      let isStatus = 0;
      if (user.statusType === "Follow") { isStatus = 1; };
      let followObj = {
        "userId": loggedUser._id,
        "followedUserId": user.id,
        "status": isStatus
      };
      const { status, message, payload } = await POST(USER.FOLLOW_UNFOLLOW_USER, followObj);
      if (status === 0) {
        return console.log(message);
      }
      let _friendSuggData = state.friendsSuggestionsList;
      _friendSuggData[index].statusType = payload.statusType;
      setState((pre) => ({ ...pre, friendsSuggestionsList: [] }));
      setState((pre) => ({ ...pre, friendsSuggestionsList: _friendSuggData }));
    } catch (er) { console.log(er); };
  };

  const userProfile = useCallback((user) => {
    try {
      let name = user.Tiktokname ? user.Tiktokname : user.first_name;
      router.push({
        pathname: "/user-profile/" + name,
        state: { id: user.id },
      });
      window.location.href = "/user-profile/" + name;
    } catch (er) { console.log(er); };
  }, []);

  return (
    <>
      <Segment style={{ width: "100%" }} basic className={className}>
        <Header as='h4'><Icon name="users" />Suggested For You</Header>
        <Divider />
        {
          loader === 0
            ?
            <ListPlaceholder listCount={fetchObj.pageLimit / 2} />
            :
            <Feed className="contact-suggestions">
              {(state.friendsSuggestionsList.slice(0, 7) || []).map((item, index) => {
                return (<Feed.Event key={index}>
                  <Feed.Label>
                    <Image src={makeUserProfileImgURL(item.profile_pic)} avatar style={{ width: "35px", height: "35px" }} />
                  </Feed.Label>
                  <Feed.Content>
                    <Feed.Summary>
                      <Feed.User onClick={() => userProfile(item)}>{trimUserName(item.first_name, 25)}{" "}
                        {(item.celebrity === 1 || item.celebrity?.status === 1) &&
                          <img src={verifyImage} alt="pickzon-verified-user" style={{ height: "15px" }} />}
                      </Feed.User>
                      <Button color="blue" compact circular onClick={() => followUserBtn(item, index)} style={{ width: "100px", padding: "0.5em 0em" }}>
                        <Icon name={item.statusType === "Follow" ? "add user" : "user delete"} />{item.statusType}
                      </Button>
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>)
              })}
            </Feed>
        }

        <Modal
          closeIcon
          onOpen={() => setOpen(true)}
          onClose={() => { setOpen(false) }}
          open={open}
          size="tiny"
          trigger={<Button fluid compact disabled={loader === 0 ? true : false} >See All</Button>}
        >
          <Modal.Header>
            <Icon name="users" />{" "}Suggested For You
          </Modal.Header>
          <Modal.Content style={{ paddingTop: "0.5rem" }} scrolling>
            <Modal.Description>
              {
                loader === 0
                  ?
                  <>
                    <ListPlaceholder listCount={fetchObj.pageLimit - 2} />
                  </>
                  :
                  <Feed className="contact-suggestions">
                    {(state.friendsSuggestionsList || []).map((item, index) => {
                      return <Feed.Event key={index}>
                        <Feed.Label onClick={() => userProfile(item)}>
                          <Image src={makeUserProfileImgURL(item.profile_pic)} avatar style={{ width: "35px", height: "35px" }} />
                        </Feed.Label>
                        {/* <Feed.Label image={makeUserProfileImgURL(item.profile_pic)} style={{ width: "35px", height: "35px" }} /> */}
                        <Feed.Content>
                          <Feed.Summary>
                            <Feed.User onClick={() => userProfile(item)} title={`${item.first_name}\n@${item.Tiktokname}`}>{trimUserName(item.first_name, 20)}{" "}
                              {(item.celebrity === 1 || item.celebrity?.status === 1) &&
                                <img src={verifyImage} alt="pickzon-verified-user" style={{ height: "15px" }} />}
                            </Feed.User>
                            <Button color="blue" compact circular onClick={() => followUserBtn(item, index)} style={{ width: "120px" }}>
                              <Icon name={item.statusType === "Follow" ? "add user" : "user delete"} />   {item.statusType}
                            </Button>
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    })}
                  </Feed>
              }
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button compact disabled={loader === 0 ? true : false} onClick={() => fetchFriendsSuggestions(true)} >
              View More
            </Button>
          </Modal.Actions>
        </Modal >
      </Segment>
    </>
  );
};
export default React.memo(FriendSuggetionList);