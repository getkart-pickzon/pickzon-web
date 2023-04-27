import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUser } from "../../../../../utils/common";
import { GET, POST } from "../../../../../Services";
import "./style.css";
import { USER } from "../../../../../route/apiPath";
import ProfilePage from "../../../../sub-component/profilePage/ProfilePage";

let defaultState = {
  userData: {},
  userInfo: {},
  loggedUserProfile: false,
};
let userID = "";

const UserProfilePage = () => {
  const [loader, setLoader] = useState(0);
  const [state, setState] = useState(defaultState);
  const [followUnFollowModal, setFollowUnFollowModal] = useState(false);
  let router = useHistory();
  let loggedUser = getUser();
  userID = router.location.state?.id;
  let dispatch = useDispatch();
  const userDetials = useSelector((state) => state.userDetials);

  const profileList = [
    { icon: "user", label: state.userInfo?.jobProfile ? state.userInfo?.jobProfile : null, link: null },
    { icon: "linkify", label: state.userInfo?.website ? state.userInfo?.website : null, link: state.userInfo?.website, },
    { icon: "map marker alternate", label: state.userInfo?.livesIn ? state.userInfo?.livesIn : null, link: null },
  ];

  const profileDetail = [
    { label: "Post", value: state.userData?.feedCount },
    { label: "Followers", value: state.userData?.followersCount },
    { label: "Following", value: state.userData?.followingCount }
  ];

  useEffect(() => {
    try {
      function callEffect() {
        router.listen((result) => {
          try {
            userID = router.location.state.id;
            dispatch({ type: "userClickedId", payload: router.location.state.id });
          } catch (er) { console.log(er); };
        });
        userID = router.location.state.id;
        dispatch({ type: "userClickedId", payload: router.location.state.id });
      }; callEffect();
    } catch (err) { console.log(err); };
  }, []);

  useEffect(() => {
    try {
      function callEffect() {
        fetchUserDetails();
      }; callEffect();
    } catch (err) { console.log(err); };
  }, [userID]);

  const fetchUserDetails = async () => {
    try {
      setLoader(0)
      const { status, message, payload } = await GET(USER.FETCH_USER_PROFILE_DETAILS, {
        userId: loggedUser._id,
        followedUserId: userID
      });
      if (status === 0) { return console.error(message); };
      setLoader(status)
      setState((pre) => ({
        ...pre,
        userData: payload,
        userInfo: payload.userInfo,
        loggedUserProfile: loggedUser._id === userID ? true : false
      }));

      dispatch({ type: "userInfo", payload: payload.userInfo });
      payload.userInfo.userProfile = payload.userInfo.profilePic;
      payload.userInfo.userCoverImgage = payload.userInfo.coverImage;
    } catch (er) { console.log(er); };
  };

  const followUserBtn = async () => {
    try {
      let isStatus = 0;
      if (state.userData?.followStatus === "Follow") { isStatus = 1; };
      let followObj = {
        "userId": loggedUser._id,
        "followedUserId": userID,
        "status": isStatus
      };
      const { status, payload } = await POST(USER.FETCH_FOLLOW_UNFOLLOW_USER, followObj);
      if (status === 0) { return };
      setState(prevState => ({
        ...prevState,
        userData: {
          ...prevState.userData,
          followStatus: payload.statusType
        }
      }));
    } catch (er) { console.log(er); };
  };

  const followUnFollowBtn = (item) => {
    try {
      if (item.label === "Post" || (!state.loggedUserProfile && state.userInfo.userType === 1)) { return };
      setFollowUnFollowModal(true);
    } catch (er) { console.log(er); };
  };

  const followUnFollowBtn1 = (item) => {
    if (item === 1) {
      setFollowUnFollowModal(false);
    };
  };

  return (
    <>
      <ProfilePage
        profileType="1"
        state={state}
        loader={loader}
        followUnFollowModal={followUnFollowModal}
        userID={userID}
        profileList={profileList}
        profileDetail={profileDetail}
        followUserBtn={followUserBtn}
        followUnFollowBtn={followUnFollowBtn}
        followUnFollowBtn1={followUnFollowBtn1}
        fetchUserDetails={fetchUserDetails}
        followStatus={state.userData.followStatus}
      />
    </>
  );
};
export default React.memo(UserProfilePage);
