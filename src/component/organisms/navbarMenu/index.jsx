import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button, Box, List, ListItem, ListItemText, useTheme, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import { ColorModeContext } from "../../../theme/theme";
import ThemeSwitch from "../../molecules/ThemeSwitch/index";
import { getToken } from "../../../utils/common";

const TOKEN_NAME = process.env.REACT_APP_TOKEN_NAME;
const NavbarMenu = ({ navLinks }) => {
  let location = useLocation();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:1024px)");
  const loggedIn = getToken(TOKEN_NAME) ? true : false
  const styles = {
    navLinks: {
      textDecoration: "none",
      "&:hover": {
        borderRadius: "2rem",
        boxShadow: theme.palette.mode === 'dark' ? " 3px 3px 5px #1b1a1a,-5px -5px 10px #4c4b4b" : "14px 6px 28px #dad8d8,-14px -14px 28px #ffffff",
      },
    },
    navLinkActive: {
      textDecoration: "none",
      boxShadow: theme.palette.mode === 'dark' ? " 3px 3px 5px #1b1a1a,-5px -5px 10px #4c4b4b" : "14px 6px 28px #dad8d8,-14px -14px 28px #ffffff",
      borderRadius: "2rem",
    },
    webBtn: {
      textTransform: "none",
      padding: "0.6rem 1rem",
      "&:hover": {
        borderRadius: "2rem",
        boxShadow: theme.palette.mode === 'dark' ? " 3px 3px 5px #1b1a1a,-5px -5px 10px #4c4b4b" : "14px 6px 28px #dad8d8,-14px -14px 28px #ffffff",
      },
    },
    webBtnActive: {
      padding: "0.7rem 1rem",
      borderRadius: "2rem",
      boxShadow: theme.palette.mode === 'dark' ? " 3px 3px 5px #1b1a1a,-5px -5px 10px #4c4b4b" : "14px 6px 28px #dad8d8,-14px -14px 28px #ffffff",
      textTransform: "none"
    },
  }

  return (<>
    <Box sx={{ ml: "auto", display: "flex" }}>
      {
        !loggedIn &&
        navLinks.map((item) => {
          return (<React.Fragment key={item.text}>
            {item.status === 0 && (
              <List>
                <ListItem component={NavLink} to={item.route} style={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLinks)}>
                  <ListItemText>
                    <Typography variant="h5" color={location.pathname === item.route ? "secondary.main" : null}>
                      {item.text}
                    </Typography>
                  </ListItemText>
                </ListItem>
              </List>)}
          </React.Fragment>);
        })}
    </Box>
    <Box sx={{ ml: "auto" }}>
      {!loggedIn && <>
        {isNonMobile &&
          navLinks.map((item) => {
            return (<React.Fragment key={item.text}>
              {item.status === 1 && (
                <Button
                  style={({ isActive }) => (isActive ? styles.webBtnActive : styles.webBtn)}
                  component={NavLink}
                  to={item.route}
                  color="inherit"
                  sx={{ color: `${location.pathname === item.route ? "secondary.main" : null}` }}
                  startIcon={<QrCodeScannerRoundedIcon />}
                >
                  <Typography variant="h5" color={location.pathname === item.route ? "secondary.main" : null}>
                    {item.text}
                  </Typography>
                </Button>)}
            </React.Fragment>);
          })}
      </>
      }
      <ThemeSwitch boolean={theme.palette.mode === "light" ? false : true} onClick={colorMode.toggleColorMode} />
    </Box>
  </>);
};

export default NavbarMenu;

    // "&:hover": {
    //   borderRadius: "25px",
    //   boxShadow: "0 5px 35px 0px rgba(0,0,0,.1)",
    //   animation: "1s clockwise infinite",
    //   background: "#F3CE5E"
    // },
    // "&::after": {
    //   borderRadius: "25px",
    //   boxShadow: "0 5px 35px 0px rgba(0,0,0,.1)",
    //   animation: "2s counterclockwise infinite",
    //   background: "#FDA8CF"
    // },
    // "@keyframes clockwise": {
    //   "0%": { top: "-5px", left: "0" },
    //   "12% ": { top: "-2px", left: "2px" },
    //   "25% ": { top: " 0", left: "5px" },
    //   " 37%": { top: "2px", left: "2px" },
    //   " 50%": { top: "5px", left: "0" },
    //   "62%": { top: "2px", left: "-2px" },
    //   "75% ": { top: "0", left: "-5px" },
    //   "87%": { top: "-2px", left: "-2px" },
    //   " 100% ": { top: "-5px", left: "0" }
    // },
    // "@keyframes counterclockwise": {
    //   "0%": { top: "-5px", left: "0" },
    //   "12% ": { top: "-2px", left: "2px" },
    //   "25% ": { top: " 0", left: "5px" },
    //   " 37%": { top: "2px", left: "2px" },
    //   " 50%": { top: "5px", left: "0" },
    //   "62%": { top: "2px", left: "-2px" },
    //   "75% ": { top: "0", left: "-5px" },
    //   "87%": { top: "-2px", left: "-2px" },
    //   " 100% ": { top: "-5px", left: "0" }
    // }

        // "&:hover::before, &:hover::after": {
    //   isplay: "block",
    //   content: '',
    //   position: "absolute",
    //   width: "50px",
    //   height: "50px",
    //   background: "#FDA8CF",
    //   borderRadius: "75px",
    //   zIndex: "-1",
    //   animation: " 1s clockwise infinite"
    // }