import React, { useCallback, useEffect, useState } from "react";
import { Icon, Comment, Card, Input, Popup, Loader } from "semantic-ui-react";
import moment from "moment";

import CONFIG from "../../../../config/config.js"
import { DELETE, POST } from "../../../../Services";
import { getUser, makeUserProfileImgURL } from "../../../../utils/common";

import "../../../sub-component/postCard/style.css";

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
  likeCount: 0,
  isLike: 0,
  likeData: [],
  isFollow: 0,
  followLabel: "Follow",
  isSaved: 0,
  commentSubReplyValue: ''
};

const FeedComment = ({ item, user, postTime, likeCount, commentCount, shareCount }) => {
  const [state, setState] = useState(defaultObj);
  const [open, setOpen] = useState(false);

  let loggedUser = getUser();
  fetchFeedCommentObj.userId = loggedUser._id;

  let commentAvatar = loggedUser.ProfilePic;
  console.log("avatar", commentAvatar);

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
      let { status, message, payload } = await POST("/feed/add-feed-comment", { userId: loggedUser._id, feedId: item.id, comment: value });
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
      // fetchCommentAPI();
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
        return item.id != itemC.id
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
        return item.id != itemC.id
      });
      replyComment[index].reply = filterCommentData;
      setState((pre) => ({ ...pre, userCommentData: replyComment }));
    } catch (er) { console.log(er); };
  };

  return (
    <>
      <Card color="blue" fluid >
        {state.commentInput === true ?
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
                      {/* <div>{moment(new Date(item.createdAt)).fromNow()}</div> */}
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
                          <Comment.Avatar circular src={commentAvatar} />
                          <Comment.Content>
                            <Comment.Author as='a'>{subItem.userInfo.first_name}</Comment.Author>
                            <Comment.Metadata>
                              {/* <div>{moment(new Date(subItem.createdAt)).fromNow()}</div> */}
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
                            {/* <Comment.Actions>
                              <Comment.Action onClick={() => replySubCommentLinkBtn(item, index, subItem, sIndex)}>Reply</Comment.Action>
                              {subItem.replySubCommentBox === 1 ?
                                <Input placeholder='Reply Comment...' icon={<Icon name='send' inverted circular link />} />
                                : ""}
                            </Comment.Actions> */}
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
          : ""}
      </Card>

    </>
  );
};
export default FeedComment;