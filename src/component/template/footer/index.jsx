import React from "react";
import { Box } from "@mui/material";
import FooterUpper from "../../organisms/footerUpper/index"
import FooterLower from "../../organisms/footerLower/index"
import { useLocation } from "react-router-dom";
import NavigationPaths from "../../../routes/navigationPath";

const Footer = () => {
    let location = useLocation();
    let path = location.pathname.split("/")[1].split("-")[0]
    let route = NavigationPaths.APP_PRIVACYPOLICY.split("/")[1].split("-")[0] //condition for hide footer in mobile view through app

    return (
        <>
            {path === route ? null :
                <Box component="footer" sx={styles}>
                    <FooterUpper />
                    <FooterLower />
                </Box >
            }
        </>
    );
};

export default Footer;

const styles = {
    footer: {
        color: "#fff",
        background: "linear-gradient(47deg, rgba(102,127,221,1) 0%, rgba(63,90,193,0.9444152661064426) 23%, rgba(22,69,242,1) 57%, rgba(22,69,242,1) 99%)"
    }
}
