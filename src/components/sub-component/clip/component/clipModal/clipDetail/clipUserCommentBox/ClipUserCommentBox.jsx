import moment from "moment";
import React, { useEffect, useState } from "react";
import { Card, Icon, Comment, Input } from "semantic-ui-react";
import { POST } from "../../../../../../../Services";
import { getUser, makeUserProfileImgURL } from "../../../../../../../utils/common";

import "./style.css"

let defaultStateObj = {
  "clipCommentData": [
    {
      image: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
      name: 'Elliot Fu',
      clipTime: 'Yesterday at 12:30AM',
      comment: 'This has been very useful for my research. Thanks as well!'
    },
  ],
  "comment": "",
  "commentBtn": false
};

let fetchObj = {
  "userId": "61cc18b931c954038b390c52",
  "clipId": "624d92a456ba3daaa0e1bcd5",
  "pageNumber": 0,
  "pageLimit": 10,
};

const ClipUserCommentBox = ({ clipData, call }) => {
  const [state, setState] = useState(defaultStateObj);
  let loggedUser = getUser();

  useEffect(() => {
    try {
      function callEffect() {
        fetchAllClipComemnt();
      }; callEffect();
    } catch (er) { console.log(er); };
  }, []);

  const fetchAllClipComemnt = async () => {
    try {
      fetchObj.clipId = clipData._id;
      fetchObj.userId = loggedUser._id;
      let { status, message, payload } = await POST("/clip/fetch-all-clip-comment", fetchObj);
      if (status === 0) { return console.log(message); };
      setState((pre) => ({
        ...pre,
        clipCommentData: payload
      }));
    } catch (er) { console.log(er); };
  };

  const AddClipComemnt = async () => {
    try {
      if (!state.comment.length) { return };
      let addCommentObj = {
        clipId: clipData._id,
        userId: loggedUser._id,
        comment: state.comment
      };
      let { status, message } = await POST("/clip/add-comment-on-clip", addCommentObj);
      if (status === 0) { return console.log(message); };
      let commentD = [{
        userInfo: {
          profile_pic: loggedUser.ProfilePic,
          first_name: loggedUser.Name
        },
        commentTime: moment(new Date()).fromNow(),
        comment: state.comment
      }];

      let payload = state.clipCommentData;
      commentD.push(...payload);

      setState((pre) => ({
        ...pre,
        clipCommentData: commentD,
        comment: ""
      }));
    } catch (er) { console.log(er); };
  };

  const commentHandlerEnter = (e) => {
    try {
      if (e.key === 'Enter') {
        AddClipComemnt();
      };
    } catch (er) { console.log(er); };
  };

  const handeler = (e) => {
    try {
      setState((pre) => ({
        ...pre,
        comment: e.target.value
      }));
    } catch (er) { console.log(er); };
  };

  return (
    <Card className="clip-comment-box" fluid style={{ display: call == true ? "flex" : "none" }}>
      <Card.Content className="clip-comment-feed">

        {(state.clipCommentData || []).map((item) => {
          return <Comment.Group>
            <Comment>
              <Comment.Avatar src={makeUserProfileImgURL(item.userInfo?.profile_pic)} className="clip-comment-avatar" />
              <Comment.Content>
                <Comment.Author as='a'>{item.userInfo?.first_name}</Comment.Author>
                <Comment.Metadata>
                  <div>{item.commentTime}</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>{item.comment}</p>
                </Comment.Text>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        })}
      </Card.Content>
      <Input
        fluid
        icon={<Icon name='send' inverted circular link onClick={() => AddClipComemnt()} />}
        placeholder='Comment...'
        value={state.comment}
        onKeyPress={commentHandlerEnter}
        onChange={handeler}
      />
    </Card>
  );
};
export default React.memo(ClipUserCommentBox);