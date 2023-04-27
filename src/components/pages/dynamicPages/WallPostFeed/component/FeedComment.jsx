import React, { useCallback, useEffect, useState } from "react";
import { Icon, Comment, Card, Input, Popup, Loader, Button, Modal, Label } from "semantic-ui-react";
import moment from "moment";
import { DELETE, POST } from "../../../../../Services";
import { getUser, makeUserProfileImgURL } from "../../../../../utils/common";
import "../../../../sub-component/postCard/style.css";
import './style.css'
import { notifyToast } from "../../../../../utils/Toast.js";
import { useHistory } from "react-router-dom";

let fetchFeedCommentObj = {
  "userId": "",
  "feedId": "",
  "pageNumber": 0,
  "pageLimit": 10,
  "timeZone": ""
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

  isLike: 0,
  likeData: [],
  isFollow: 0,
  followLabel: "Follow",
  isSaved: 0,
  commentSubReplyValue: ''
};

const FeedComment = ({ item, commentInput, totalCommentCount, userCommentData }) => {
  const [state, setState] = useState(defaultObj);
  const [replyInput, setReplyInput] = useState('');
  let router = useHistory()
  let loggedUser = getUser();
  fetchFeedCommentObj.userId = loggedUser._id;

  useEffect(() => {
    function callEffect() {
      try {
        setState((pre) => ({
          ...pre,
          commentInput: commentInput
        }));
      } catch (er) { console.log(er); };
    }; callEffect();
  }, [commentInput]);

  useEffect(() => {
    function callEffect() {
      try {
        setState((pre) => ({
          ...pre,
          totalCommentCount: totalCommentCount,
          userCommentData: userCommentData,
        }));
      } catch (er) { console.log(er); };
    }; callEffect();
  }, [totalCommentCount, userCommentData]);

  const commentHandler = (e, index) => {
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
      setReplyInput(index)
      let userFeedData = state.userCommentData;
      userFeedData[index].replyCommentBox = 1;
      setState((pre) => ({ ...pre, userCommentData: userFeedData }));
    } catch (er) { console.log(er); };
  };

  const replyCommentBtn = async () => {
    try {
      let value = state.commentValue;
      if (!value) { return };
      let { status, message, payload } = await POST("/feed/add-feed-comment", { userId: loggedUser._id, feedId: item.id, comment: value });
      if (status === 0) { return };
      let commentObjInfo = {
        createdAt: new Date(),
        feedTime: moment(new Date()).fromNow(),
        comment: value,
        userInfo: {
          id: loggedUser._id,
          first_name: loggedUser.Name,
          profile_pic: loggedUser.profile_pic,
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
        replyTo: ""
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
          profile_pic: loggedUser.profile_pic,
        },
        comment: value
      };
      replyData = [replyObj].concat(replyData);
      let userComm = state.userCommentData;
      userComm[index].reply = replyData;
      setState((pre) => ({ ...pre, userCommentData: userComm, commentReplyValue: '' }));
    } catch (er) { console.log(er); };
  };

  const fetchMoreFeedComment = useCallback(async () => {
    try {
      setState((pre) => ({ ...pre, isLoader: true }));
      fetchFeedCommentObj.pageNumber += 1;
      fetchFeedCommentObj.feedId = item.id;
      let { status, totalPages, message, payload } = await POST('/feed/fetch-all-feed-comment', fetchFeedCommentObj);
      setState((pre) => ({ ...pre, isLoader: false }));
      if (status === 0) { return console.log(message) };
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

  const deleteComment = async (itemC, index) => {
    try {
      await DELETE('/feed/delete-feed-comment', itemC.id);
      let userComm = state.userCommentData;
      let filterCommentData = userComm.filter((item) => {
        return item.id != itemC.id
      });
      notifyToast("Comment deleted", "error", "bottom-right")
      setState((pre) => ({ ...pre, userCommentData: filterCommentData }));
    } catch (er) { console.log(er); };
  };

  const deleteCommentReply = async (itemC, sindex, index) => {
    try {
      await DELETE('/feed/delete-feed-comment', itemC.id);
      let replyComment = state.userCommentData;
      let userComm = replyComment[index].reply;
      let filterCommentData = userComm.filter((item) => {
        return item.id != itemC.id
      });
      notifyToast("Comment deleted", "error", "bottom-right")
      replyComment[index].reply = filterCommentData;
      setState((pre) => ({ ...pre, userCommentData: replyComment }));
    } catch (er) { console.log(er); };
  };

  const userProfile = (item) => {
    try {
      let name = item?.userInfo?.Tiktokname ? item?.userInfo?.Tiktokname : item?.userInfo?.first_name;
      let id = item?.userInfo?.id;
      router.push({
        pathname: "/user-profile/" + name,
        state: { id: id },
      });
      window.location.reload();
    } catch (er) { console.log(er); };
  };

  return (
    <>
      {state.commentInput === true ?
        <Input
          className="comment-input"
          placeholder='Comment...'
          value={state.commentValue}
          name="commentValue"
          onKeyPress={commentHandlerEnter}
          onChange={commentHandler}
          icon={<Icon name='arrow right' inverted circular link onClick={() => replyCommentBtn()} />} />
        : null}

      {state.userCommentData.length > 0 ?
        <Card.Content className="feed-comment-section">
          <Comment.Group style={{ maxWidth: "100%", marginBottom: "0.5rem" }}>
            {((state.userCommentData || []).map((item, index) => {
              return (
                <Comment key={index} style={{ backgroundColor: "#f0f2f5", padding: "1rem 1rem 0.5rem", borderRadius: "0.5rem" }}>
                  <Comment.Avatar circular src={makeUserProfileImgURL(item.userInfo.profile_pic)} />
                  <Comment.Content>
                    <Comment.Author as='a' onClick={() => userProfile(item)}>{item.userInfo.first_name}</Comment.Author>
                    <Comment.Metadata>
                      {/* <div>{moment(new Date(item.createdAt)).fromNow()}</div> */}
                      {item.feedTime}
                    </Comment.Metadata>
                    {loggedUser._id === item.userInfo.id ?
                      <Icon name='trash' fitted color="grey" circular
                        style={{ float: 'right', paddingTop: '3px', cursor: 'pointer' }}
                        onClick={() => deleteComment(item, index)}
                      />
                      : null}
                    <Comment.Text>
                      {item.comment.length > 70 ?
                        <>
                          {item.comment.substr(0, 69)}
                          <Modal
                            trigger={<Label as="a" basic horizontal style={{ border: "none", backgroundColor: "transparent", color: "#4283c4" }}>...more</Label>}
                            header='Comment'
                            content={<Modal.Content scrolling>{item.comment}</Modal.Content>}
                            size="small"
                            closeIcon
                          />
                        </>
                        : <>{item.comment}</>
                      }
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action onClick={() => replyCommentLinkBtn(index)} style={{ color: "#4283c4" }}>Reply</Comment.Action>
                      {index === replyInput ?
                        <Input
                          placeholder='Reply Comment...'
                          value={state.commentReplyValue}
                          name="commentReplyValue"
                          onKeyPress={(e) => commentHandlerEnter(e, item, index)}
                          onChange={(e, index) => commentHandler(e, index)}
                          icon={<Icon name='arrow right' inverted circular link onClick={() => replyOnCommentBtn(item, index)} />} />
                        : null}

                    </Comment.Actions>
                  </Comment.Content>
                  {item.reply.length ?
                    <Comment.Group size="mini" style={{ marginBottom: "0.5rem ", paddingBottom: "0.5rem", backgroundColor: "#e5e8eb", borderRadius: "0.5rem" }}>
                      {((item.reply || []).map((subItem, sIndex) => {
                        return (
                          <Comment key={sIndex}>
                            <Comment.Avatar circular src={subItem.userInfo.profile_pic} alt={subItem.userInfo.first_name} />
                            <Comment.Content>
                              <Comment.Author as='a' onClick={() => userProfile(item)}>{subItem.userInfo.first_name}</Comment.Author>
                              <Comment.Metadata>
                                <div>{subItem.feedTime} &nbsp;&nbsp;&nbsp;
                                  {loggedUser._id === subItem.userInfo.id ?
                                    <Icon name='trash' circular fitted style={{ float: 'right', paddingTop: '0px', cursor: 'pointer', ':hover': { color: "blue" } }}
                                      onClick={() => deleteCommentReply(subItem, sIndex, index)}
                                    />
                                    : null}
                                </div>
                              </Comment.Metadata>
                              <Comment.Text>
                                {subItem.comment}
                              </Comment.Text>
                            </Comment.Content>
                          </Comment>)
                      }))}
                    </Comment.Group>
                    : null}
                </Comment>)
            }))}
          </Comment.Group>
          {state.isLoader === true ? <Loader active inline='centered' />
            :
            <Popup content='Load more comments' position="top center" basic
              trigger={<Button icon='add' circular compact basic onClick={() => fetchMoreFeedComment()} />}
            />}
        </Card.Content>
        : null}
    </>
  );
};
export default React.memo(FeedComment);