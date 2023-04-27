import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  useMediaQuery,
  Button,
  List,
  ListItem,
  CardContent,
  Card,
  Avatar,
  CardHeader,
} from "@mui/material";
import { GET } from "../../../services/index";
import { WEB } from "../../../routes/apiEndPoints";
import NavigationPaths from "../../../routes/navigationPath";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CustomBtn from "../../../component/molecules/CustomBtn";
import { installAppBtn } from "../../../utils/common";

const defaultObj = {
  mediaArray: [],
};

const WhyPickzon = () => {
  const navigate = useNavigate();
  // let theme = useTheme();
  let location = useLocation();
  const [state, setState] = useState(defaultObj);
  const screen1200 = useMediaQuery("(min-width:1200px)");
  const screenMd = useMediaQuery("(min-width:900px)");

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
    { userImg: state.mediaArray[0]?.media, userAlt: "Pickzon person smile" },
    { userImg: state.mediaArray[1]?.media, userAlt: "Pickzon wow user" },
    { userImg: state.mediaArray[2]?.media, userAlt: "Pickzon wow user" },
  ];
  const whypickbox = [
    {
      img: state.mediaArray[5]?.media,
      heading: "Verified Users",
      discr:
        "Get your account verified and receive a green tick on your profile. Become a verified user that invigorates authenticity.",
      alt: state[5]?.alt,
    },
    {
      img: state.mediaArray[6]?.media,
      heading: "Chat",
      discr:
        "Chat with your friends & family across the globe and share updates with them without any messaging charges.",
      alt: state[6]?.alt,
    },
    {
      img: state.mediaArray[20]?.media,
      heading: "Spread Connections",
      discr:
        "Stay connected and make new connections by sharing the app with your loved ones.",
      alt: state[20]?.alt,
    },
  ];

  let servicesSection = [
    {
      img: state.mediaArray[8]?.media,
      alt: state.mediaArray[8]?.alt,
      heading: "Explore Feeds",
      text: "Upload your elegant Photos & Videos in the feed section, or create impressive stories and share them with your connections.",
      background: "linear-gradient(360deg, #3d2858 0%, #62369c 90%)",
      fontColor: " #fff",
      width: "70px",
      padd: "10px",
      path: NavigationPaths.HOME,
    },
    {
      img: state.mediaArray[9]?.media,
      alt: state.mediaArray[9]?.alt,
      heading: "Create Profile",
      text: "Create your professional profile on pickzon and let others reach out to you by looking at your stunning profile.",
      background: "linear-gradient(360deg, #102cce 0%, #234bf2 90%)",
      fontColor: " #fff",
      width: "70px",
      padd: "10px",
      path: NavigationPaths.HOME,
    },
    {
      img: state.mediaArray[10]?.media,
      alt: state[10]?.alt,
      heading: "Make Connections",
      text: "We have diverse users from across the globe. Find new friends and make professional connections.",
      background: "linear-gradient(360deg, #5b2ef8 0%, #a388ff 90%)",
      fontColor: " #fff",
      width: "70px",
      padd: "10px",
      path: NavigationPaths.HOME,
    },
    {
      img: state.mediaArray[11]?.media,
      alt: state[11]?.alt,
      heading: "Create Pages",
      text: "Create Personalized pages & let others join your community. Post regular content, also promote your business.",
      background: "linear-gradient(360deg, #9d3e29 0%, #ff7c69 90%)",
      fontColor: " #fff",
      width: "70px",
      padd: "0px",
      path: NavigationPaths.HOME,
    },
  ];
  const workflowlist = [
    {
      color: "#342ef9",
      title: "Create Profile",
      text: "Make an appealing profile to get followers",
    },
    {
      color: "#ffb937",
      title: "Stay Connected",
      text: "Keep in touch with your loved ones.",
    },
    {
      color: "#ed6567",
      title: "Become Verified User",
      text: "Get a green tick by verifying your Pickzon account.",
    },
    {
      color: "#fa2eec",
      title: "Create page",
      text: "Promote your business by creating page.",
    },
  ];
  const topSection = {
    backgroundImage: `url(${state.mediaArray[19]?.media})`,
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    padding: "3rem 0",
    backgroundRepeat: "no-repeat",
  };

  const _topSection = {
    backgroundColor: "#fbcefb",
  };

  return (
    <>
      <Box sx={screen1200 ? topSection : _topSection}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Typography
                variant="h2"
                sx={{ fontWeight: "700" }}
                mt={{
                  xs: "2rem",
                  sm: "2rem",
                  md: "2rem",
                  lg: "2rem",
                  xl: "2rem",
                }}
                fontSize={{
                  xs: "2rem",
                  sm: "2rem",
                  md: "2.2rem",
                  lg: "3rem",
                  xl: "3rem",
                }}
                mb={{
                  xs: "2rem",
                  sm: "2rem",
                  md: "2rem",
                  lg: "2rem",
                  xl: "2rem",
                }}
              >
                Get Connected with the
                <span style={{ color: "#009cff" }}>Social Engagement</span> App
              </Typography>
              <Typography variant="h5">
                PickZon has a collection of amazing features that makes it a
                must-to-have app. Connect with family & friends, share memories
                with PickZon feeds,engage Audience with commendations( Like,
                Share, Comment). You get all the interesting features, that you
                need to be an influencer or a Creator.
              </Typography>
              <Box
                mt={{
                  xs: "1rem",
                  sm: "1rem",
                  md: "2rem",
                  lg: "2rem",
                  xl: "2rem",
                }}
                mb={{
                  xs: "1rem",
                  sm: "1rem",
                  md: "2rem",
                  lg: "2rem",
                  xl: "2rem",
                }}
              >
                <Button
                  onClick={() => installAppBtn()}
                  variant="contained"
                  sx={{
                    borderRadius: "30px",
                    backgroundColor: "#2185d0",
                    color: "#fff",
                    textDecoration: "none",
                    mr: {
                      xs: "1rem",
                      sm: "2rem",
                      md: "2rem",
                      lg: "2rem",
                      xl: "2rem",
                    },
                  }}
                >
                  Get Started
                </Button>

                <Button
                  LinkComponent={Link}
                  to={NavigationPaths.FEEDCONTENT}
                  variant="outlined"
                  sx={{
                    borderRadius: "30px",
                    color: "#a333c8",
                    border: "1px solid #a333c8",
                  }}
                >
                  News & Feed
                </Button>
              </Box>
              <Box>
                <Box>
                  <List sx={{ display: "flex" }}>
                    <ListItem disablePadding>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "700" }}
                        pr={{
                          xs: "0.2rem",
                          sm: "0.3rem",
                          md: "1rem",
                          lg: "1rem",
                          xl: "1rem",
                        }}
                      >
                        Trusted By
                      </Typography>
                      {userImages.map((item, index) => (
                        <Box>
                          <img
                            src={item.userImg}
                            alt={item.userAlt}
                            style={{ maxWidth: "50px" }}
                          />
                        </Box>
                      ))}
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
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box
                mt={{
                  xs: "2rem",
                  sm: "2rem",
                  md: "2rem",
                  lg: "2rem",
                  xl: "2rem",
                }}
                mb={{
                  xs: "2rem",
                  sm: "2rem",
                  md: "2rem",
                  lg: "2rem",
                  xl: "2rem",
                }}
                textAlign="center"
              >
                <img
                  src={state.mediaArray[3]?.media}
                  alt={state.mediaArray[3]?.alt}
                  style={{ maxWidth: screenMd ? "100%" : "320px" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        mt={{ xs: "2rem", sm: "2rem", md: "2rem", lg: "2rem", xl: "2rem" }}
        mb={{ xs: "2rem", sm: "2rem", md: "2rem", lg: "2rem", xl: "2rem" }}
      >
        <Container>
          <Grid container spacing={2}>
            {whypickbox.map((item, i) => (
              <>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={i}>
                  <Box
                    textAlign="center"
                    sx={{
                      margin: "1rem",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <CardContent>
                      <Box>
                        <img
                          src={item.img}
                          alt={item.alt}
                          style={{ maxWidth: "60px" }}
                        />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: "700" }}>
                        {item.heading}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        style={{ minHeight: "90px" }}
                      >
                        {item.discr}
                      </Typography>
                    </CardContent>
                  </Box>
                </Grid>
              </>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        mt={{ xs: "2rem", sm: "2rem", md: "2rem", lg: "2rem", xl: "2rem" }}
        mb={{ xs: "2rem", sm: "2rem", md: "2rem", lg: "2rem", xl: "2rem" }}
      >
        <Container>
          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: "center",
              margin: "2rem 0",
              maxWidth: "100%",
            }}
          >
            <Box>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography
                  variant="h4"
                  color="#4215ff"
                  sx={{ fontWeight: "700" }}
                  textAlign="center"
                >
                  Our Features
                </Typography>
                <Typography
                  variant="h3"
                  style={{ fontWeight: "700" }}
                  textAlign="center"
                >
                  We offer the Best Features
                </Typography>
                <Typography variant="h6" textAlign="center">
                  Pickzon provides its users with a multitude of Features and
                  lets them connect easier with the professional world.
                </Typography>
              </Grid>
            </Box>
          </Grid>
          <Grid container spacing={1}>
            {servicesSection.map((item, index) => (
              <>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={index}>
                  <Box
                    textAlign="center"
                    sx={{
                      margin: "0.2rem",
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      background: item.background,
                    }}
                  >
                    <CardContent>
                      <Box>
                        <img
                          src={item.img}
                          alt={item.alt}
                          style={{ maxWidth: item.width, padding: item.padd }}
                        />
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "700", color: item.fontColor }}
                      >
                        {item.heading}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        style={{ minHeight: "150px", color: item.fontColor }}
                      >
                        {item.text}
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{
                          borderRadius: "30px",
                          borderColor: "#fff",
                          color: item.fontColor,
                          textDecoration: "none",
                        }}
                        as={Link}
                        to={item.path}
                      >
                        Read More
                      </Button>
                    </CardContent>
                  </Box>
                </Grid>
              </>
            ))}
          </Grid>
        </Container>
        <Box>
          <Container>
            <Grid
              container
              mt={{
                xs: "2rem",
                sm: "2rem",
                md: "3rem",
                lg: "3rem",
                xl: "3rem",
              }}
              mb={{
                xs: "2rem",
                sm: "2rem",
                md: "3rem",
                lg: "3rem",
                xl: "3rem",
              }}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                lg={3}
                xl={3}
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                <Box
                  textAlign={{
                    xs: "center",
                    sx: "center",
                    md: "right",
                    lg: "right",
                    xl: "right",
                  }}
                >
                  <img
                    src={state.mediaArray[12]?.media}
                    alt={state.mediaArray[12]?.alt}
                    style={{ maxWidth: "150px" }}
                  />
                </Box>
                <Box
                  textAlign={{
                    xs: "center",
                    sx: "center",
                    md: "left",
                    lg: "left",
                    xl: "left",
                  }}
                >
                  <img
                    src={state.mediaArray[14]?.media}
                    alt={state.mediaArray[14]?.alt}
                    style={{ maxWidth: "150px" }}
                  />
                </Box>
                <Box
                  textAlign={{
                    xs: "center",
                    sx: "center",
                    md: "center",
                    lg: "center",
                    xl: "center",
                  }}
                >
                  <img
                    src={state.mediaArray[16]?.media}
                    alt={state.mediaArray[16]?.alt}
                    style={{ maxWidth: "150px" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ color: "#a95dc6" }}
                    mt={{
                      xs: "2rem",
                      sm: "2rem",
                      md: "3rem",
                      lg: "3rem",
                      xl: "3rem",
                    }}
                    textAlign="center"
                  >
                    IT'S THE LONG LASTING CONNECTION!
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: "700" }}
                    textAlign="center"
                    mt={{
                      xs: "1rem",
                      sm: "1rem",
                      md: "1.5rem",
                      lg: "1.5rem",
                      xl: "1.5rem",
                    }}
                  >
                    Become famous with PickZon
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    mt={{
                      xs: "1rem",
                      sm: "1rem",
                      md: "1.5rem",
                      lg: "1.5rem",
                      xl: "1.5rem",
                    }}
                  >
                    Want to be a star or an Influencer? Use PickZon, the best
                    social Engagement app to create Posts & get likes, followers
                    and Comments to your account. Become an influencer & make a
                    strong connection between you & your followers.
                  </Typography>
                </Box>
                <Box
                  textAlign="center"
                  mt={{
                    xs: "1.5rem",
                    sm: "1.5rem",
                    md: "2rem",
                    lg: "2rem",
                    xl: "2rem",
                  }}
                >
                  <CustomBtn
                    label={"Be the PickZon Star"}
                    btnRad={3}
                    minHeight={3.2}
                    minWidth={16}
                    fontWeight={700}
                    fontSize={1.3}
                    onClick={() => navigate(NavigationPaths.HOME)}
                  />
                  {/* <Button
                    variant="outlined"
                    sx={{
                      minHeight: "55px",
                      borderRadius: "30px",
                      minWidth: "280px",
                      fontWeight: "700",
                      background: "secondary.main",
                      // theme.palette.mode === "dark" ? "#2185d0" : "#2185d0",
                      color: theme.palette.mode === "dark" ? "#fff" : "#fff",
                      border: "#2185d0",
                    }}
                  >
                    Be the PickZon Star
                  </Button> */}
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                lg={3}
                xl={3}
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                <Box
                  textAlign={{
                    xs: "center",
                    sx: "center",
                    md: "left",
                    lg: "left",
                    xl: "left",
                  }}
                >
                  <img
                    src={state.mediaArray[13]?.media}
                    alt={state.mediaArray[13]?.alt}
                    style={{ maxWidth: "80px" }}
                  />
                </Box>
                <Box
                  textAlign={{
                    xs: "center",
                    sx: "center",
                    md: "right",
                    lg: "right",
                    xl: "right",
                  }}
                >
                  <img
                    src={state.mediaArray[15]?.media}
                    alt={state.mediaArray[15]?.alt}
                    style={{ maxWidth: "150px" }}
                  />
                </Box>
                <Box
                  textAlign={{
                    xs: "center",
                    sx: "center",
                    md: "left",
                    lg: "left",
                    xl: "left",
                  }}
                >
                  <img
                    src={state.mediaArray[17]?.media}
                    alt={state.mediaArray[17]?.alt}
                    style={{ maxWidth: "150px" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Container>
            <Grid container>
              <Grid item xs={12} sm={12} md={4} lg={6} xl={6}>
                <img
                  src={state.mediaArray[18]?.media}
                  alt={state.mediaArray[18]?.alt}
                  style={{ maxWidth: screenMd ? "90%" : "100%" }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={8}
                lg={6}
                xl={6}
                sx={{ display: "flex", alignItems: "center" }}
                pl={{
                  xs: "0rem",
                  sm: "0rem",
                  md: "0rem",
                  lg: "1rem",
                  xl: "1rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: {
                      xs: "center",
                      sm: "center",
                      md: "center",
                      lg: "flex-start",
                      xl: "flex-start",
                    },
                    flexWrap: "wrap",
                  }}
                  mr={"-1rem"}
                >
                  {workflowlist.map((item, index) => (
                    <Card
                      sx={{
                        width: {
                          xs: "280px",
                          sm: "270px",
                          md: "260px",
                          lg: "46%",
                          xl: "46%",
                        },
                        marginBottom: "2rem",
                        marginRight: "1rem",
                      }}
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ background: item.color }}
                            aria-label="recipe"
                          >
                            {index + 1}
                          </Avatar>
                        }
                        title={<strong>{item.title}</strong>}
                        subheader={item.text}
                      />
                    </Card>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default WhyPickzon;
