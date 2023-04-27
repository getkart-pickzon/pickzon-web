import React, { useState, useEffect } from "react";
import { Label, Icon, Segment, Button } from "semantic-ui-react";
import { getUser } from "../../../../../../../utils/common";
import ClipComment from "./clipComment";
import ClipLike from "./clipLike/ClipLike";
// import ClipView from "./clipView/ClipView";

import "./style.css"

const ClipUserAction = ({ clipData, btnCall }) => {

  let loggedUser = getUser();

  return (
    <Segment className="clip-action-ribbon" >
      {/* <ClipView clipData={clipData} /> */}
      <Label circular compact basic as="a">
        <Icon name='eye' size="large" />
        {clipData.totalView}
      </Label>
      <ClipLike clipData={clipData} loggedUser={loggedUser} />
      <ClipComment clipData={clipData} btnCall={btnCall} />
    </Segment>
  );
}

export default React.memo(ClipUserAction);