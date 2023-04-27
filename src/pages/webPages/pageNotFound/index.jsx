import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import { HomeOutlined } from "@mui/icons-material";
import { Assets } from "../../../assets/Assets";
import NavigationPaths from "../../../routes/navigationPath";

const PageNotFound = () => {
    const theme = useTheme();
    const isNonMobile = useMediaQuery(theme.breakpoints.up("md"));
    return (<Container maxWidth="xl" sx={{ display: "flex" }}>
        <Grid container spacing={2} mb={10}>
            <Grid item sm={12} md={12} lg={5} xl={5} xs={12} sx={{
                display: "flex",
                alignItems: isNonMobile ? "center" : "flex-end",
                justifyContent: "center",
            }}>
                <img src={Assets.page_not_found.img} alt={Assets.page_not_found.alt} style={{ maxWidth: "100%" }} />
            </Grid>
            <Grid item sm={12} md={12} lg={7} xl={7} xs={12} sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: isNonMobile ? "center" : "flex-start",
            }}>
                <Box textAlign={isNonMobile ? "left" : "center"}>
                    <Typography variant={isNonMobile ? "h1" : "h2"}>
                        Whoops...!
                    </Typography>
                    <Typography variant={isNonMobile ? "h2" : "h4"}>
                        You must be lost somewhere.
                    </Typography>
                    <Typography variant="body1" mb={5}>
                        The page you are trying to access has been moved Or the link is
                        broken. Check the URL and try reloading the page.
                    </Typography>
                    <Button component={Link} variant="contained" to={NavigationPaths.HOME} startIcon={<HomeOutlined />} >
                        <Typography variant="inherit">Home Page</Typography>
                    </Button>
                </Box>
            </Grid>
        </Grid>
    </Container>);
};

export default PageNotFound;