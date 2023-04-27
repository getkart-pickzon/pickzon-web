import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Image, Feed, Icon, Button, Card, Header, Dropdown, Modal, List, Form, TextArea, Segment, } from "semantic-ui-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton, } from "react-share";
import { DELETE, GET, POST } from "../../../../../Services";
import { getUser, makeUserProfileImgURL } from "../../../../../utils/common";
import { swalAlert, swalConfirmAlert } from "../../../../../utils/sweetAlert";
import { notifyToast } from "../../../../../utils/Toast";
import FeedLikeList from "./FeedLikeList";
import FeedShare from "./FeedShare";
import FeedComment from "./FeedComment";
import verifyImage from "../../../../../assets/images/verify.png";
import "./style.css";
import Assets from "../../../../../assets/Assets";
import VideoPlayer from "../../../../sub-component/videoPlayer/VideoPlayer";

const feedActionDropOptions = [
  // { key: "1", text: "Share", icon: "share alternate" },
  // { key: "1", text: "Edit", icon: "edit" },
  { key: "4", text: "Delete", icon: "trash" },
  { key: "3", text: "Report", icon: "warning sign" },
  { key: "2", text: "Block", icon: "dont" },
];

let fetchFeedCommentObj = {
  userId: "",
  feedId: "",
  pageNumber: 0,
  pageLimit: 10,
  timeZone: "",
};

let fetchFeedLikeObj = {
  userId: "",
  feedId: "",
  pageNumber: 0,
  pageLimit: 10,
};

let defaultObj = {
  isLoader: false,
  isLikeLoader: true,
  commentLoader: false,
  totalCommentCount: 0,
  userCommentData: [],
  commentInput: false,
  commentValue: "",
  commentReplyValue: "",
  likeCount: 0,
  isLike: 0,
  likeData: [],
  isFollow: 0,
  followLabel: "Follow",
  isSaved: 0,
  commentSubReplyValue: "",
  reportMessage: "",
  readMore: false,
};

// let _isVideoId = ""

const FeedCard = ({
  feedType = "feed",
  item,
  user,
  feed,
  handleRefreshListing
}) => {
  console.clear();
  const [state, setState] = useState(defaultObj);
  const [shareURL, setShareURL] = useState(window.location.href);
  const [readMore, setReadMore] = useState(false);
  const [open, setOpen] = useState(false);
  const [isVideoId, setIsVideoId] = useState("");

  let dispatch = useDispatch();
  let router = useHistory();

  const [reportFeedModal, setReportFeedModal] = useState(false);
  let loggedUser = getUser();
  fetchFeedCommentObj.userId = loggedUser._id;
  fetchFeedLikeObj.userId = loggedUser._id;

  useEffect(() => {
    function callEffect() {
      try {
        let _isFollowLabel = item.isFollow === 0 ? "Follow" : "Unfollow";
        setState((pre) => ({
          ...pre,
          isLike: item.isLike,
          likeCount: item.likeCount,
          followLabel: _isFollowLabel,
          isSaved: item.isSave,
        }));
      } catch (er) {
        console.log(er);
      }
    }
    callEffect();
  }, [item.likeCount]);

  // useEffect(() => {
  //   try {
  //     function callEffect() {
  //       window.addEventListener("scroll", handleScroll);
  //     }; callEffect();
  //   } catch (er) { console.log(er); };
  // }, []);

  const fetchFeeComment = useCallback(async () => {
    try {
      setOpen(!open)
      showCommentInput();
      fetchFeedCommentObj.feedId = item.id;
      fetchFeedCommentObj.pageNumber = 0;
      setState((pre) => ({ ...pre, isLoader: true }));
      let { status, totalPages, message, payload } = await POST("/feed/fetch-all-feed-comment", fetchFeedCommentObj);
      setState((pre) => ({ ...pre, isLoader: false }));
      if (status === 0) {
        return console.log(message);
      }
      let feedObjData = [];
      if (feedObjData.length > 250) {
        feedObjData = [];
      }
      feedObjData.push(...payload);
      setState((pre) => ({
        ...pre,
        totalCommentCount: totalPages,
        userCommentData: feedObjData,
      }));
    } catch (er) {
      console.log(er);
    }
  });

  const showCommentInput = () => {
    try {
      setTimeout(() => {
        setState((pre) => ({ ...pre, commentInput: true }));
      }, 12);
    } catch (er) {
      console.log(er);
    }
  };

  const followUserBtn = async () => {
    try {
      let isStatus = 0;
      if (state.followLabel === "Follow") {
        isStatus = 1;
      }
      let followObj = {
        userId: loggedUser._id,
        followedUserId: user.id,
        status: isStatus,
      };
      const { status, payload } = await POST("/user/follow-unfollow-user", followObj);
      if (status === 0) {
        return;
      }
      setState((pre) => ({
        ...pre,
        isFollow: 1,
        followLabel: payload.statusType,
      }));
    } catch (er) {
      console.log(er);
    }
  };

  const saveRemoveFeedBtn = async () => {
    try {
      let isSave = state.isSaved === 1 ? 0 : 1;
      const saveDelObj = {
        userId: loggedUser._id,
        feedId: item.id,
      };
      const { status } = await POST("/feed/save-feed-post", saveDelObj);
      if (status === 0) {
        return;
      }
      setState((pre) => ({ ...pre, isSaved: isSave }));
    } catch (er) {
      console.log(er);
    }
  };

  const feedActionBtn = async (option) => {
    try {
      if (option.text === "Block") {
        let blockObj = { userId: loggedUser._id, wallPostId: item.id };
        const { status, message } = await POST("/feed/block-feed", blockObj);
        if (status === 0) {
          return notifyToast(message, "info", "top");
        };
        notifyToast(message, "success", "top");
        handleRefreshListing(item.id);
      } else if (option.text === "Report") {
        setReportFeedModal(true);
      } else if (option.text === "Delete") {
        let btnRes = await swalConfirmAlert("Are you sure! Do you want to delete this feed.", 'info', 'Yes');
        if (btnRes == true) {
          const { status, message } = await DELETE("/feed/delete-feed", item.id);
          if (status === 0) { return notifyToast(message, 'info', 'bottomTop'); };
          swalAlert(message, 'success', 'Cool');
          let payload = feedType == "feed" ? 1 : 2;
          dispatch({ type: "wallPostCallback", payload: payload });
        };
      }
      //  else if (option.text === "Edit") {
      //   dispatch({ type: "editWallPost", payload: item });
      // }
    } catch (er) {
      console.log(er);
    }
  };

  const changeHandler = (e) => {
    try {
      let value = e.target.value;
      setState((pre) => ({ ...pre, reportMessage: value }));
    } catch (er) {
      console.log(er);
    }
  };

  const submitFeedReportBtn = async () => {
    try {
      let reportObj = {
        userId: loggedUser._id,
        wallPostId: item.id,
        message: state.reportMessage,
      };
      const { status, message } = await POST("/feed/report-feed", reportObj);
      setReportFeedModal(false);
      setState((pre) => ({ ...pre, reportMessage: "" }));
      if (status === 0) {
        return notifyToast(message, "info", "top");
      }
      notifyToast(message, "success", "top");
    } catch (er) {
      console.log(er);
    }
  };

  const userProfile = useCallback((item) => {
    let name = "";
    let id = "";
    if (!item.sharedWallData) {
      name = item?.Tiktokname ? item?.Tiktokname : item?.user_info?.Tiktokname
      id = item?.id ? item?.id : item?.user_info?.id
    } else {
      name = item?.sharedWallData?.user_info?.Tiktokname
      id = item?.sharedWallData?.user_info?.id
    }
    try {
      router.push({
        pathname: "/user-profile/" + name,
        state: {
          id: id
        },
      });
      return window.location.reload();
    } catch (er) { console.log(er); };
  }, []);

  const openTagProfile = async (name) => {
    try {
      const { status, message, payload } = await GET("/user/get-user-profile-by-tiktokname", { tiktokName: name });
      if (status === 0) { return console.log(message) }
      payload.id = payload._id;
      userProfile(payload);
    } catch (er) { console.log(er); };
  };

  // const playVideoBtn = (type, item) => {
  //   if (type === 1) { setIsVideoId(""); _isVideoId = ""; return }
  //   setIsVideoId(item._id);
  //   _isVideoId = item._id
  //   return
  // };

  // const handleScroll = () => {
  //   if (document.getElementById(_isVideoId) != null) {
  //     let element = document.getElementById(_isVideoId);
  //     const videoStatus = isInViewport(element);
  //     if (videoStatus) {
  //       setIsVideoId(""); _isVideoId = "";
  //     } else {

  //     }
  //   }
  // };

  // function isInViewport(element) {
  //   const rect = element.getBoundingClientRect();
  //   return (rect.bottom < 150)
  // };

  return (
    <>
      <Card color="blue" fluid id={item._id}>
        <Card.Content className="post-feed-header" style={{ overflow: "inherit" }}>
          <Feed style={{ margin: "0" }}>
            <Feed.Event>
              <Feed.Label>
                <Image src={item.profileImg ? makeUserProfileImgURL(item?.profileImg) : Assets.defaultPlaceholders.userProfile.img} avatar bordered />
              </Feed.Label>
              <Feed.Content className="head-label">
                <Feed.Summary>
                  <Feed.User onClick={() => userProfile(user)}>
                    {user.first_name ? user.first_name : "Profile Name"}{" "}
                    {(user.celebrity === 1 || user.celebrity?.status === 1) ? (
                      <img src={verifyImage} alt="pickzon-verified-user" style={{ height: "15px" }} />
                    ) : ("")}
                  </Feed.User>
                </Feed.Summary>
                <Feed.Meta style={{ margin: "0px" }} >
                  {item.feedTime}  <Icon name={item.postType === 2 ? "users" : item.postType === 3 ? "lock" : "globe"} fitted />
                  {item.place ? (
                    <p style={{ margin: "0px" }}>
                      <Icon name="map marker alternate" fitted />{" "}
                      {item.place}
                    </p>
                  ) : (
                    ""
                  )}
                </Feed.Meta>
              </Feed.Content>
              <Feed.Extra>
                <Button.Group icon basic style={{ border: "none", }}>
                  {user.id !== loggedUser._id && <>
                    <Button title={state.followLabel === "Follow" ? "Follow User" : "Unfollow User"} onClick={() => followUserBtn()}>
                      <div style={{ background: "#2185d0", padding: "8px", borderRadius: "20px", color: "white" }}>
                        <Icon name={state.followLabel === "Follow" ? "add user" : "user delete"} /> {state.followLabel}
                      </div >
                    </Button>
                    <Button title={state.isSaved === 0 ? "Save Post" : "Unsave Post"} onClick={() => saveRemoveFeedBtn()}>
                      <Icon name={state.isSaved === 0 ? "bookmark outline" : "bookmark"} color="blue" />
                    </Button>
                  </>}
                  <Button>
                    <Dropdown
                      icon="ellipsis horizontal"
                      pointing="top right"
                      direction="left"
                      as="a"
                      className="dropdown-dots"
                    >
                      <Dropdown.Menu>
                        {(feedActionDropOptions || []).map((option) => {
                          try {
                            if (loggedUser._id === user.id) {
                              if (option.text === "Report" || option.text === "Block") {
                                return;
                              };
                            } else {
                              if (feedType !== 'share' && option.text === "Delete" || option.text === "Edit") {
                                return;
                              };
                            };
                          } catch (er) { console.log(er); };

                          return <Dropdown.Item
                            key={option.value}
                            {...option}
                            onClick={() => feedActionBtn(option)}
                          />
                        })}

                        {feedType === 'hide-share' ? <>
                          <Dropdown.Divider />
                          <Dropdown.Header
                            content="Share on Social Media"
                            style={{ marginBottom: "0px" }}
                          />
                          <Dropdown.Item>
                            <FacebookShareButton
                              url={shareURL}
                              quote={"Pickzon"}
                              media={
                                "https://pickzon.com/app/site/public/image/logo-final.png"
                              }
                              hashtag="#Pickzon"
                            >
                              <FacebookIcon size={32} round={true} />
                            </FacebookShareButton>

                            <TwitterShareButton
                              url={shareURL}
                              title={"Pickzon"}
                              hashtags={["Pickzon"]}
                            >
                              <TwitterIcon
                                size={32}
                                round={true}
                                style={{ marginLeft: "5px" }}
                              />
                            </TwitterShareButton>

                            <WhatsappShareButton
                              title={"Pickzon-  " + item.payload}
                              separator="Pickzon:: "
                              url={shareURL}
                              media={
                                item?.url ? item?.url[0] : "https://pickzon.com/app/site/public/image/logo-final.png"
                              }
                            >
                              <WhatsappIcon
                                size={32}
                                round={true}
                                style={{ marginLeft: "5px" }}
                              />
                            </WhatsappShareButton>

                            <LinkedinShareButton
                              url={shareURL}
                              quote={"Pickzon"}
                              hashtag="#Pickzon"
                            >
                              <LinkedinIcon
                                size={32}
                                round={true}
                                style={{ marginLeft: "5px" }}
                              />
                            </LinkedinShareButton>
                          </Dropdown.Item>
                        </>
                          : null}

                      </Dropdown.Menu>
                    </Dropdown>
                  </Button>
                </Button.Group>
              </Feed.Extra>
            </Feed.Event>
          </Feed>

          {item.payload.length > 0 &&
            <Card.Description >
              {item.payload.length > 250 ? (
                <>
                  {state.readMore === true ?
                    <div dangerouslySetInnerHTML={{ __html: item.payloadData }} />
                    :
                    <div dangerouslySetInnerHTML={{ __html: item.payloadData.slice(0, 250) }} />
                  }
                  <Feed.Extra
                    as="a"
                    onClick={() => {
                      setState((pre) => ({
                        ...pre,
                        readMore: state.readMore !== true,
                      }));
                    }}
                  >
                    {state.readMore === true ? <>Read less</> : <>Read more...</>}
                  </Feed.Extra>
                </>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: item.payloadData.slice(0, 250) }} />
              )}
            </Card.Description>}

          {(item?.activitiesData || item?.activities) ? (
            <>
              {/* {console.log(item?.activitiesData, item?.activities)} */}
              <span>
                {item?.activitiesData?.image || item?.activities?.image} {item?.activitiesData?.name || item?.activities?.name}
              </span>
              <br />
            </>
          ) : (null)}

          {(item?.feelingData || item?.feeling) ? (
            <>
              {/* {console.log(item?.feelingData, item?.feeling)} */}
              <span>
                {item?.feelingData?.image || item?.feeling?.image} {item?.feelingData?.name || item?.feeling?.name}
              </span>
              <br />
            </>
          ) : (null)}

          {(item?.tag || []).map((entry, i) => {
            return (<Feed.User key={i} onClick={() => openTagProfile(entry)}>@{entry} </Feed.User>)
          })}

        </Card.Content>

        {item.sharedWallData?.id ?
          <Segment style={{ margin: "0 15px 15px 15px", borderRadius: "6px" }} basic secondary>
            <List>
              <List.Item>
                <Image avatar src={
                  makeUserProfileImgURL(item.sharedWallData.user_info.profile_pic)
                } />
                <List.Content>
                  <List.Header as='a' onClick={() => userProfile(item)}>
                    {item.sharedWallData.user_info.first_name}
                  </List.Header>
                  <h6>{item.sharedWallData.feedTime}</h6>
                </List.Content>
              </List.Item>

              {item?.sharedWallData?.activitiesData ? (
                <>
                  <span>
                    {/* {console.log("SHARED>>>>", item?.sharedWallData, item?.sharedWallData)} */}
                    {item?.sharedWallData?.activitiesData?.image} {item?.sharedWallData?.activitiesData?.name}
                  </span>
                  <br />
                </>
              ) : (null)}

              {item?.sharedWallData?.feelingData ? (
                <>
                  <span>
                    {/* {console.log("SHARED>>>>", item?.sharedWallData?.feelingData?.image, item?.sharedWallData?.feelingData?.name)} */}
                    {item?.sharedWallData?.feelingData?.image} {item?.sharedWallData?.feelingData?.name}
                  </span>
                  <br />
                </>
              ) : (null)}

              {(item?.sharedWallData?.tag || []).map((entry, i) => {
                return (<Feed.User key={i} onClick={() => openTagProfile(entry)}>@{entry.name ? entry.name : entry} </Feed.User>)
              })}

              <List.Description>
                {item.sharedWallData.payload.length > 250 ? (
                  <>
                    {readMore === true ? (item.payload) : (
                      <>{item.sharedWallData.payload.slice(0, 250)}</>
                    )}{" "}
                    <Feed.Extra as="a" onClick={() => { setReadMore(!readMore); }}>
                      {readMore === true ? <>Read more...</> : <>Read less</>}
                    </Feed.Extra>
                  </>
                ) : (item.sharedWallData.payload)}
              </List.Description>
            </List>

            {item.sharedWallData.url.length ?
              (<Carousel
                infiniteLoop
                useKeyboardArrows
                autoPlay={false}
                showThumbs={false}
                showStatus={item.sharedWallData.url.length > 1 ? true : false}
                showIndicators={false}
              >
                {(item.sharedWallData.url || []).map((item, index) => {
                  let isVideo = false;
                  let mp4 = item.search(".mp4");
                  let mov = item.search(".mov");
                  let avi = item.search(".avi");
                  if (mp4 > 0 || mov > 0 || avi > 0) {
                    isVideo = true
                  }
                  return (
                    <React.Fragment key={index}>
                      <div className="content-slider">
                        {
                          isVideo === false ? <Image src={item} centered className="content-container" /> : <VideoPlayer url={item} poster={Assets.defaultPlaceholders.waterMarkSq.img} />
                        }
                      </div>
                    </React.Fragment>
                  )
                })}
              </Carousel>) : (null)}
          </Segment>
          :
          <>
            {(item.mediaUrls || []).length > 0 ? (
              <Carousel
                infiniteLoop
                useKeyboardArrows
                autoPlay={false}
                showThumbs={false}
                showIndicators={false}
                className="crousel-slider-box"
                showStatus={item.mediaUrls.length > 1 ? true : false}
              >
                {(item.mediaUrls || []).map((mItem, index) => {
                  let src = mItem.src ? mItem.src : mItem;
                  let thumbUrl = mItem.thumbUrl ? mItem.thumbUrl : mItem;
                  let isVideo = false;
                  let mp4 = src.search(".mp4"),
                    mov = src.search(".mov"),
                    avi = src.search(".avi");
                  if (mp4 > 0 || mov > 0 || avi > 0) {
                    isVideo = true;
                  }
                  return (
                    <React.Fragment key={index}>
                      <div className="content-slider">
                        {isVideo === false ? <Image src={src} centered className="content-container" /> : <VideoPlayer url={src} poster={thumbUrl} />}
                      </div>
                    </React.Fragment>
                  );
                })}
              </Carousel>) : (null)}
          </>}

        <Card.Content className="post-feed-footer">
          <div className="post-feed-footer-icon">
            <Header as="a">
              <FeedLikeList item={item} user={user} likeCount={item.likeCount} />
            </Header>

            <Header as="a">
              <Feed.Like onClick={() => fetchFeeComment()}>
                <Icon name="comment outline" fitted /> {item.commentCount} Comments
              </Feed.Like>
            </Header>

            <FeedShare shareCount={item.shareCount} item={item} />
          </div>
        </Card.Content>

        {open && <FeedComment
          item={item}
          commentInput={state.commentInput}
          totalCommentCount={state.totalCommentCount}
          userCommentData={state.userCommentData}
        />}
      </Card>

      <Modal
        onClose={() => setReportFeedModal(false)}
        open={reportFeedModal}
        size="mini"
      >
        <Modal.Header>Report</Modal.Header>
        <Modal.Content>
          <Form>
            <TextArea placeholder="Tell us more" onChange={changeHandler} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setReportFeedModal(false)}>
            Close
          </Button>
          <Button
            positive
            onClick={() => submitFeedReportBtn()}
            disabled={state.reportMessage ? false : true}
          >
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
export default React.memo(FeedCard);
