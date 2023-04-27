import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
  Button,
  Stack,
} from "@mui/material";
import { tokens } from "../../../theme/theme";
import { GET } from "../../../services/index";
import { WEB } from "../../../routes/apiEndPoints";
import { Link, useLocation } from "react-router-dom";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import NavigationPaths from "../../../routes/navigationPath";

const defaultObj = {
  mediaArray: [],
};

const Features = () => {
  let location = useLocation();
  const theme = useTheme();
  const isNonMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const isNonMobileMd = useMediaQuery("(min-width: 900px)");
  const isNonMobileXs = useMediaQuery("(min-width: 767px)");
  const [state, setState] = useState(defaultObj);
  const Color = tokens();

  useEffect(() => {
    const api_FetchWebMedia = async () => {
      try {
        let { status, message, payload } = await GET(
          `${WEB.WEB_NAME}${location.pathname}`
        );
        if (status === 0) {
          console.log(message);
        }
        setState((prev) => ({
          ...prev,
          mediaArray: payload.mediaCdnUrl || [],
        }));
      } catch (error) {
        console.error(error);
      }
    };
    api_FetchWebMedia();
  }, [location.pathname]);

  const backgroundImageCustome = {
    backgroundImage: `url(${state.mediaArray[3]?.media})`,
    flexGrow: 1,
    backgroundPosition: "top right",
    backgroundSize: "80px",
    backgroundRepeat: "no-repeat",
  };

  const backgroundImageCustome1 = {
    backgroundImage: `url(${state.mediaArray[1]?.media})`,
    flexGrow: 1,
    backgroundPosition: "top right",
    backgroundSize: "82px",
    backgroundRepeat: "no-repeat",
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              textAlign="center"
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "700",
                  fontSize: {
                    xs: "1.5rem",
                    sm: "1.5rem",
                    md: "2.2rem",
                    lg: "3rem",
                    xl: "3rem",
                  },
                }}
                mt={{
                  xs: "2rem",
                  sm: "2rem",
                  md: "1.5rem",
                  lg: "1.5rem",
                  xl: "1.5rem",
                }}
              >
                <span style={{ color: "#0a6ffb" }}>One Click.</span> Many
                Features.
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                sx={{
                  maxWidth: {
                    xs: "100%",
                    sm: "100%",
                    md: "70%",
                    lg: "60%",
                    xl: "60%",
                  },
                  margin: "0 auto",
                }}
              >
                Make friends from around the world. Build new connections every
                day and share your memories. Easy Interaction and full of
                exciting features. Best social media app for all purposes.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              textAlign="center"
            >
              <img
                src={state.mediaArray[0]?.media}
                alt={state.mediaArray[0]?.alt}
                style={{ margin: "2rem 0 0 0", maxWidth: "80%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        mt={{ xs: "2rem", sm: "2rem", md: "2.5rem", lg: "4rem", xl: "4rem" }}
        mb={{ xs: "1rem", sm: "2rem", md: "2rem", lg: "0rem", xl: "0rem" }}
        sx={isNonMobileMd ? backgroundImageCustome1 : null}
      >
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} textAlign="center">
              <Box>
                <img
                  src={state.mediaArray[2]?.media}
                  style={{ maxWidth: "100%" }}
                  alt={state.mediaArray[2]?.alt}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box
                sx={{ display: "flex", alignItems: "center", height: "100%" }}
              >
                <Box
                  pl={{ xs: "0", sm: "0", md: "1rem", lg: "2rem", xl: "2rem" }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: "700",
                      fontSize: {
                        xs: "1.5rem",
                        sm: "1.5rem",
                        md: "2.2rem",
                        lg: "3rem",
                        xl: "3rem",
                      },
                    }}
                  >
                    Connect without limits with your loved ones!
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mt: {
                        xs: "0.5rem",
                        sm: "0.5rem",
                        md: "1rem",
                        lg: "1rem",
                        xl: "1rem",
                      },
                    }}
                  >
                    Show your hidden talent & Enjoy while watching other's
                    Feeds!
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={isNonMobileMd ? backgroundImageCustome : null}>
        <Container>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} textAlign="left">
              <Box
                position={{
                  xs: "relative",
                  sm: "relative",
                  md: "relative",
                  lg: "absolute",
                  xl: "absolute",
                }}
                maxWidth={{
                  xs: "100%",
                  sm: "100%",
                  md: "50%",
                  lg: "35%",
                  xl: "35%",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "700",
                    fontSize: {
                      xs: "1.5rem",
                      sm: "1.5rem",
                      md: "2.2rem",
                      lg: "3rem",
                      xl: "3rem",
                    },
                  }}
                  pt={{
                    xs: "2rem",
                    sm: "2rem",
                    md: "2rem",
                    lg: "8rem",
                    xl: "8rem",
                  }}
                >
                  Explore Your Feeds
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ marginTop: "0.5rem", marginBottom: "2rem" }}
                >
                  Pickzon provides you the ability to express yourself by
                  sharing photos and videos on your feeds. Connect with more
                  professionals like you and share your creative stuff with the
                  people that add value to your life. and achieve all their
                  desired goals with complete freedom to manage or modify the
                  campaign as you like with the best results.
                </Typography>
                {/* <Button
                  variant="contained"
                  sx={{
                    color: "#fff ",
                    backgroundColor: "#fbbd08",
                    border: "1px solid #fbbd08",
                    borderRadius: "15px",
                  }}
                >
                  Explore Feeds
                </Button> */}
                <Button
                  LinkComponent={Link}
                  to={NavigationPaths.FEEDCONTENT}
                  variant="contained"
                  sx={{ background: Color.blueAccent[500], color: "#fff" }}
                >
                  Get Started
                </Button>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ mt: isNonMobile ? 0 : 2 }}
                >
                  <Box
                    maxWidth={{
                      xs: "100%",
                      sm: "100%",
                      md: "100%",
                      lg: "60%",
                      xl: "60%",
                    }}
                    mt={{
                      xs: "1rem",
                      sm: "1rem",
                      md: "2rem",
                      lg: "2rem",
                      xl: "2rem",
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: "700",
                        fontSize: {
                          xs: "1.5rem",
                          sm: "1.5rem",
                          md: "2rem",
                          lg: "2.5rem",
                          xl: "3rem",
                        },
                      }}
                    >
                      <FormatQuoteIcon
                        sx={{
                          fontSize: "2rem",
                          transform: "rotate(180deg)",
                          color: Color.blueAccent[500],
                        }}
                      />
                      Build your strong Digital & Social presence.
                      <FormatQuoteIcon
                        sx={{ fontSize: "2rem", color: Color.blueAccent[500] }}
                      />
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Box
                textAlign={{
                  xs: "center",
                  sm: "center",
                  md: "right",
                  lg: "right",
                  xl: "right",
                }}
              >
                <img
                  src={state.mediaArray[6]?.media}
                  alt={state.mediaArray[6]?.alt}
                  style={{ maxWidth: "70%" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Box>
          <Container>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                textAlign="center"
                mt={{
                  xs: "0",
                  sm: "-3rem",
                  md: "-4rem",
                  lg: "-4rem",
                  xl: "-4rem",
                }}
              >
                <img
                  src={state.mediaArray[5]?.media}
                  alt={state.mediaArray[5]?.alt}
                  // style={{ verticalAlign: "bottom", maxWidth: "20rem" }}
                  style={{
                    maxWidth: isNonMobileXs ? "20rem" : "10rem",
                    verticalAlign: "bottom",
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Features;
