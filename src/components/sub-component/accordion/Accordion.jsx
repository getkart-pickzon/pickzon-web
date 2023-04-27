import React, { useState } from "react";

const Accordion = ({ title, content, classItem, classTitle, classContent }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={classItem}>
      <div className={classTitle} onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div>{isActive ? "-" : "+"}</div>
      </div>
      {isActive &&
        <div className={classContent}>
          {/* {content.map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))} */}
          {content}
        </div>}
    </div>
  );
};

export default Accordion;
