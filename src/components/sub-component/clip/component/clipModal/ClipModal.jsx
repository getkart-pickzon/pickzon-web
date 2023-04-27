import React from "react";
import { Grid, Modal, } from "semantic-ui-react";
import { getUser } from "../../../../../utils/common";

import ClipPlay from "./clipPlay/ClipPlay";
import ClipDetail from "./clipDetail/ClipDetail";

import "./style.css"

const ClipModal = ({ clipData, viewClipModal, parentCallback }) => {
  let loggedUser = getUser();
  return (
    <Modal
      open={viewClipModal}
      onClose={() => parentCallback(false)}
      size="small"
      closeIcon
      // dimmer="blurring"
      className="clip-modal"
    >
      <Modal.Content className="clip-modal-inner" >
        <Grid columns={2} stackable className="clip-modal-grid">
          <Grid.Column verticalAlign="middle" className="clip-modal-grid-column">
            <ClipPlay clipData={clipData} />
          </Grid.Column>
          <Grid.Column className="clip-modal-grid-column" style={{ paddingLeft: "0px" }}>
            <ClipDetail clipData={clipData} loggedUser={loggedUser} />
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal >
  );
}
export default React.memo(ClipModal);
