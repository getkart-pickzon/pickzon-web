import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Image, Icon, Menu, Tab, Button, Modal, Segment, List, Input, } from "semantic-ui-react";
import { POST } from "../../../../../Services";
import { getUser, ListPlaceholder, makeUserProfileImgURL, NoData } from "../../../../../utils/common";

let fetchFeedLikeObj = {
  userId: "",
  search: "",
  sort: {},
  pageNumber: 0,
  pageLimit: 10
};

let defaultObj = {
  isLoader: false,
  isLikeLoader: true,
  userCount: 0,
  isLike: 0,
  userDataList: [],
  isFollow: 0,
  followLabel: "Follow",
  search: ""
};

let APIURL = '/user/fetch-all-followers-user';

const UserListing = ({ item = {}, callback, loading }) => {
  const [loader, setLoader] = useState(loading)
  const [state, setState] = useState(defaultObj);
  const [fetchData, setfetchData] = useState(fetchFeedLikeObj);
  const [open, setOpen] = useState(false);
  let loggedUser = getUser();
  let router = useHistory();


  useEffect(() => {
    function callEffect() {
      try {
        setOpen(true);
        fetchUserList();
      } catch (er) { console.log(er); };
    }; callEffect();
  }, [item?.id, fetchData]);

  const fetchUserList = useCallback(async () => {
    try {
      setLoader(false)
      fetchData.userId = loggedUser._id;
      fetchData.followedUserId = item?.id;
      fetchData.pageNumber = 0;

      let { status, message, totalRecords, payload } = await POST(APIURL, fetchData);
      if (status === 0) { return console.log(message); };
      setLoader(status === 0 ? false : true)
      setState((pre) => ({ ...pre, userDataList: payload, userCount: totalRecords }));
      setOpen(true);
    } catch (er) { console.log(er); };
  }, [fetchData]);

  const fetchMoreUserList = async () => {
    try {
      setLoader(false)
      setState((pre) => ({ ...pre, isLikeLoader: true }));
      fetchFeedLikeObj.pageNumber += 1;
      let { status, message, payload } = await POST(APIURL, fetchFeedLikeObj);
      setLoader(status === 0 ? false : true)
      setState((pre) => ({ ...pre, isLikeLoader: false }));
      if (status === 0) { return console.log("Fetch More Feed Like Data ", message); };
      let feedLikeData = state.userDataList || [];
      if (feedLikeData.length > 250) { feedLikeData = []; };
      feedLikeData.push(...payload);
      setState((pre) => ({ ...pre, userDataList: feedLikeData }));
    } catch (er) { console.log(er); };
  };

  const followUserBtn = async (userItem, index) => {
    try {
      let isStatus = 0;
      if (userItem.statusType === "Follow") {
        isStatus = 1;
      } else if (userItem.statusType === "Remove") {
        isStatus = 2;
      } else if (userItem.statusType === "Unfollow") {
        if (loggedUser._id !== item.id) {
          isStatus = 2
        };
      }

      let followObj = {
        "userId": loggedUser._id,
        "followedUserId": userItem.userId,
        "status": isStatus
      };
      const { status, payload } = await POST('/user/follow-unfollow-user', followObj);
      if (status === 0) { return };
      let _likeData = state.userDataList;
      _likeData[index].statusType = payload.statusType;
      setState((pre) => ({ ...pre, userDataList: [] }));
      setState((pre) => ({ ...pre, userDataList: _likeData }));
    } catch (er) { console.log(er); };
  };

  const onSearch = (e) => {
    let value = e.target.value;
    if (value.length > 3) {
      setfetchData((pre) => ({
        ...pre,
        search: value
      }))
      fetchUserList();
    } else if (value.length == 0) {
      setfetchData((pre) => ({
        ...pre,
        search: ""
      }))
    }
  }

  const userProfile = useCallback((userItem) => {
    try {
      let name = userItem.tiktokName ? userItem.tiktokName : userItem.firstName
      router.push({
        pathname: "/user-profile/" + name,
        state: { id: userItem.userId },
      });
      window.location.href = "/user-profile/" + name;
    } catch (er) { console.log(er); };
  }, []);

  const userList = () => {
    return (
      <Modal.Content scrolling style={{ minHeight: '320px', maxHeight: '440px' }} >
        {
          loader === false ?
            <ListPlaceholder listCount={fetchFeedLikeObj.pageLimit} />
            :
            <>
              {/* {
                state.userDataList.length === 0 ?
                  <NoData message={"No friends to show"} />
                  : */}
              <List verticalAlign='middle'>
                {(state.userDataList || []).map((userItem, index) => {
                  return <List.Item key={userItem.id} style={{ marginBottom: '5px' }}>
                    {userItem.statusType ?
                      <List.Content floated='right' style={{ marginRight: "1em" }}>
                        <Button color="blue" compact circular onClick={() => followUserBtn(userItem, index)} style={{ width: "110px" }}>
                          <Icon name={userItem.statusType === "Follow" ? "add user" : "user delete"} />   {userItem.statusType}
                        </Button>
                      </List.Content>
                      : ""}
                    <Image avatar src={makeUserProfileImgURL(userItem.profilePic)} />
                    <List.Content as="a" onClick={() => userProfile(userItem)}>
                      {userItem.firstName}
                    </List.Content>
                  </List.Item>
                })}
              </List>
              {/* } */}
            </>
        }
      </Modal.Content>
    )
  };

  const activeTab = (type) => {
    if (type === 'Followings') {
      APIURL = '/user/fetch-all-following-user';
    } else {
      APIURL = '/user/fetch-all-followers-user';
    };
    fetchUserList();
  };

  const panes = [
    {
      menuItem:
        <Menu.Item as="a" key='Followers' id="Followers" onClick={() => activeTab('Followers')} >
          <h4>Followers</h4>
        </Menu.Item>
      ,
      render: () =>
        <Tab.Pane style={{ border: "0px", padding: "0 " }} >
          {userList()}
        </Tab.Pane>,
    },
    {
      menuItem:
        <Menu.Item as="a" key='Followings' id="Followings" onClick={() => activeTab('Followings')} >
          <h4>Following</h4>
        </Menu.Item>,
      render: () =>
        <Tab.Pane style={{ border: "0px", padding: "0" }} >
          {userList()}
        </Tab.Pane>,
    },
    {
      menuItem:
        <Menu.Item disabled position="right">
          <Input icon='search' placeholder='Search user...' size="mini" onChange={onSearch} />
        </Menu.Item>,
    },

  ]

  return (
    <>
      <Modal
        onOpen={() => setOpen(true)}
        onClose={() => {
          callback(1);
          setOpen(false);
        }}
        open={open}
        size="tiny"
        closeIcon
      >
        < Modal.Description >
          <Segment style={{ paddingRight: "0px" }} >
            <Tab className="euelcustom" menu={{ secondary: true, tabular: false, color: "blue" }} panes={panes} />
          </Segment>
        </Modal.Description >

        {state.userCount > 10 ?
          <Modal.Actions>
            <>
              Showing {state.userDataList.length} of {state.userCount}
              <Button compact onClick={() => fetchMoreUserList()} >
                View More
              </Button>
            </>
          </Modal.Actions>
          : ""}
      </Modal >
    </>
  );
};

export default React.memo(UserListing);