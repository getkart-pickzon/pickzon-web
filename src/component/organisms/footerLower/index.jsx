import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Box, Fab, Stack, Container } from "@mui/material";
import footerLinks from "../../../routes/footerLinks";
import { Assets } from "../../../assets/Assets";
import useMediaQuery from "@mui/material/useMediaQuery";

const Footer = () => {
    const isNonMobile = useMediaQuery("(min-width:1000px)");
    return (
        <Container maxWidth="false" disableGutters sx={{ background: "#000", color: "#fff" }} >
            <Grid container alignItems="center" justifyContent={"space-between"} rowSpacing={2}>
                <Grid item xl={3} md={3} xs={12} sm={12} lg={4}>
                    <Box textAlign={isNonMobile ? "felx-start" : "center"} ml={isNonMobile && 6}>
                        <img src={Assets.logo_white.img} alt={Assets.logo_white.alt} height="50rem" />
                    </Box>
                </Grid>
                <Grid item xl={6} md={5} xs={12} sm={12} lg={4}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant="body1" color="inherit">
                            {footerLinks.lowerFooter.licence.copyRight}
                        </Typography>
                        <Typography component={Link} to={footerLinks.lowerFooter.licence.path}
                            color="inherit"
                            sx={{
                                textDecoration: "none",
                                "&:hover": {
                                    textDecoration: "underline",
                                }
                            }}>
                            {footerLinks.lowerFooter.licence.rightReserved}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xl={3} md={4} xs={12} sm={12} lg={4} container alignItems="center" justifyContent={isNonMobile ? "space-evenly" : "center"}>
                    <Typography color="inherit" mr={1}>
                        {footerLinks.lowerFooter.followUs.title}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        {(footerLinks.lowerFooter.followUs.socialText).map((item, i) => {
                            return (
                                <Fab size="small" href={item.href} target="blank" key={i}>
                                    {item.icon}
                                </Fab>
                            )
                        })}
                    </Stack>
                </Grid>
            </Grid>
        </Container >
    );
};

export default Footer;  