import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  useMediaQuery,
  Card,
  CardHeader,
  Tab,
  Tabs,
} from "@mui/material";
import Markting from "./tabs/Marketing";
import "./style.css";
import PropTypes from "prop-types";
// import { tokens } from "../../../theme/theme";
import { GET } from "../../../services/index";
import { WEB } from "../../../routes/apiEndPoints";
import { useLocation } from "react-router-dom";

const defaultObj = {
  mediaArray: [],
};

const Career = () => {
  // const theme = useTheme();
  let location = useLocation();
  const [state, setState] = useState(defaultObj);
  // const color = tokens();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const screen900 = useMediaQuery("(min-width: 900px)");
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
        console.log(">>>>", payload);
      } catch (error) {
        console.error(error);
      }
    };
    api_FetchWebMedia();
  }, [location.pathname]);

  const working = [
    {
      workImg: state.mediaArray[13]?.media,
      workImgAlt: state.mediaArray[13]?.alt,
    },
    {
      workImg: state.mediaArray[14]?.media,
      workImgAlt: state.mediaArray[14]?.alt,
    },
    {
      workImg: state.mediaArray[15]?.media,
      workImgAlt: state.mediaArray[15]?.Alt,
    },
  ];

  const options = [
    {
      clipImg: state.mediaArray[5]?.media,
      title: "Get Inspired",
      text: "Seniors will encourage you with a better understanding than in other offices.",
    },
    {
      clipImg: state.mediaArray[6]?.media,
      title: "Forever Experience",
      text: "Enjoy difficult tasks and a successful career free of hierarchy",
    },
    {
      clipImg: state.mediaArray[7]?.media,
      title: "Learning-Oriented",
      text: "Learn new and innovative things to add to your experience",
    },
    {
      clipImg: state.mediaArray[8]?.media,
      title: "Employ Benefits",
      text: "Employees are the assets of the company therefore, these benefits are their right",
    },
    {
      clipImg: state.mediaArray[9]?.media,
      title: "Generates Proficiency",
      text: "We believe in proficiency thus, an employee is selected based on a similar basis ",
    },
    {
      clipImg: state.mediaArray[10]?.media,
      title: "Healthy Ambience ",
      text: "You will find a clean environment that will keep your mind fresh every day to work",
    },
  ];
  const outerBox = {
    backgroundColor: "#f9fafe",
    padding: "5rem 0",
    backgroundImage: `url(${state.mediaArray[4]?.media})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
  };
  const outerBoxBg = {
    backgroundColor: "#f9fafe",
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <>
      <Box>
        <Box sx={screen900 ? outerBox : outerBoxBg}>
          <Container>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="h4">
                  <img
                    src={state.mediaArray[0]?.media}
                    alt={state.mediaArray[0]?.alt}
                    style={{ maxWidth: "120px" }}
                  />
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  variant="h2"
                  textAlign="center"
                  sx={{
                    fontWeight: "700",
                    fontSize: { xl: "4rem" },
                    pr: { xl: "12rem", lg: "10rem", md: "5rem", xs: "0" },
                  }}
                >
                  Find Your
                  <Typography variant="span" style={{ color: "#4183c4" }}>
                    Dream Job
                  </Typography>
                  Here Easy and Fast
                </Typography>
              </Grid>
            </Grid>
          </Container>

          <Container>
            <Grid container>
              <Grid item xs={10}>
                <Typography
                  variant="h6"
                  textAlign="center"
                  sx={{
                    fontWeight: "300",
                    pr: { xl: "3rem", md: "2", xs: "0" },
                    pl: { xl: "10rem", md: "5rem", xs: "0" },
                    pt: { xl: "2rem", lg: "2rem", md: "1rem", xs: "0.5rem" },
                  }}
                >
                  Finding jobs that justifies your talent is very difficult.
                  PickZon is the best social media app where you can find jobs
                  hassle-free along with enjoying the app.
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography
                  variant="h4"
                  sx={{
                    mt: { xl: "-2rem", lg: "-2rem", md: "-1.5rem", xs: "0" },
                  }}
                >
                  <img
                    src={state.mediaArray[1]?.media}
                    alt={state.mediaArray[1]?.alt}
                    style={{ maxWidth: "120px" }}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Container>
          <Box sx={{ mt: "1rem" }}>
            <Container>
              <Grid container>
                <Grid item xl={2}>
                  <Typography variant="h4">
                    <img
                      src={state.mediaArray[2]?.media}
                      alt={state.mediaArray[2]?.alt}
                      style={{ maxWidth: "190px" }}
                    />
                  </Typography>
                </Grid>
                <Grid item xl={8}></Grid>
                <Grid item xl={2}>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        textAlign: {
                          xl: "right",
                          lg: "right",
                          md: "center",
                          xs: "center",
                        },
                      }}
                    >
                      <img
                        src={state.mediaArray[3]?.media}
                        alt={state.mediaArray[3]?.alt}
                        style={{ maxWidth: "150px" }}
                      />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box>
          <Container>
            <Grid container>
              <Grid item sx={{ margin: "3rem 0" }} xs={12} textAlign="center">
                <Typography variant="h3" sx={{ fontWeight: "700" }}>
                  About Working Here
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box>
          <Container>
            <Grid container spacing={2}>
              <Grid item xl={12} spacing={2}>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {options.map((item, i) => {
                    return (
                      <>
                        <Grid
                          item
                          xl={6}
                          lg={6}
                          md={6}
                          sm={6}
                          xs={12}
                          className="space-area"
                          sx={{
                            ml: {
                              xs: "0rem",
                              sm: "0rem",
                            },
                          }}
                        >
                          <Card
                            sx={{
                              maxWidth: {
                                xl: "100%",
                                lg: "100%",
                                md: "100%",
                                sm: "95%",
                                xs: "100%",
                              },
                              marginBottom: "3rem",
                              ml: {
                                xs: "0rem",
                                sm: "0rem",
                                md: "0rem",
                                lg: "0rem",
                                xl: "0rem",
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
                                alignItems: { xs: "flex-start" },
                              }}
                              avatar={
                                <img
                                  src={item.clipImg}
                                  alt={item.alt}
                                  style={{ maxWidth: "50px" }}
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
                                  <Typography
                                    variant="h6"
                                    sx={{ minHeight: "50px" }}
                                  >
                                    {item.text}
                                  </Typography>
                                </>
                              }
                            />
                          </Card>
                        </Grid>
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
            <Grid container spacing={3}>
              {working.map((item, i) => {
                return (
                  <>
                    <Grid item xs={4}>
                      <img
                        src={item.workImg}
                        alt={item.workImgAlt}
                        style={{ maxWidth: "100%" }}
                      />
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Container>
        </Box>

        <Box
          spacing={4}
          sx={{
            mt: { xs: "2rem" },
          }}
        >
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h3" textAlign="center">
                  Available Positions
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box spacing={4}>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Marketing" {...a11yProps(0)} />
                      <Tab label="Developer/Programming" {...a11yProps(1)} />
                      <Tab label="Creative" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0} sx={{ padding: "0" }}>
                    <Grid container>
                      <Grid item xs={6} md={6} sm={6} lg={7} xl={7}>
                        <Typography variant="h5">Marketing Job</Typography>
                      </Grid>
                      <Grid
                        item
                        sm={6}
                        md={6}
                        xs={6}
                        lg={5}
                        xl={5}
                        sx={{
                          textAlign: {
                            xl: "right",
                            lg: "right",
                            md: "center",
                            xs: "center",
                            sm: "center",
                          },
                        }}
                      >
                        <Markting name="Apply Now" />
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Grid container>
                      <Grid item xs={6} md={6} sm={6} lg={7} xl={7}>
                        <Typography variant="h5">
                          Developer/Programming
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        sm={6}
                        md={6}
                        xs={6}
                        lg={5}
                        xl={5}
                        sx={{
                          textAlign: {
                            xl: "right",
                            lg: "right",
                            md: "center",
                            xs: "center",
                            sm: "center",
                          },
                        }}
                      >
                        <Markting name="Apply Now" />
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <Grid container>
                      <Grid item xs={6} md={6} sm={6} lg={7} xl={7}>
                        <Typography variant="h5">Creative</Typography>
                      </Grid>
                      <Grid
                        item
                        sm={6}
                        md={6}
                        xs={6}
                        lg={5}
                        xl={5}
                        sx={{
                          textAlign: {
                            xl: "right",
                            lg: "right",
                            md: "center",
                            xs: "center",
                            sm: "center",
                          },
                        }}
                      >
                        <Markting name="Apply Now" />
                      </Grid>
                    </Grid>
                  </TabPanel>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Career;
