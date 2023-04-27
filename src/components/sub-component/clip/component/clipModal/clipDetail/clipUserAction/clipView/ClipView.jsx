import React, { useState } from "react";
import { Icon, Label, Modal, Button } from "semantic-ui-react";

import "../style.css"

const ClipView = ({ clipData }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Modal
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        size="mini"
        trigger={
          <Label circular compact basic as="a">
            <Icon name='eye' size="large" />
            {clipData.totalView}
          </Label>
        }
      >
        <Modal.Header>
          <Icon name="eye" /> Views
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

export default React.memo(ClipView);