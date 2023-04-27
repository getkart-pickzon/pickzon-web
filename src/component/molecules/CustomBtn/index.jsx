import React from "react";
import { Button, styled } from "@mui/material";
import { tokens } from "../../../theme/theme";
const CustomBtn = ({
  label,
  rem,
  icon,
  type,
  onClick,
  btnRad,
  minHeight,
  minWidth,
  fontWeight,
  fontSize,
}) => {
  const Color = tokens();

  const CustomBtn = styled(Button)({
    color: "#fff",
    boxShadow: "none",
    textTransform: "none",
    fontSize: `${rem}rem`,
    padding: "0.5rem 1rem",
    border: "1px solid",
    borderRadius: `${btnRad}rem`,
    minHeight: minHeight ? `${minHeight}rem` : null,
    minWidth: minWidth ? `${minWidth}rem` : null,
    fontWeight: fontWeight ? `${fontWeight}` : null,
    lineHeight: 1.5,
    backgroundColor: Color.blueAccent[600],
    borderColor: Color.blueAccent[600],
    // fontFamily: [
    //   '-apple-system',
    //   'BlinkMacSystemFont',
    //   '"Segoe UI"',
    //   'Roboto',
    //   '"Helvetica Neue"',
    //   'Arial',
    //   'sans-serif',
    //   '"Apple Color Emoji"',
    //   '"Segoe UI Emoji"',
    //   '"Segoe UI Symbol"',
    // ].join(','),
    "&:hover": {
      backgroundColor: Color.blueAccent[500],
      borderColor: "none",
      boxShadow: "none",
    },
    "&:active": {
      backgroundColor: Color.blueAccent[900],
      borderColor: "none",
      boxShadow: "none",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.1rem rgba(0,123,255,.5)",
    },
  });

  return (
    <CustomBtn
      variant="contained"
      color="inherit"
      startIcon={icon}
      type={type}
      onClick={onClick}
    >
      {label}
    </CustomBtn>
  );
};

export default CustomBtn;
