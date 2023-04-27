import React from "react";
import { Icon } from "semantic-ui-react";

const RadioLabel = ({
  icon,
  title,
  text,
  type,
  name,
  className,
  textStyle,
  checked,
  id,
  value,
  onChange,
}) => {
  return (
    <div className={className}>
      <div className={textStyle}>
        {icon && <Icon name={icon} size="large" circular />}
        <div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
      <input
        id={id}
        type={type}
        name={name}
        checked={checked}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default RadioLabel;
