import React, { useEffect, useState } from "react";
import { Icon, Label, Modal, Button } from "semantic-ui-react";

import "../style.css"

const ClipView = ({ clipData, btnCall }) => {
  const [open, SetOpen] = useState(false);

  useEffect(() => {
    btnCall(open)
  }, [open])

  const handleClick = () => {
    SetOpen(!open)
  }

  return (
    <Label
      circular
      compact
      basic
      as="a"
      onClick={() => handleClick()}
    >
      <Icon name='chat outline' size="large" />
      {clipData.totalComment}
    </Label>
  );
}
export default React.memo(ClipView);