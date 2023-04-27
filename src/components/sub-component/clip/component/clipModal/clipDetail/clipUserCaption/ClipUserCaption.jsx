import React from "react";
import { Card } from "semantic-ui-react";

import "./style.css"

const ClipUserCaption = ({ clipData, call }) => {

  return (
    <>
      <Card.Content style={{ paddingRight: "0px" }}>
        <h4 style={{ position: "sticky", marginBottom: "10px" }}>Caption</h4>
        <Card.Description style={{ height: call == true ? "150px" : "", overflow: "auto" }}>
          <p><strong>{clipData.description}</strong></p>
          <a>{clipData.section}</a>
        </Card.Description>
      </Card.Content>
    </>
  );
}

export default ClipUserCaption;