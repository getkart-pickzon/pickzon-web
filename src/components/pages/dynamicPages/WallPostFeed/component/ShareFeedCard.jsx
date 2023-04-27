// import React, { useCallback, useEffect, useState } from "react";
// import {
//   Image,
//   Feed,
//   Icon,
//   Button,
//   Card,
//   Header,
//   Dropdown,
//   Modal,
//   Form,
//   TextArea,
// } from "semantic-ui-react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import ReactPlayer from "react-player";
// import moment from "moment";
// import {
//   FacebookIcon,
//   FacebookShareButton,
//   LinkedinIcon,
//   LinkedinShareButton,
//   TwitterIcon,
//   TwitterShareButton,
//   WhatsappIcon,
//   WhatsappShareButton,
// } from "react-share";

// import { POST } from "../../../../Services";
// import { getUser } from "../../../../utils/common";
// import { notifyToast } from "../../../../utils/Toast";

// import FeedLikeList from "./FeedLikeList";
// import FeedShare from "./FeedShare";
// import FeedComment from "./FeedComment";
// import verifyImage from "../../../../assets/images/verify.png";
// import defaultImage from "../../../../assets/images/pickzonWaterMark.svg";

// import "./style.css";

// const feedActionDropOptions = [
//   // { key: "1", text: "Share", icon: "share alternate" },
//   { key: "3", text: "Report", icon: "warning sign" },
//   { key: "2", text: "Block", icon: "dont" },
// ];

// let fetchFeedCommentObj = {
//   userId: "",
//   feedId: "",
//   pageNumber: 0,
//   pageLimit: 10,
//   timeZone: "",
// };

// let fetchFeedLikeObj = {
//   userId: "",
//   feedId: "",
//   pageNumber: 0,
//   pageLimit: 10,
// };

// let defaultObj = {
//   isLoader: false,
//   isLikeLoader: true,
//   commentLoader: false,
//   totalCommentCount: 0,
//   userCommentData: [],
//   commentInput: false,
//   commentValue: "",
//   commentReplyValue: "",
//   likeCount: 0,
//   isLike: 0,
//   likeData: [],
//   isFollow: 0,
//   followLabel: "Follow",
//   isSaved: 0,
//   commentSubReplyValue: "",
//   reportMessage: "",
//   readMore: false,
// };

// const ShareFeedCard = ({ avatar, item, user, mediaUrls = [], likeCount, commentCount, shareCount, }) => {
//   const [state, setState] = useState(defaultObj);
//   const [shareURL, setShareURL] = useState("localhost.com");

//   const [reportFeedModal, setReportFeedModal] = useState(false);
//   let loggedUser = getUser();
//   fetchFeedCommentObj.userId = loggedUser._id;
//   fetchFeedLikeObj.userId = loggedUser._id;

//   console.log(item);

//   useEffect(() => {
//     function callEffect() {
//       try {
//         let _isFollowLabel = item.isFollow === 0 ? "Follow" : "Unfollow";
//         setState((pre) => ({
//           ...pre,
//           isLike: item.isLike,
//           likeCount: likeCount,
//           followLabel: _isFollowLabel,
//           isSaved: item.isSave,
//         }));
//       } catch (er) {
//         console.log(er);
//       }
//     }
//     callEffect();
//   }, [likeCount]);

//   const fetchFeeComment = useCallback(async () => {
//     try {
//       showCommentInput();
//       fetchFeedCommentObj.feedId = item.id;
//       fetchFeedCommentObj.pageNumber = 0;
//       // fetchCommentAPI();
//       setState((pre) => ({ ...pre, isLoader: true }));
//       let { status, totalPages, message, payload } = await POST("/feed/fetch-all-feed-comment", fetchFeedCommentObj);
//       setState((pre) => ({ ...pre, isLoader: false }));
//       if (status === 0) {
//         return console.log("Fetch Feed Data ", message);
//       }
//       let feedObjData = [];
//       if (feedObjData.length > 250) {
//         feedObjData = [];
//       }
//       feedObjData.push(...payload);
//       setState((pre) => ({
//         ...pre,
//         totalCommentCount: totalPages,
//         userCommentData: feedObjData,
//       }));
//     } catch (er) {
//       console.log(er);
//     }
//   });

//   const showCommentInput = () => {
//     try {
//       setTimeout(() => {
//         setState((pre) => ({ ...pre, commentInput: true }));
//       }, 12);
//     } catch (er) {
//       console.log(er);
//     }
//   };

//   const followUserBtn = async () => {
//     try {
//       let isStatus = 0;
//       if (state.followLabel === "Follow") {
//         isStatus = 1;
//       }
//       let followObj = {
//         userId: loggedUser._id,
//         followedUserId: user.id,
//         status: isStatus,
//       };
//       const { status, payload } = await POST("/user/follow-unfollow-user", followObj);
//       if (status === 0) {
//         return;
//       }
//       setState((pre) => ({
//         ...pre,
//         isFollow: 1,
//         followLabel: payload.statusType,
//       }));
//     } catch (er) {
//       console.log(er);
//     }
//   };

//   const saveRemoveFeedBtn = async () => {
//     try {
//       let isSave = state.isSaved === 1 ? 0 : 1;
//       const saveDelObj = {
//         userId: loggedUser._id,
//         feedId: item.id,
//       };
//       const { status } = await POST("/feed/save-feed-post", saveDelObj);
//       if (status === 0) {
//         return;
//       }
//       setState((pre) => ({ ...pre, isSaved: isSave }));
//     } catch (er) {
//       console.log(er);
//     }
//   };

//   const feedActionBtn = async (option) => {
//     try {
//       if (option.text === "Block") {
//         let blockObj = { userId: loggedUser._id, wallPostId: item.id };
//         const { status, message } = await POST("/feed/block-feed", blockObj);
//         if (status === 0) {
//           return notifyToast(message, "info", "top");
//         }
//         notifyToast(message, "success", "top");
//       } else if (option.text === "Report") {
//         setReportFeedModal(true);
//       }
//     } catch (er) {
//       console.log(er);
//     }
//   };

//   const changeHandler = (e) => {
//     try {
//       let value = e.target.value;
//       setState((pre) => ({ ...pre, reportMessage: value }));
//     } catch (er) {
//       console.log(er);
//     }
//   };

//   const submitFeedReportBtn = async () => {
//     try {
//       let reportObj = {
//         userId: loggedUser._id,
//         wallPostId: item.id,
//         message: state.reportMessage,
//       };
//       const { status, message } = await POST("/feed/report-feed", reportObj);
//       setReportFeedModal(false);
//       setState((pre) => ({ ...pre, reportMessage: "" }));
//       if (status === 0) {
//         return notifyToast(message, "info", "top");
//       }
//       notifyToast(message, "success", "top");
//     } catch (er) {
//       console.log(er);
//     }
//   };

//   return (
//     <>
//       <Card color="blue" fluid>
//         <Card.Content className="post-feed-header">
//           <Feed>
//             <Feed.Event>
//               <Feed.Label>
//                 {avatar ? (
//                   <Image src={avatar ? avatar : defaultImage} />
//                 ) : (
//                   <Icon name="user" circular color="grey" />
//                 )}
//               </Feed.Label>
//               <Feed.Content className="head-label">
//                 <Feed.Summary>
//                   <a>
//                     {user.first_name ? user.first_name : "Profile Name"}{" "}
//                     {user.celebrity === 1 ? (
//                       <img src={verifyImage} style={{ height: "15px" }} />
//                     ) : (
//                       ""
//                     )}
//                   </a>
//                 </Feed.Summary>
//                 <Feed.Date>
//                   {item.feedTime}
//                   {item.place ? (
//                     <a>
//                       <br /> <Icon name="map marker alternate" fitted />{" "}
//                       {item.place}
//                       <br />
//                     </a>
//                   ) : (
//                     ""
//                   )}
//                 </Feed.Date>
//               </Feed.Content>
//               <Feed.Extra>
//                 {user.id !== loggedUser._id ? (
//                   <>
//                     <Button
//                       color="blue"
//                       basic
//                       circular
//                       compact
//                       onClick={() => followUserBtn()}
//                     >
//                       <Icon
//                         name={
//                           state.followLabel === "Follow"
//                             ? "add user"
//                             : "user delete"
//                         }
//                       />{" "}
//                       {state.followLabel}
//                     </Button>
//                     &nbsp;
//                     <Icon
//                       link
//                       name={
//                         state.isSaved === 0 ? "bookmark outline" : "bookmark"
//                       }
//                       circular
//                       color="blue"
//                       fitted
//                       onClick={() => saveRemoveFeedBtn()}
//                     />
//                     &nbsp;
//                     <Dropdown
//                       icon="ellipsis vertical"
//                       pointing="top right"
//                       direction="left"
//                       as="h5"
//                       className="dropdown-dots"
//                     >
//                       <Dropdown.Menu>
//                         {(feedActionDropOptions || []).map((option) => (
//                           <Dropdown.Item
//                             key={option.value}
//                             {...option}
//                             onClick={() => feedActionBtn(option)}
//                           />
//                         ))}

//                         <Dropdown.Divider />
//                         <Dropdown.Header
//                           content="Share on Social Media"
//                           style={{ marginBottom: "0px" }}
//                         />

//                         <Dropdown.Item>
//                           <FacebookShareButton
//                             url={shareURL}
//                             quote={"Pickzon"}
//                             media={
//                               "https://pickzon.com/app/site/public/image/logo-final.png"
//                             }
//                             hashtag="#Pickzon"
//                           >
//                             <FacebookIcon size={32} round={true} />
//                           </FacebookShareButton>

//                           <TwitterShareButton
//                             url={shareURL}
//                             title={"Pickzon"}
//                             hashtags={["Pickzon"]}
//                           >
//                             <TwitterIcon
//                               size={32}
//                               round={true}
//                               style={{ marginLeft: "5px" }}
//                             />
//                           </TwitterShareButton>

//                           <WhatsappShareButton
//                             url={shareURL}
//                             title={"Pickzon"}
//                             separator=":: "
//                             media={
//                               "https://pickzon.com/app/site/public/image/logo-final.png"
//                             }
//                           >
//                             <WhatsappIcon
//                               size={32}
//                               round={true}
//                               style={{ marginLeft: "5px" }}
//                             />
//                           </WhatsappShareButton>

//                           <LinkedinShareButton
//                             url={shareURL}
//                             quote={"Pickzon"}
//                             hashtag="#Pickzon"
//                           >
//                             <LinkedinIcon
//                               size={32}
//                               round={true}
//                               style={{ marginLeft: "5px" }}
//                             />
//                           </LinkedinShareButton>
//                         </Dropdown.Item>
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   </>
//                 ) : (
//                   ""
//                 )}
//               </Feed.Extra>
//             </Feed.Event>

//             {item.activities ? (
//               <>
//                 {item.activities?.image} {item.activities?.name}
//               </>
//             ) : (
//               ""
//             )}
//             {item.feeling ? (
//               <>
//                 {item.feeling?.image} {item.feeling?.name}
//               </>
//             ) : (
//               ""
//             )}

//             {item.tag.length > 0 ? (
//               <>
//                 <br />
//                 {(item.tag || []).map((tItem, index) => {
//                   return <a key={index}>@{tItem}, </a>;
//                 })}
//               </>
//             ) : (
//               ""
//             )}
//           </Feed>
//           <Card.Description style={{ paddingBottom: "6px" }}>
//             {item.payload.length > 250 ? (
//               <>
//                 {state.readMore === true ? (
//                   item.payload
//                 ) : (
//                   <>{item.payload.slice(0, 250)}</>
//                 )}

//                 <Feed.Extra
//                   as="a"
//                   onClick={() => {
//                     setState((pre) => ({
//                       ...pre,
//                       readMore: state.readMore !== true,
//                     }));
//                   }}
//                 >
//                   {state.readMore === true ? <>Read less</> : <>Read more...</>}
//                 </Feed.Extra>
//               </>
//             ) : (
//               item.payload
//             )}
//           </Card.Description>
//         </Card.Content>

//         {/* SHARE POST CONTAINER */}

//         <Segment secondary raised >
//           <List>
//             <List.Item>
//               <Image avatar src={sharedWallData.user_info.profile_pic} />
//               <List.Content>
//                 <List.Header as='a'>
//                   {sharedWallData.user_info.first_name}
//                 </List.Header>
//                 <h6>{sharedWallData.feedTime}</h6>
//               </List.Content>
//             </List.Item>
//             {(item.tag || []).map((shareTag) => {
//               return <a>@{sharedWallData.tag
//               } </a>
//             })}
//             <List.Description>
//               {sharedWallData.payload.length > 250 ? (
//                 <>
//                   {readMore === true ? (
//                     item.payload
//                   ) : (
//                     <>
//                       {sharedWallData.payload.slice(0, 250)}
//                     </>
//                   )}
//                   <Feed.Extra
//                     as="a"
//                     onClick={() => {
//                       setReadMore(!readMore);
//                     }}
//                   >
//                     {readMore === true ? <>Read less</> : <>Read more...</>}
//                   </Feed.Extra>
//                 </>
//               ) : (
//                 sharedWallData.payload
//               )}
//             </List.Description>
//           </List>
//           {
//             item.mediaUrls.length ?
//               <Carousel
//                 infiniteLoop
//                 useKeyboardArrows
//                 autoPlay={true}
//                 showThumbs={false}
//                 showStatus={false}
//                 showIndicators={true}
//               >
//                 {
//                   (item.mediaUrls || []).map((item, index) => {
//                     let src = item.src ? item.src : item
//                     let isVideo = false;

//                     let mp4 = item.src.search(".mp4");
//                     let mov = item.src.search(".mov");
//                     let avi = item.src.search(".avi");
//                     if (mp4 > 0 || mov > 0 || avi > 0) {
//                       isVideo = true
//                     }
//                     return (
//                       <>
//                         {isVideo === false ?
//                           (
//                             <Segment basic className="crousel-contain-media">
//                               <Image rounded centered alt={item.alt} fluid
//                                 bordered src={src} size="big" />
//                             </Segment>
//                           ) : (
//                             <Segment basic className="crousel-contain-media">
//                               <ReactPlayer
//                                 width={498}
//                                 url={src}
//                                 controls={true}
//                                 loop
//                               />
//                             </Segment>
//                           )
//                         }
//                       </>
//                     )
//                   })
//                 }
//               </Carousel> : ""
//           }
//         </Segment>

//         <Card.Content className="post-feed-footer">
//           <div className="post-feed-footer-icon">
//             <Header as="a">
//               <FeedLikeList item={item} user={user} likeCount={likeCount} />
//             </Header>

//             <Header as="a">
//               <Feed.Like onClick={() => fetchFeeComment()}>
//                 <Icon name="comment outline" fitted /> {commentCount} Comments
//               </Feed.Like>
//             </Header>

//             <FeedShare shareCount={shareCount} item={item} />
//           </div>
//         </Card.Content>

//         <FeedComment
//           item={item}
//           commentInput={state.commentInput}
//           totalCommentCount={state.totalCommentCount}
//           userCommentData={state.userCommentData}
//         />
//       </Card>

//       <Modal
//         onClose={() => setReportFeedModal(false)}
//         open={reportFeedModal}
//         size="mini"
//       >
//         <Modal.Header>Report</Modal.Header>
//         <Modal.Content>
//           <Form>
//             <TextArea placeholder="Tell us more" onChange={changeHandler} />
//           </Form>
//         </Modal.Content>
//         <Modal.Actions>
//           <Button negative onClick={() => setReportFeedModal(false)}>
//             Close
//           </Button>

//           <Button
//             positive
//             onClick={() => submitFeedReportBtn()}
//             disabled={state.reportMessage ? false : true}
//           >
//             Submit
//           </Button>
//         </Modal.Actions>
//       </Modal>
//     </>
//   );
// };
// export default React.memo(ShareFeedCard);
