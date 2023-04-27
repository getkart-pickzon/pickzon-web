import React, { useState } from 'react';
import { Fab, Tooltip, useMediaQuery, useTheme } from '@mui/material';

const ScrollUpFAB = ({ scrollLength }) => {
    const theme = useTheme();
    const isNonMobile = useMediaQuery(theme.breakpoints.up('sm'));

    const [visible, setVisible] = useState(false)
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > scrollLength) {
            setVisible(true)
        }
        else if (scrolled <= scrollLength) {
            setVisible(false)
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    window.addEventListener('scroll', toggleVisible);
    const styles = {
        zIndex: 1051,
        visibility: visible ? 'visible' : 'hidden',
        position: "fixed",
        right: "1rem",
        bottom: "1rem",
        backgroundColor: "white",
        fontSize: "1.5rem",
        '&:hover': {
            boxShadow: "0px 0px 10px 5px white",
        }
    }
    return (
        <Tooltip title="Scroll to top ">
            <Fab aria-label="Scroll back to top" sx={styles} size={isNonMobile ? "large" : "small"} onClick={scrollToTop}>
                <span style={{ textShadow: "3px 3px 6px #525252" }}>
                    ☝
                    {/* 👆 */}
                </span>
            </Fab>
        </Tooltip >
    );
}

export default ScrollUpFAB;