import React from "react";
import { AppBar, Toolbar, useTheme, useMediaQuery, Box } from "@mui/material";
import HamburgerMenu from "../../organisms/hamburgerMenu/index";
import NavbarMenu from "../../organisms/navbarMenu/index";
import HeaderLinks from "../../../routes/headerLinks";
import WebLogo from "../../organisms/WebLogo";
import { tokens } from "../../../theme/theme";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationPaths from "../../../routes/navigationPath";

const color = tokens();
const Header = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  let path = location.pathname.split("/")[1].split("-")[0]
  let route = NavigationPaths.APP_PRIVACYPOLICY.split("/")[1].split("-")[0]  //condition for hide footer in mobile view through app

  return (
    <>
      {path === route ? null :
        <AppBar position="sticky" color="inherit" style={style}>
          <Toolbar>
            <Box
              onClick={() => navigate(NavigationPaths.HOME)}
              sx={{ cursor: "pointer" }}
            >
              <WebLogo />
            </Box>
            {isMatch ? (
              <HamburgerMenu navLinks={HeaderLinks} />
            ) : (
              <NavbarMenu navLinks={HeaderLinks} />
            )}
          </Toolbar>
        </AppBar>
      }
    </>
  );
};

export default React.memo(Header);

const style = {
  boxShadow: `0px 1px 0px 0px ${color.primary[900]}`, //#3e3d3d
  backgroundImage: "none",
};