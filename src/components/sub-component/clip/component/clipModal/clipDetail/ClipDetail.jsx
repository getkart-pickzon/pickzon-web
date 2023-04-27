import React, { useState } from "react";
import { Card } from "semantic-ui-react";

import ClipUserAction from "./clipUserAction";
import ClipUserCaption from "./clipUserCaption/ClipUserCaption";
import ClipUserCommentBox from "./clipUserCommentBox/ClipUserCommentBox";
import ClipUserLabel from "./clipUserLabel/ClipUserLabel";

import "./style.css"

const ClipDetail = ({ clipData }) => {
  const [call, setCall] = useState("")

  return (
    <Card className="clip-card">
      <ClipUserLabel clipData={clipData} />
      <ClipUserCaption clipData={clipData} call={call} />
      <ClipUserAction clipData={clipData} btnCall={setCall} />
      <ClipUserCommentBox clipData={clipData} call={call} />
    </Card>
  );
}
export default React.memo(ClipDetail);


