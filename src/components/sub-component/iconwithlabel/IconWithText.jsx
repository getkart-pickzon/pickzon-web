import React from "react";

function IconWithText({ label, text, icon }) {
  return (
    <div>
      <h1>{icon}</h1>
      <h5>{label}</h5>
      <p>{text}</p>
    </div>
  );
}
export default IconWithText;
