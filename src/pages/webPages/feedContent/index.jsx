import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  useMediaQuery,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { tokens } from "../../../theme/theme";

import { GET } from "../../../services/index";
import { WEB } from "../../../routes/apiEndPoints";
import { Link, useLocation } from "react-router-dom";
import NavigationPaths from "../../../routes/navigationPath";

const defaultObj = {
  mediaArray: [],
};

const FeedContent = () => {
  const Color = tokens();
  let location = useLocation();
  const [state, setState] = useState(defaultObj);
  const screen900 = useMediaQuery("(min-width:900px)");

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

  const userImages = [
    {
      userImg: state.mediaArray[1]?.media,
      userAlt: state.mediaArray[1]?.alt,
    },
    {
      userImg: state.mediaArray[2]?.media,
      userAlt: state.mediaArray[2]?.alt,
    },
    {
      userImg: state.mediaArray[3]?.media,
      userAlt: state.mediaArray[3]?.alt,
    },
    {
      userImg: state.mediaArray[4]?.media,
      userAlt: state.mediaArray[4]?.alt,
    },
    {
      userImg: state.mediaArray[5]?.media,
      userAlt: state.mediaArray[5]?.alt,
    },
  ];
  const Factors = [
    {
      imageNormal: state?.mediaArray[11]?.media,
      imageWhite: state?.mediaArray[12]?.media,
      title: "Feed",
    },
    {
      imageNormal: state?.mediaArray[13]?.media,
      imageWhite: state?.mediaArray[14]?.media,
      title: "Entertainment",
    },
    {
      imageNormal: state?.mediaArray[15]?.media,
      imageWhite: state?.mediaArray[16]?.media,
      title: "Interact",
    },
    {
      imageNormal: state?.mediaArray[17]?.media,
      imageWhite: state?.mediaArray[18]?.media,
      title: "Explore",
    },
    {
      imageNormal: state?.mediaArray[19]?.media,
      imageWhite: state?.mediaArray[20]?.media,
      title: "Promote",
    },
    {
      imageNormal: state?.mediaArray[21]?.media,
      imageWhite: state?.mediaArray[22]?.media,
      title: "Traffic",
    },
  ];
  const EngagementRight = [
    {
      leftImg: state?.mediaArray[8]?.media,
      alt: state?.mediaArray[8]?.alt,
      title: "Share Interests",
      dis: "Pickzon is for people who love to share interests with friends. Similarly, for brands.",
      btn: [
        { label: "Family & Friends", bgColor: "#3a40cc", color: "#fff" },
        { label: "Neighbours", bgColor: "#fe5fa2", color: "#fff" },
      ],
    },
    {
      leftImg: state?.mediaArray[9]?.media,
      alt: state?.mediaArray[8]?.alt,
      title: "Commendations",
      dis: "Social media engagement tool that allows users to interact on their social media accounts.",
      btn: [
        { label: "Like", bgColor: "#05987b", color: "#fff" },
        { label: "Comment", bgColor: "#fbbd08", color: "#fff" },
        { label: "Share", bgColor: "#6f42d0", color: "#fff" },
      ],
    },
    {
      leftImg: state?.mediaArray[10]?.media,
      alt: state?.mediaArray[8]?.alt,
      title: "Tag People",
      dis: "Share moments with friends, family, and friends by tagging them on the social media app.",
      btn: [
        { label: "Capture & Edit", bgColor: "#f2711c", color: "#fff" },
        { label: "Tag", bgColor: "#8c3258", color: "#fff" },
      ],
    },
  ];
  const networking = {
    maxWidth: "70%",
    borderLeft: "2px solid #ff875e",
    paddingLeft: "2rem",
  };
  const otherNetworking = {
    marginTop: "2rem",
  };
  const centerPart = {
    display: "flex",
    alignItems: "center",
    height: "100%",
  };

  const Style = {
    outerBox: {
      display: "flex",
      flex: "1",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#2aa8ff",
      minHeight: "150px",
      transition: "all 0.2s",
      "&:hover": {
        cursor: "pointer",
        backgroundColor: "#333",
        color: "#fff",
      },
    },
    boxHeight: {
      height: "100px",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      borderRadius: "50%",
      marginBottom: "20px",
      backgroundColor: "#4db4ff",
      width: "100px",
      "&:hover": { color: "#fff" },
    },
    nomouse: { maxWidth: "120px" },
    onmouse: { maxWidth: "120px", display: "none" },
    white: {
      color: "#fff",
    },
  };

  const bottomSection = {
    backgroundImage: `url(${state.mediaArray[23]?.media})`,
    backgroundSize: "600px",
    backgroundPosition: "bottom right",
    padding: "8rem 0",
    backgroundRepeat: "no-repeat",
  };

  const paddingTopBottom = {
    paddingTop: "2rem",
    paddingBottom: "2rem",
  };

  return (
    <>
      <Box>
        <Box
          pt={{ xs: "2rem", sm: "2rem", md: "2rem", lg: "3rem", xl: "3rem" }}
          pb={{ xs: "2rem", sm: "2rem", md: "2rem", lg: "3rem", xl: "3rem" }}
          style={{
            backgroundImage: `url(${state?.mediaArray[0]?.media})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Container>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: "700",
                    fontSize: {
                      xs: "2rem",
                      sm: "2rem",
                      md: "3rem",
                      lg: "4rem",
                      xl: "4rem",
                    },
                  }}
                  mt={{
                    xs: "1rem",
                    sm: "1rem",
                    md: "2rem",
                    lg: "2rem",
                    xl: "1rem",
                  }}
                >
                  Make Endless Contacts on Social Media!
                </Typography>
                <Typography
                  variant="h5"
                  mt={{
                    xs: "0.5rem",
                    sm: "0.5rem",
                    md: "1rem",
                    lg: "1rem",
                    xl: "1rem",
                  }}
                  mb={{
                    xs: "0.5rem",
                    sm: "0.5rem",
                    md: "1rem",
                    lg: "1rem",
                    xl: "1rem",
                  }}
                >
                  Make thousands of friends on Pickzon. The Best Social
                  Networking Platform that lets you connect with people around
                  the world.
                </Typography>
                <Box
                  mt={{
                    xs: "0.5rem",
                    sm: "0.5rem",
                    md: "1rem",
                    lg: "1rem",
                    xl: "1rem",
                  }}
                  mb={{
                    xs: "0.5rem",
                    sm: "0.5rem",
                    md: "1rem",
                    lg: "1rem",
                    xl: "1rem",
                  }}
                >
                  <Button
                    LinkComponent={Link}
                    to={NavigationPaths.HOME}
                    variant="contained"
                    sx={{ background: Color.blueAccent[500], color: "#fff" }}
                  >
                    Get Started
                  </Button>
                </Box>
                <Box>
                  <List sx={{ display: "flex" }}>
                    <ListItem disablePadding>
                      {userImages.map((item, i) => {
                        return (
                          <Box key={i}>
                            <img
                              src={item.userImg}
                              alt={item.userAlt}
                              style={{ maxWidth: "50px", borderRadius: "30px" }}
                            />
                          </Box>
                        );
                      })}
                      <Typography
                        variant="h6"
                        pl={{
                          xs: "0.2rem",
                          sm: "0.3rem",
                          md: "1rem",
                          lg: "1rem",
                          xl: "1rem",
                        }}
                      >
                        1.2M+ Users
                      </Typography>
                    </ListItem>
                  </List>
                </Box>

                <Box>
                  <Typography variant="h5">
                    1.2M+ People have joined the PickZon App. Don’t Wait. Join
                    us Today!
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={6} xl={6}>
                <Box>
                  <img
                    src={state?.mediaArray[6]?.media}
                    alt={state?.mediaArray[6]?.alt}
                    style={{ maxWidth: "100%" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box>
          <Container>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <img
                  src={state?.mediaArray[7]?.media}
                  alt={state?.mediaArray[7]?.alt}
                  style={{ maxWidth: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Box sx={screen900 ? centerPart : null}>
                  <Box>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: "700",
                        fontSize: {
                          xs: "2rem",
                          sm: "2rem",
                          md: "3rem",
                          lg: "4rem",
                          xl: "4rem",
                        },
                      }}
                    >
                      Focus On What Matters
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={screen900 ? networking : otherNetworking}
                    >
                      PickZon is a social networking app that helps influencers
                      & creators to create an engaging community.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box
          mt={{ xs: "1rem", sm: "1rem", md: "3rem", lg: "4rem", xl: "4rem" }}
          mb={{ xs: "1rem", sm: "1rem", md: "3rem", lg: "4rem", xl: "4rem" }}
        >
          <Container>
            <Grid container>
              <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: {
                      xl: "flex-end",
                      lg: "flex-end",
                      md: "flex-end",
                      sm: "center",
                      xs: "center",
                    },
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      textAlign: {
                        xs: "center",
                        sm: "center",
                        md: "right",
                        lg: "right",
                        xl: "right",
                      },
                      fontSize: {
                        xs: "2rem",
                        sm: "2rem",
                        md: "3rem",
                        lg: "4rem",
                        xl: "4rem",
                      },
                      fontWeight: "700",
                    }}
                  >
                    Social Media Engagement
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: {
                        xs: "center",
                        sm: "center",
                        md: "right",
                        lg: "right",
                        xl: "right",
                      },
                      maxWidth: {
                        xs: "100%",
                        sm: "100%",
                        md: "50%",
                        lg: "50%",
                        xl: "50%",
                      },
                    }}
                    mt={{
                      xs: "0.5rem",
                      sm: "0.5rem",
                      md: "0.5rem",
                      lg: "1.5rem",
                      xl: "1.5rem",
                    }}
                    mb={{
                      xs: "1rem",
                      sm: "1rem",
                      md: "1rem",
                      lg: "1rem",
                      xl: "1rem",
                    }}
                  >
                    Pickzon allows you to socialize with friends.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                <Box>
                  {EngagementRight.map((item, i) => {
                    return (
                      <>
                        <Card
                          sx={{
                            maxWidth: "100%",
                            // marginLeft: "2rem",
                            marginBottom: "3rem",
                            ml: {
                              xs: "0rem",
                              sm: "0rem",
                              md: "1rem",
                              lg: "2rem",
                              xl: "2rem",
                            },
                          }}
                          key={i}
                        >
                          <CardHeader
                            sx={{
                              flexDirection: {
                                xl: "row",
                                lg: "row",
                                md: "row",
                                sm: "row",
                                xs: "column",
                              },
                            }}
                            avatar={
                              <img
                                src={item.leftImg}
                                alt={item.alt}
                                style={{ maxWidth: "120px" }}
                              />
                            }
                            title={
                              <Typography
                                variant="h5"
                                sx={{ fontWeight: "700" }}
                              >
                                {item.title}
                              </Typography>
                            }
                            subheader={
                              <>
                                <Typography variant="h6">{item.dis}</Typography>
                                {item.btn.map((item, i) => {
                                  return (
                                    <Button
                                      variant="contained"
                                      sx={{
                                        background: item.bgColor,
                                        color: item.color,
                                        borderRadius: "30px",
                                        marginRight: {
                                          xs: "0.5rem",
                                          sm: "0.5rem",
                                          md: "1rem",
                                          lg: "1rem",
                                          xl: "1rem",
                                        },
                                        mb: {
                                          xs: "1rem",
                                          sm: "1rem",
                                          md: "1rem",
                                          lg: "1rem",
                                          xl: "1rem",
                                        },
                                      }}
                                    >
                                      {item.label}
                                    </Button>
                                  );
                                })}
                              </>
                            }
                          />
                        </Card>
                      </>
                    );
                  })}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box>
          <Container>
            <Box>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  textAlign="center"
                >
                  <Typography variant="h3">Our Features</Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: "700",
                      marginBottom: {
                        xs: "1rem",
                        sm: "1rem",
                        md: "1.5rem",
                        lg: "1.5rem",
                        xl: "1.5rem",
                      },
                      fontSize: {
                        xs: "1.5rem",
                        sm: "1.5rem",
                        md: "2rem",
                        lg: "3rem",
                        xl: "3rem",
                      },
                    }}
                  >
                    Fun & Beneficial Factors
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={2} textAlign="center">
                {Factors.map((item, i) => {
                  return (
                    <>
                      <Grid item xs={6} sm={6} md={4} lg={2} xl={2}>
                        <Card key={i} sx={Style.outerBox}>
                          <CardContent
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <Box sx={Style.boxHeight}>
                              <img
                                // className="nomouse"
                                src={item.imageWhite}
                                alt={item.imageWhite}
                                style={Style.nomouse}
                              />
                              <img
                                className="onmouse"
                                src={item.imageNormal}
                                alt={item.imageNormal}
                                style={Style.onmouse}
                              />
                            </Box>
                            <Typography variant="h5" sx={Style.white}>
                              {item.title}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </Box>
          </Container>
        </Box>
        <Box
          // sx={bottomSection}
          sx={screen900 ? bottomSection : paddingTopBottom}
        >
          {/* > */}
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box
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
                        lg: "3rem",
                        xl: "3rem",
                      },
                    }}
                  >
                    Increase Engagement & Commendations
                  </Typography>
                  <Typography
                    variant="span"
                    sx={{
                      fontSize: {
                        xs: "5rem",
                        sm: "5rem",
                        md: "6rem",
                        lg: "10rem",
                        xl: "10rem",
                      },
                      fontWeight: "700",
                      borderBottom: "4px solid #000",
                    }}
                  >
                    10X
                  </Typography>
                  <Typography variant="h5">
                    Pickzon allows you to engage with your community with 10x
                    better experience with Pickzon Feeds, get commendations from
                    the audience.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default FeedContent;
