import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { GET } from "../../../services/index";
import { WEB } from "../../../routes/apiEndPoints";
import { useLocation } from "react-router-dom";
import "./style.css";

const defaultObj = {
  mediaArray: [],
};

const About = () => {
  const theme = useTheme();
  let location = useLocation();
  const [state, setState] = useState(defaultObj);
  const screen1024 = useMediaQuery("(min-width:1200px)");
  const screen900 = useMediaQuery("(min-width: 900px)");
  const screen620 = useMediaQuery("(min-width: 620px)");

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

  const Participants = [
    {
      image: state.mediaArray[5]?.media,
      altTag: state.mediaArray[5]?.alt,
    },
    {
      image: state.mediaArray[6]?.media,
      altTag: state.mediaArray[6]?.alt,
    },
    {
      image: state.mediaArray[7]?.media,
      altTag: state.mediaArray[7]?.alt,
    },
    {
      image: state.mediaArray[8]?.media,
      altTag: state.mediaArray[8]?.alt,
    },
    {
      image: state.mediaArray[9]?.media,
      altTag: state.mediaArray[9]?.alt,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container
        sx={{
          mt: { xs: "2rem", sm: "2rem", md: "2rem", lg: "2rem", xl: "2rem" },
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box>
              <Typography
                variant="h2"
                m={0}
                textAlign="center"
                sx={{ fontWeight: 700 }}
                fontSize={{
                  xs: "2rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "3rem",
                  xl: "3rem",
                }}
                mt={{
                  xs: "1.5rem",
                  sm: "1.5rem",
                  md: "1.5rem",
                  lg: "0rem",
                  xl: "0rem",
                }}
              >
                About Us
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6"
                textAlign="center"
                sx={{ margin: "0 auto", maxWidth: "45rem" }}
                mb={{
                  xs: "1.5rem",
                  sm: "1.5rem",
                  md: "1.5rem",
                  lg: "0rem",
                  xl: "0rem",
                }}
              >
                Discover Content and creators based on your Interest, Bring the
                world together with your engaging content, express your thoughts
                in the Feed and let the world know how you feel.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
            xl={2}
            display="flex"
            justifyContent={{
              xs: "center",
              sm: "center",
              md: "center",
              lg: "flex-start",
              xl: "flex-start",
            }}
          >
            <Box>
              <Typography
                variant="h2"
                sx={{ fontWeight: 700, mb: 2 }}
                fontSize={{
                  xs: "2rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "3rem",
                  xl: "3rem",
                }}
                textAlign={{
                  xs: "center",
                  sm: "center",
                  md: "center",
                  lg: "left",
                  xl: "left",
                }}
              >
                1.2 M
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 0, color: "#6f6f6f" }}
              >
                People have joined us,
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 0, color: "#6f6f6f" }}
              >
                What about you?
              </Typography>
              <Box
                spacing={2}
                justifyContent={{
                  xs: "center",
                  sm: "center",
                  md: "center",
                  lg: "flex-start",
                  xl: "flex-start",
                }}
              >
                <img
                  src={
                    theme.palette.mode === "dark"
                      ? state.mediaArray[16]?.media
                      : state.mediaArray[4]?.media
                  }
                  alt={state.mediaArray[16]?.alt}
                  style={{
                    maxWidth: "160px",
                    margin: "2rem 0",
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 0, maxWidth: "10rem" }}
                color="inherit"
              >
                GET THE VIBES & UPLOAD YOUR MEMORIES
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={7}>
            <Box>
              <img
                src={state.mediaArray[12]?.media}
                alt={state.mediaArray[12]?.alt}
                style={{ maxWidth: "100%" }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
            xl={3}
            sx={{ pl: { xs: "0", sm: "0", md: "0", lg: "0", xl: "0" } }}
          >
            <Box
              textAlign={{
                xs: "center",
                sm: "center",
                md: "center",
                lg: "left",
                xl: "left",
              }}
            >
              <img
                src={
                  theme.palette.mode === "dark"
                    ? state.mediaArray[15]?.media
                    : state.mediaArray[2]?.media
                }
                alt={state.mediaArray[2]?.alt}
                style={{ maxWidth: "150px" }}
              />
            </Box>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  textAlign: {
                    xs: "center",
                    sm: "center",
                    md: "center",
                    lg: "left",
                    xl: "left",
                  },
                  mb: { md: "0.5rem" },
                  mt: { md: "1rem" },
                }}
              >
                Participants
              </Typography>
            </Box>
            <Box
              className="userImage"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "3rem",
              }}
              justifyContent={{
                xs: "center",
                sm: "center",
                md: "center",
                lg: "flex-start",
                xl: "flex-start",
              }}
            >
              {Participants.map((item, index) => (
                <span key={index}>
                  <img
                    src={item.image}
                    alt={item.altTag}
                    style={{ borderRadius: "30px", maxWidth: "2.5rem" }}
                  />
                </span>
              ))}
              <span>1.2M+ Users</span>
            </Box>
            <Divider spacing={2} />
            <Box sx={{ marginTop: "3rem" }}>
              <Typography
                variant="h6"
                width={{
                  xs: "100%",
                  sm: "100%",
                  md: "18rem",
                  lg: "18rem",
                  xl: "18rem",
                }}
                textAlign={{
                  xs: "center",
                  sm: "center",
                  md: "center",
                  lg: "left",
                  xl: "left",
                }}
              >
                "Don't Use Social Media To Impress People; Use It To Impact
                People."
              </Typography>
              <Typography
                variant="h5"
                textAlign="center"
                sx={{ marginTop: "2rem" }}
              >
                Dave Willis
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container
        sx={{
          mt: { xs: "1rem", sm: "1rem", md: "3rem", lg: "5rem", xl: "5rem" },
        }}
      >
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            mb={{ xs: 0, sm: 0, md: 0, lg: "-7rem", xl: "-7rem" }}
          >
            <Box sx={{ width: "100%" }}>
              <Box>
                <Typography
                  variant="h2"
                  sx={{ fontWeight: "700" }}
                  textAlign="center"
                  fontSize={{
                    xs: "2rem",
                    sm: "2rem",
                    md: "2.5rem",
                    lg: "3rem",
                    xl: "3rem",
                  }}
                  mt={{
                    xs: "1.5rem",
                    sm: "1.5rem",
                    md: "1.5rem",
                    lg: "0rem",
                    xl: "0rem",
                  }}
                >
                  What makes us PickZoner's
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "300",
                    mb: {
                      xs: "2rem",
                      sm: "2rem",
                      md: "0.5rem",
                      lg: "0",
                      xl: "0",
                    },
                  }}
                  textAlign="center"
                >
                  Build a better tomorrow to make people successful
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={4}
          sx={{
            backgroundImage: screen1024
              ? `url(${state.mediaArray[11]?.media})`
              : null,
          }}
          className="sectionBackground"
        >
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Box
              sx={{ display: "flex", alignItems: "center", height: "100%" }}
              pl={{ xs: 0, sm: 0, md: 0, lg: "0", xl: "0%" }}
              pt={{ xs: 0, sm: 0, md: 0, lg: "10%", xl: "10%" }}
              justifyContent={{
                xs: "center",
                sm: "center",
                md: "center",
                lg: "flex-start",
                xl: "flex-start",
              }}
              textAlign={{
                xs: "center",
                sm: "center",
                md: "center",
                lg: "left",
                xl: "left",
              }}
            >
              <Box
                className="test"
                justifyContent={{ xs: "center", sm: "center", md: "center" }}
                textAlign={{ xl: "center", sm: "center", md: "center" }}
              >
                <img
                  src={state.mediaArray[14]?.media}
                  style={{ maxWidth: screen620 ? "150px" : "120px" }}
                  alt={state.mediaArray[14]?.alt}
                />
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "700" }}
                  textAlign="center"
                  fontSize={{
                    xs: "1.3rem",
                    sm: "1.3rem",
                    md: "1.5rem",
                    lg: "1.8rem",
                    xl: "1.8rem",
                  }}
                >
                  Teamwork
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                justifyContent: {
                  xs: "center",
                  sm: "center",
                  md: "center",
                  lg: "flex-end",
                  xl: "flex-end",
                },
              }}
            >
              <Box
                sx={{
                  justifyContent: {
                    xs: "center",
                    sm: "center",
                    md: "center",
                    lg: "center",
                    xl: "flex-end",
                  },
                  mr: { xs: "0", sm: "0", md: "0", lg: "-25px", xl: "-25px" },
                }}
              >
                <img
                  src={state.mediaArray[0]?.media}
                  style={{ maxWidth: screen620 ? "150px" : "120px" }}
                  alt={state.mediaArray[0]?.alt}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "700",
                    fontSize: {
                      xs: "1.3rem",
                      sm: "1.3rem",
                      md: "1.5rem",
                      lg: "1.8rem",
                      xl: "1.8rem",
                    },
                  }}
                  textAlign="center"
                >
                  Succeed
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                mt: { xs: "0", sm: "0", md: "0", lg: "5%", xl: "5%" },
                height: "100%",
                justifyContent: {
                  xs: "center",
                  sm: "center",
                  md: "center",
                  lg: "flex-start",
                  xl: "flex-start",
                },
              }}
              pl={{ xs: 0, sm: 0, md: 0, lg: "39%", xl: "39%" }}
            >
              <Box>
                <img
                  src={state.mediaArray[10]?.media}
                  style={{ maxWidth: screen620 ? "150px" : "120px" }}
                  alt={state.mediaArray[10]?.alt}
                />
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "700", maxWidth: "200px" }}
                  textAlign="center"
                  fontSize={{
                    xs: "1.3rem",
                    sm: "1.3rem",
                    md: "1.5rem",
                    lg: "1.8rem",
                    xl: "1.8rem",
                  }}
                >
                  Fulfilling Environment
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            style={{ justifyContent: "right !importent" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                textAlign: "center",
                justifyContent: {
                  xs: "center",
                  sm: "center",
                  md: "center",
                  lg: "flex-end",
                  xl: "flex-end",
                },
              }}
              pr={{ xs: 0, sm: 0, md: 0, lg: "15%", xl: "15%" }}
            >
              <Box>
                <img
                  src={state.mediaArray[3]?.media}
                  style={{ maxWidth: screen620 ? "150px" : "120px" }}
                  alt={state.mediaArray[3]?.alt}
                />
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "700", maxWidth: "200px" }}
                  textAlign="center"
                  fontSize={{
                    xs: "1.3rem",
                    sm: "1.3rem",
                    md: "1.5rem",
                    lg: "1.8rem",
                    xl: "1.8rem",
                  }}
                >
                  Fun Environment
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid
          container
          spacing={4}
          sx={{
            mt: { xs: "0", sm: "0", md: "2rem", lg: "3rem", xl: "3.5rem" },
          }}
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
              <Box>
                <Typography
                  variant="h2"
                  sx={{ fontWeight: "700" }}
                  fontSize={{
                    xs: "1.5rem",
                    sm: "2rem",
                    md: "2.5rem",
                    lg: "3rem",
                    xl: "3rem",
                  }}
                  mt={{
                    xs: "2rem",
                    sm: "2rem",
                    md: "1rem",
                    lg: "0rem",
                    xl: "0rem",
                  }}
                >
                  Fantastic posts are always the first choice
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    borderLeft: "2px solid #333",
                    paddingLeft: "1rem",
                    marginTop: "2rem",
                  }}
                >
                  Don't miss out on your chance to be featured. Upload your
                  amazing photos or videos on the app & be the first choice of
                  everyone.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Box>
              <img
                src={state.mediaArray[1]?.media}
                style={{ maxWidth: screen900 ? "27rem" : "98%" }}
                alt={state.mediaArray[1]?.alt}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box>
            <img
              src={state.mediaArray[13]?.media}
              alt={state.mediaArray[13]?.alt}
              style={{ width: "100%", verticalAlign: "bottom" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
