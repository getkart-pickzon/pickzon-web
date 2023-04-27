import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Typography, useMediaQuery } from '@mui/material';
import CustomCssTooltip from '../../molecules/CustomCssTooltip';

const CustomProgressBar = (props) => {
    const theme = useTheme();
    const isNonMobile = useMediaQuery(theme.breakpoints.up("sm"));
    const { value, barColor, bgColor, title, titleVariant } = props;

    const BorderLinearProgress = styled(LinearProgress)(() => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: bgColor,
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: barColor,
        },
    }));

    return (
        <Box sx={{ width: "100%", position: "relative" }}>
            <Box sx={{ position: "absolute", top: 0, zIndex: 1050, left: `${value - (isNonMobile ? 4 : 8)}%`, marginTop: "-10px" }}>
                <CustomCssTooltip lable={`${value}%`} />
            </Box>
            <BorderLinearProgress variant="determinate" value={value} />
            <Typography variant={titleVariant} sx={{ fontWeight: 700 }}>
                {title}
            </Typography>
        </Box>

    )
}
export default CustomProgressBar;