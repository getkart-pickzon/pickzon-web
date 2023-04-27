import React, { useEffect, useState } from "react";
import { Icon, Label, Modal, Button } from "semantic-ui-react";
import { PATCH } from "../../../../../../../../Services";
import { notifyToast } from "../../../../../../../../utils/Toast";

import "../style.css"

const ClipLike = ({ clipData, loggedUser }) => {
  const [open, setOpen] = useState(false)
  const [color, setColor] = useState('black');
  const [iconName, setIconName] = useState('like outline');

  useEffect(() => {
    try {
      function callEffect() {
        let _color = '', _iconName = '';
        if (clipData.videoLike === 0) {
          _color = 'black';
          _iconName = 'like outline';
        } else {
          _color = "red";
          _iconName = 'like';
        }
        setColor(_color);
        setIconName(_iconName);
      }; callEffect();
    } catch (er) { console.log(er); };
  }, []);

  const likeClipBtn = async () => {
    try {
      let { status, message } = await PATCH("/clip/like-dislike-clip", clipData._id, { userId: loggedUser._id });
      if (status === 0) { return notifyToast(message, "info", "top"); };

      let _color = '', _iconName = '';
      if (clipData.videoLike === 1) {
        clipData.videoLike = 0;
        _color = 'black';
        _iconName = 'like outline';
        clipData.totalLike = clipData.totalLike - 1;
      } else {
        clipData.videoLike = 1;
        _color = "red";
        _iconName = 'like';
        clipData.totalLike = clipData.totalLike + 1;
      }
      setColor(_color);
      setIconName(_iconName);
    } catch (err) { console.log(err); };
  };

  return (
    <>
      <Label circular compact basic className="label" >
        <Icon
          onClick={() => likeClipBtn()}
          size="large"
          className="like"
          color={color}
          name={iconName}
        />
        <span>{clipData.totalLike}</span>
      </Label>

      <Modal
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        size="mini"
      >
        <Modal.Header>
          <Icon name="heart" color="red" /> Likes
        </Modal.Header>
        <Modal.Content scrolling >
          {/* <List verticalAlign='middle'>
            {(state.likeData || []).map((likeItem, index) => {
              return <List.Item key={likeItem.id} style={{ marginBottom: '5px' }}>
                {likeItem.statusType ?
                  <List.Content floated='right'>
                    <Button primary circular basic compact onClick={() => followUserBtn(likeItem, index)} style={{ width: "120px" }}>
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
          </List> */}
        </Modal.Content>
        {/* {state.likeCount > 10 && */}
        <Modal.Actions>
          <>
            {/* Showing {state.likeData.length} of {state.likeCount} */}
            <Button compact
            // onClick={() => fetchMoreUserLikeList()}
            >
              View More
            </Button>
          </>
        </Modal.Actions>

      </Modal >
    </>
  );
}

export default ClipLike;