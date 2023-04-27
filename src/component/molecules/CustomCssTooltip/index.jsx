import { useTheme } from '@mui/material';
import React from 'react'

const CustomCssTooltip = ({ lable }) => {
    const theme = useTheme();

    const Style = {
        tooltiptext: {
            height: "30px",
            width: "50px",
            backgroundColor: `${theme.palette.mode === "dark" ? "#fff" : "#000"}`,
            color: `${theme.palette.mode === "dark" ? "#000" : "#fff"}`,
            textAlign: "center",
            borderRadius: "0.3rem",
            padding: "0.3rem 0.6rem",
            position: "absolute",
            zIndex: "1",
            bottom: "150%",
        },
        arrow: {
            marginTop: "-2px",
            width: "0",
            height: "0",
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "7px solid",
            position: "absolute",
            left: "20px",
            bottom: "-7px",
        }
    }

    return (
        <div style={{ position: "absolute" }}>
            <div style={Style.tooltiptext}>{lable}</div>
            <div style={Style.arrow}></div>
        </div>
    )
}

export default CustomCssTooltip;