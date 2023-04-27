import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Drawer, List, ListItemText, ListItem, IconButton, Box, Typography, useTheme } from "@mui/material";
import { Close, Menu } from "@mui/icons-material";
import { ColorModeContext } from "../../../theme/theme";
import ThemeSwitch from "../../molecules/ThemeSwitch/index";

const HambugerMenu = ({ navLinks }) => {
  let location = useLocation();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = useState(false);

  const onHandleLink = (route) => {
    setOpen(false);
  }

  return (<>
    <IconButton sx={{ ml: "auto", fontSize: "2rem" }} color="inherit" onClick={() => setOpen(!open)}>
      <Menu />
    </IconButton>
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)} >
      <Box sx={{ width: "200px" }}>
        <Box display={"flex"} alignItems={"center"}>
          <ThemeSwitch boolean={theme.palette.mode === "light" ? false : true} onClick={colorMode.toggleColorMode} />
          <IconButton sx={{ ml: "auto" }} size="large" color="inherit" onClick={() => setOpen(!open)}>
            <Close sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Box>
        <Box >
          <List >
            {navLinks.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  {item.status === 0 &&
                    <ListItem component={NavLink} to={item.route} onClick={() => onHandleLink(item.route)} style={({ isActive }) => ({ backgroundColor: isActive ? "#EEF6FF" : null })}>
                      <ListItemText>
                        <Typography variant="h5" color={location.pathname === item.route ? "secondary.main" : null}>
                          {item.text}
                        </Typography>
                      </ListItemText>
                    </ListItem>}
                </React.Fragment>
              );
            })}
          </List>
        </Box>
      </Box>
    </Drawer>
  </>);
};

export default HambugerMenu;