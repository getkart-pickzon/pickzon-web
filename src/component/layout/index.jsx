import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "../template/header/index";
import Main from "../template/main/index";
import Footer from "../template/footer/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme/theme";
import ScrollUpFAB from "../molecules/ScrollUpBtn/index";
import SnackBar from "../molecules/SnackBar";
import { useSelector } from "react-redux";
import StartUpPopUp from "../organisms/StartupPopup";

const Layout = () => {
  const [theme, colorMode] = useMode();
  const { message, status, call } = useSelector((state) => state.snackbar.value);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Header />
          <StartUpPopUp />
          <Main />
          <ScrollUpFAB scrollLength="1000" />
          <Footer />
          <SnackBar message={message} status={status} call={call} />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Layout;
