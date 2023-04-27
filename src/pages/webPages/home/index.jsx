import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Container, Typography, Grid, Stack, useTheme, Paper, Button, ListItemAvatar, ListItem, List, ListItemText, Card, CardMedia, CardActions, CardHeader, } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { Typewriter } from "react-simple-typewriter";
import MetaTags from "../../../component/organisms/MetaTags/index";
import { tokens } from "../../../theme/theme";
import { GET } from "../../../services/index";
import { WEB } from "../../../routes/apiEndPoints";
import NavigationPaths from "../../../routes/navigationPath";
import CustomProgressBar from "../../../component/organisms/CustomProgressBar/index";
import CounterNumber from "../../../component/molecules/Counter";
import { Link } from "react-router-dom";
import "./style.css";

const color = tokens();
const userEngagementArr = [
  { label: "Active", count: "350", reach: "K" },
  { label: "Downloads", count: "1", reach: "M" },
  { label: "Posts", count: "5", reach: "M" },
];
const barData = [
  { label: "Digital Marketplace", value: 91, bgColor: color.primary[800], barColor: color.blueAccent[600], },
  { label: "Engagements", value: 92, bgColor: color.primary[800], barColor: color.blueAccent[700], },
  { label: "Digital Earners", value: 90, bgColor: color.primary[800], barColor: color.blueAccent[800], },
];

const listingData = [
  { label: " Attract the viewers", caption: "You can increase interaction by making clips or uploading them regularly.", },
  { label: "Create Memories", caption: "The best option to save your memories is to share them with others on the app. ", },
  { label: "Create Pages", caption: "Creating a page for promoting your brand or business can be an incredibly effective way to reach your target audience and build your online presence.", },
];

const defaultObj = {
  mediaArray: [],
};

const Home = () => {
  let location = useLocation();
  const theme = useTheme();
  const isNonMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const extraLarge = useMediaQuery("(min-width:1600px)");
  const [state, setState] = useState(defaultObj);

  useEffect(() => {
    const api_FetchWebMedia = async () => {
      try {
        let { status, message, payload } = await GET(`${WEB.WEB_NAME}${location.pathname === NavigationPaths.HOME ? "/home" : null}`);
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

  return (
    <>
      <MetaTags />
      <Container maxWidth="false">
        <Grid container rowSpacing={4} p={isNonMobile ? "0 2rem" : "0"}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                mt: !isNonMobile ? 3 : 2,
              }}
              pl={{ sx: 0, sm: 0, md: 0, lg: "2rem", xl: "2rem" }}
            >
              <Box textAlign={!isNonMobile && "center"} mb={!isNonMobile ? 3 : 1}>
                <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, color: 'secondary.main', height: isNonMobile ? null : "8rem" }}>
                  <Typewriter
                    words={["Connecting the World", "Build your Own Community", "Connect with Verified Users", "Your personal Social Space"]}
                    loop={0}
                    typeSpeed={80}
                  />
                  &nbsp;
                </Typography>
                <Typography
                  variant={isNonMobile ? "h4" : "h5"}
                  textAlign="justify"
                >
                  A great tool to build powerful communities across the globe
                  and interact with your audience. Influencers and creators can
                  increase their community, engage with their audience, Share
                  beautiful moments with Fans.
                </Typography>
              </Box>
              <Stack
                direction={"row"}
                spacing={3}
                justifyContent={!isNonMobile && "center"}
                p={isNonMobile ? "0" : "0 4rem"}
                mt={4}
              >
                <Box
                  component={"a"}
                  href="https://apps.apple.com/in/app/pickzon/id1560097730"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="appBtn"
                >
                  <img
                    src={state.mediaArray[1]?.media}
                    alt={state.mediaArray[1]?.alt}
                    style={{
                      width: isNonMobile ? "200px" : "150px",
                      height: "auto",
                    }}
                  />
                </Box>
                <Box
                  component={"a"}
                  href="https://play.google.com/store/apps/details?id=com.chat.pickzon"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="appBtn"
                >
                  <img
                    src={state.mediaArray[2]?.media}
                    alt={state.mediaArray[2]?.alt}
                    style={{
                      width: isNonMobile ? "200px" : "150px",
                      height: "auto",
                    }}
                  />
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box
              sx={{
                m: 1,
                display: "flex",
                justifyContent: isNonMobile ? "flex-end" : "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {state.mediaArray[0]?.media && (
                <img
                  src={state.mediaArray[0]?.media}
                  alt={state.mediaArray[0]?.alt}
                  style={{ maxWidth: "100%" }}
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          rowSpacing={4}
          m={"4rem 0rem"}
          sx={{ p: isNonMobile ? "0 6rem" : "" }}
        >
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Box textAlign={"center"}>
              <Typography
                variant="h1"
                color={color.blueAccent[500]}
                sx={{ fontWeight: "900" }}
              >
                User
              </Typography>
              <Typography variant="h5">Engagement</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
            <Stack
              direction={isNonMobile ? "row" : "column"}
              spacing={{ xs: 2, sm: 2, md: 4, lg: 6, xl: 12 }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {userEngagementArr.map((item, i) => {
                return (
                  <Paper elevation={3} key={i}>
                    <Box
                      textAlign={"center"}
                      sx={{ p: " 3rem 1rem", width: "14rem" }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "700", mb: 1 }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        variant="h2"
                        color={"secondary.main"}
                        sx={{ fontWeight: "900" }}
                      >
                        <CounterNumber
                          endNumber={item.count}
                          alphabet={item.reach}
                          icon={"+"}
                        />
                      </Typography>
                    </Box>
                  </Paper>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img
                src={state.mediaArray[15]?.media}
                alt={state.mediaArray[15]?.alt}
                style={{ maxWidth: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
            <Box
              sx={{
                m: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: isNonMobile ? "flex-start" : "center",
                height: "100%",
                p: "5rem 0",
              }}
            >
              <Typography
                variant={isNonMobile ? "h2" : "h4"}
                sx={{
                  fontWeight: 700,
                  textAlign: isNonMobile ? "left" : "center",
                  mb: isNonMobile ? 0 : 6,
                }}
              >
                Know the Absolute Worth!
              </Typography>
              <Stack sx={{ width: "100%" }} spacing={6}>
                {barData.map((item, i) => {
                  return (
                    <React.Fragment key={i}>
                      <CustomProgressBar
                        value={item.value}
                        bgColor={item.bgColor}
                        barColor={item.barColor}
                        title={item.label}
                        titleVariant={"h6"}
                      />
                    </React.Fragment>
                  );
                })}
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{ mt: isNonMobile ? 0 : 2 }}
              >
                <FormatQuoteIcon
                  sx={{
                    fontSize: "2rem",
                    transform: "rotate(180deg)",
                    color: "secondary.main",
                  }}
                />
                <Typography
                  variant={isNonMobile ? "h5" : "body2"}
                  sx={{ fontWeight: "700" }}
                >
                  Build your strong Digital & Social presence.
                </Typography>
                <FormatQuoteIcon
                  sx={{ fontSize: "2rem", color: "secondary.main" }}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                p: isNonMobile ? "1rem" : "0rem",
              }}
            >
              {[
                {
                  image: state.mediaArray[4]?.media,
                  profile: state.mediaArray[8]?.media,
                  imageAlt: state.mediaArray[4]?.alt,
                  profileAlt: state.mediaArray[8]?.alt,
                  l: "984K",
                  c: "94K",
                  s: "40K",
                  name: "Jean H. Faulkner",
                  palce: "Las Vegas, Nevada",
                  caption: "Live Happy, Live Long",
                  date: "3 days ago",
                },
                {
                  image: state.mediaArray[5]?.media,
                  profile: state.mediaArray[9]?.media,
                  imageAlt: state.mediaArray[5]?.alt,
                  profileAlt: state.mediaArray[9]?.alt,
                  l: "854K",
                  c: "74K",
                  s: "60K",
                  name: "Kathy R. Herring",
                  palce: "Austin, Texas",
                  caption: "Let's Go Crazy",
                  date: "2 days ago",
                },
                {
                  image: state.mediaArray[6]?.media,
                  profile: state.mediaArray[10]?.media,
                  imageAlt: state.mediaArray[6]?.alt,
                  profileAlt: state.mediaArray[10]?.alt,
                  l: "754K",
                  c: "78K",
                  s: "35K",
                  name: "Sharon D. Wagner",
                  palce: "Chicago, Illinois",
                  caption: "See life through my eyes",
                  date: "5 days ago",
                },
                {
                  image: state.mediaArray[7]?.media,
                  profile: state.mediaArray[11]?.media,
                  imageAlt: state.mediaArray[7]?.alt,
                  profileAlt: state.mediaArray[11]?.alt,
                  l: "887K",
                  c: "72K",
                  s: "22K",
                  name: "Victoriya Ellie",
                  palce: "London, England",
                  caption: "Live with fun everyday!",
                  date: "3 days ago",
                },
              ].map((item, i) => {
                return (
                  <Card
                    sx={{
                      width: { sx: 300, sm: 300, md: 300, lg: 280, xl: 320 },
                      m: 1,
                    }}
                    key={i}
                  >
                    <CardHeader
                      sx={{ pb: 0.5 }}
                      avatar={
                        <Avatar aria-label={item.profileAlt}>
                          <img src={item.image} alt={item.profileAlt} />
                        </Avatar>
                      }
                      action={
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={item.name}
                      subheader={
                        <>
                          <p>{item.palce}</p>
                          <p>{item.date}</p>
                        </>
                      }
                    />
                    <Typography variant="body1" sx={{ ml: 2 }}>
                      {item.caption}
                    </Typography>
                    <CardMedia
                      component="img"
                      height={{ sx: 280, sm: 280, md: 280, lg: 250, xl: 280 }} //280
                      image={item.profile}
                      alt={item.imageAlt}
                    />
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        p: "0.8rem 0.5rem",
                      }}
                    >
                      <IconButton disableRipple sx={{ p: 0 }}>
                        <FavoriteBorderOutlinedIcon sx={{ fontSize: "1rem" }} />
                        <Typography variant={isNonMobile ? "body2" : "caption"}>
                          {item.l} Likes
                        </Typography>
                      </IconButton>
                      <IconButton disableRipple sx={{ p: 0 }}>
                        <ModeCommentOutlinedIcon sx={{ fontSize: "0.8rem" }} />
                        <Typography variant={isNonMobile ? "body2" : "caption"}>
                          {item.c} Comment
                        </Typography>
                      </IconButton>
                      <IconButton disableRipple sx={{ p: 0 }}>
                        <ReplyOutlinedIcon
                          sx={{ fontSize: "1rem", transform: "scaleX(-1)" }}
                        />
                        <Typography variant={isNonMobile ? "body2" : "caption"}>
                          {item.s} Shares
                        </Typography>
                      </IconButton>
                    </CardActions>
                  </Card>
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box
              sx={{
                m: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: isNonMobile ? "flex-start" : "center",
                height: "100%",
                p: isNonMobile ? "5rem 5rem 5rem 0" : 1,
              }}
            >
              <Typography
                variant={isNonMobile ? "h2" : "h3"}
                sx={{
                  fontWeight: "900",
                  mb: 1,
                  textAlign: isNonMobile ? "left" : "center",
                }}
              >
                Capture{" "}<span style={{ color: color.blueAccent[500] }}>Nostalgic</span>{" "}Moments in a SNAP
              </Typography>
              <Typography
                variant={isNonMobile ? "h5" : "h5"}
                sx={{ textAlign: isNonMobile ? "left" : "justify", mb: "1rem" }}
              >
                Just Scroll your feed if you're feeling lonely and remind
                yourself that you have a wonderful collection of memories. The
                best memories need to be captured in the most beautiful way
                possible. One place to store and share your wonderful memories.
              </Typography>
              <Button
                LinkComponent={Link}
                to={NavigationPaths.FEEDCONTENT}
                variant="contained"
                sx={{ background: color.blueAccent[500], color: "#fff" }}
              >
                Explore More
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid container mt={isNonMobile ? 0 : 5}>
          <Grid item xs={12} sm={10} md={6} lg={6} xl={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                p: { sx: "0", sm: "0", md: "0", lg: "3rem 0rem", xl: `4rem  ${extraLarge ? "6rem" : "1rem"}`, },
              }}
            >
              <List
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  height: "100%",
                }}
              >
                {listingData.map((item, i) => {
                  return (
                    <ListItem
                      key={i}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        p: { sx: "0", sm: "0", md: "0", lg: "0rem 2rem", xl: "0rem 1.5rem", },
                      }}
                    >
                      <ListItemAvatar>
                        <TaskAltRoundedIcon sx={{ fontSize: "3rem" }} />
                      </ListItemAvatar>
                      <ListItemText sx={{ textAlign: "left" }}>
                        <Typography
                          variant={isNonMobile ? "h3" : "h5"}
                          sx={{ fontWeight: "700" }}
                        >
                          {item.label}
                        </Typography>
                        <Typography variant={isNonMobile ? "h5" : "body1"}>
                          {item.caption}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box
              sx={{
                m: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                pl: isNonMobile ? 6 : null,
              }}
            >
              <img
                src={state.mediaArray[16]?.media}
                alt={state.mediaArray[16]?.alt}
                style={{ maxWidth: "100%" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;