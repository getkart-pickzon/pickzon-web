import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  useMediaQuery,
  Button,
  useTheme,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { GET } from "../../../services/index";
import { WEB } from "../../../routes/apiEndPoints";
import { useLocation } from "react-router-dom";
import "./style.css";

const defaultObj = {
  mediaArray: [],
};

const Security = () => {
  const theme = useTheme();
  let location = useLocation();
  const [state, setState] = useState(defaultObj);
  const screenMd = useMediaQuery("(min-width:900px)");
  const screenXS = useMediaQuery("(min-width:320px)");
  const screenxxs = useMediaQuery("(min-width:768px)");
  const screexl = useMediaQuery("(min-width:1300px)");

  const topSection = {
    backgroundImage: `url(${state.mediaArray[20]?.media})`,
    backgroundSize: "150px",
    backgroundPosition: "-50px center",
    backgroundRepeat: "no-repeat",
    padding: "1rem 0",
  };

  const _topSection = {
    backgroundColor: "#fbcefb",
    padding: "2rem 0",
  };

  const userSection = [
    {
      userPic: state.mediaArray[15]?.media,
      heading: "Secure User Authentication",
      dis: "Secure user authentication is your barrier to entry and helps establish accountability for users.",
      bgColor: "#fbf7f4",
    },
    {
      userPic: state.mediaArray[16]?.media,
      heading: "Safeguard user sessions",
      dis: "Protect the privacy of your users with our advanced security features that ensure a secure and safe browsing experience.",
      bgColor: "#f6f6f6",
    },
    {
      userPic: state.mediaArray[17]?.media,
      heading: "Data Encryption",
      dis: "It is the process of scrambling data in an attempt to prevent it from being accessed or altered without authorization.",
      bgColor: "#f6f6f6",
    },
  ];

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

  const bgSectionSurity = {
    backgroundImage: `url(${state.mediaArray[18]?.media})`,
    backgroundSize: "100%",
    backgroundPosition: "center",
    padding: "0",
    backgroundRepeat: "no-repeat",
  };

  const BgSizeMobile = {
    maxWidth: "100%",
  };
  const BgSizeDesktop = {
    maxWidth: "600px",
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={screexl ? topSection : _topSection}>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: {
                          xs: "1.5rem",
                          sm: "1.8rem",
                          md: "2rem",
                          lg: "3rem",
                          xl: "3rem",
                        },
                        fontWeight: "700",
                      }}
                    >
                      Secure your data with powerful access
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        mt: {
                          xs: "1rem",
                          sm: "1rem",
                          md: "1.5rem",
                          lg: "1.5rem",
                          xl: "1.5rem",
                        },
                      }}
                    >
                      We appreciate your confidence in entrusting us with your
                      personal information, so we assemble every effort to
                      protect it through legally permissible measures.
                    </Typography>
                    <Box
                      sx={{
                        mt: {
                          xs: "1rem",
                          sm: "1rem",
                          md: "2rem",
                          lg: "2rem",
                          xl: "2rem",
                        },
                        textAlign: {
                          xs: "center",
                          sm: "left",
                          md: "left",
                          lg: "left",
                          xl: "left",
                        },
                      }}
                    >
                      <Box
                        component={"a"}
                        href="https://apps.apple.com/in/app/pickzon/id1560097730"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="appBtn"
                        sx={{
                          mr: {
                            xs: "0",
                            sm: "1rem",
                            md: "2rem",
                            lg: "2rem",
                            xl: "2rem",
                          },
                        }}
                      >
                        <img
                          src={state.mediaArray[8]?.media}
                          alt={state.mediaArray[8]?.alt}
                          style={{
                            width: screenMd ? "200px" : "150px",
                            height: "auto",
                            maxWidth: "10rem", borderRadius: "8px"
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
                          src={state.mediaArray[9]?.media}
                          alt={state.mediaArray[9]?.alt}
                          style={{
                            width: screenMd ? "200px" : "150px",
                            height: "auto",
                            maxWidth: "10rem", borderRadius: "8px"
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Box
                  mt={{
                    xs: "1rem",
                    sm: "1rem",
                    md: "1rem",
                    lg: "1rem",
                    xl: "2rem",
                  }}
                  mb={{
                    xs: "1rem",
                    sm: "1rem",
                    md: "1rem",
                    lg: "1rem",
                    xl: "2rem",
                  }}
                >
                  <img
                    src={state.mediaArray[7]?.media}
                    alt={state.mediaArray[7]?.alt}
                    style={{ maxWidth: "100%", marginTop: "1rem" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box
          sx={{
            mt: { xs: "1rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1rem" },
            mb: { xs: "1rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1rem" },
          }}
        >
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box>
                  <Box
                    sx={{
                      maxWidth: {
                        xs: "100%",
                        sm: "100%",
                        md: "80%",
                        lg: "70%",
                        xl: "70%",
                      },
                      margin: "0 auto",
                    }}
                  >
                    <Typography
                      variant="h1"
                      textAlign="center"
                      sx={{
                        fontSize: {
                          xs: "1.5rem",
                          sm: "1.8rem",
                          md: "2rem",
                          lg: "3rem",
                          xl: "3rem",
                        },
                        fontWeight: "700",
                      }}
                    >
                      Community Safety
                    </Typography>
                    <Typography
                      variant="h6"
                      textAlign="center"
                      sx={{
                        mt: {
                          xs: "0.5rem",
                          sm: "0.5rem",
                          md: "0.5rem",
                          lg: "0.5rem",
                          xl: "0.5rem",
                        },
                        m: { lg: "0 auto", md: "0 auto" },
                      }}
                    >
                      If you choose to use our Service, you agree to the
                      collection & use of information about this policy. The
                      Personal Information of the user that we collect is used
                      for providing and improving the Service. We will not use
                      or share your information with anyone except as described
                      in this Privacy Policy.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
          <Box>
            <Container>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Box sx={{ textAlign: "center" }}>
                    <img
                      src={state.mediaArray[10]?.media}
                      alt={state.mediaArray[10]?.alt}
                      style={{
                        maxWidth: "90%",
                        marginTop: "1rem",
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Box sx={{ textAlign: "center" }}>
                    <img
                      src={state.mediaArray[11]?.media}
                      alt={state.mediaArray[11]?.alt}
                      style={{ maxWidth: "90%", marginTop: "1rem" }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box>
          <Container>
            <Grid container>
              <Grid item xs={12}>
                <Box textAlign="center">
                  <img
                    src={state.mediaArray[12]?.media}
                    alt={state.mediaArray[12]?.alt}
                    style={{ maxWidth: "90%", marginTop: "1rem" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box>
          <Container>
            <Grid container>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <Box
                  textAlign="left"
                  sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                >
                  <img
                    src={state.mediaArray[13]?.media}
                    alt={state.mediaArray[13]?.alt}
                    style={{ maxWidth: "100%", marginTop: "1rem" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                <Box textAlign="left">
                  <Typography
                    variant="h3"
                    ml={{
                      xs: "0rem",
                      sm: "0rem",
                      md: "-3rem",
                      lg: "-3rem",
                      xl: "-3rem",
                    }}
                    mr={{
                      xs: "0rem",
                      sm: "0rem",
                      md: "-6rem",
                      lg: "-6rem",
                      xl: "-6rem",
                    }}
                    sx={{
                      fontWeight: "700",
                      fontSize: {
                        xs: "1.5rem",
                        sm: "1.5rem",
                        md: "2rem",
                        lg: "2.3rem",
                        xl: "2.3rem",
                      },
                      textAlign: {
                        xs: "center",
                        sm: "center",
                        md: "left",
                      },
                    }}
                  >
                    Users Satisfaction is Our Priority
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: {
                        xs: "0.5rem",
                        sm: "0.5rem",
                        md: "1rem",
                        lg: "1rem",
                        xl: "1rem",
                      },
                      textAlign: {
                        xs: "center",
                        sm: "center",
                        md: "left",
                      },
                    }}
                  >
                    Our safety and security teams are always on alert. We're
                    committed to protecting your privacy, so feel free to
                    contact us if you have any questions or concerns about your
                    personal information.
                  </Typography>

                  <Box sx={{
                    textAlign: "center",
                    mt: {
                      xs: "0.5rem",
                      sm: "0.5rem",
                      md: "1rem",
                      lg: "1rem",
                      xl: "1rem",
                    },
                  }}>
                    <Box
                      component={"a"}
                      href="https://play.google.com/store/apps/details?id=com.chat.pickzon"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="appBtn"
                      sx={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#2185d0", border: "none" }}
                      >
                        Get Started
                      </Button>
                    </Box>
                  </Box>

                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={5} xl={4}>
                <Box
                  textAlign="left"
                  sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                >
                  <img
                    src={state.mediaArray[14]?.media}
                    alt={state.mediaArray[14]?.alt}
                    style={{ maxWidth: "100%", marginTop: "1rem" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box
          sx={{
            mt: { xs: "1rem", sm: "1rem", md: "3rem", lg: "3rem", xl: "3rem" },
            mb: { xs: "1rem", sm: "1rem", md: "3rem", lg: "3rem", xl: "3rem" },
          }}
        >
          <Container>
            <Grid container spacing={3}>
              {userSection.map((item, i) => {
                return (
                  <Grid
                    key={i}
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    xl={4}
                    sx={{
                      mt: {
                        xs: "1rem",
                        sm: "1rem",
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
                    <Card
                      sx={{
                        backgroundColor: theme.palette.mode === "dark" ? "#121212" : item.bgColor,
                        border: { xs: "1px solid #d4d4d5" },
                        maxWidth: {
                          xs: "100%",
                          sm: "100%",
                          md: "90%",
                          lg: "90%",
                          xl: "90%",
                        },
                        ml: {
                          xs: "0%",
                          sm: "0%",
                          md: "5%",
                          lg: "5%",
                          xl: "5%",
                        },
                      }}
                    >
                      <CardMedia
                        sx={{
                          mt: {
                            xs: "1rem",
                            sm: "1rem",
                            md: "1.2rem",
                            lg: "1.3rem",
                            xl: "1.3rem",
                          },
                          pb: {
                            xs: "1rem",
                            sm: "1rem",
                            md: "1rem",
                            lg: "1rem",
                            xl: "1rem",
                          },
                          textAlign: "center",
                          borderBottom: "1px solid #d4d4d5",
                        }}
                      >
                        <img src={item.userPic} alt={item.heading} style={{ width: "80px" }} />
                      </CardMedia>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          textAlign="center"
                          sx={{ fontWeight: "700" }}
                        >
                          {item.heading}
                        </Typography>
                        <Typography variant="h6" sx={{ minHeight: "60px" }}>
                          {item.dis}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>
        <Box sx={screenXS ? bgSectionSurity : null}>
          <Container>
            <Grid container>
              <Grid item xs={12}>
                <Box className="usertalk-outer">
                  <Container style={{ padding: "50px 0px" }}>
                    <div
                      className="spinny-set"
                      style={{ position: "relative" }}
                    >
                      <img
                        src={state.mediaArray[19]?.media}
                        alt={state.mediaArray[19]?.alt}
                        style={screenxxs ? BgSizeDesktop : BgSizeMobile}
                      />
                      <div
                        className="spinny-set"
                        style={{ position: "absolute", top: "0px" }}
                      >
                        <div>
                          <img
                            src={state.mediaArray[3]?.media}
                            alt={state.mediaArray[3]?.alt}
                            className="spinny-set_img"
                          />
                        </div>
                        <div
                          className="spin-item_1"
                          style={{ animationDelay: "-2.5s" }}
                        >
                          <img
                            src={state.mediaArray[0]?.media}
                            alt={state.mediaArray[0]?.alt}
                            className="spin-item_1_img"
                          />
                        </div>
                        <div
                          className="spin-item_1"
                          style={{ animationDelay: "-9s" }}
                        >
                          <img
                            src={state.mediaArray[6]?.media}
                            alt={state.mediaArray[6]?.alt}
                            className="spin-item_1_img"
                          />
                        </div>
                        <div
                          className="spin-item_1"
                          style={{ animationDelay: "-16s" }}
                        >
                          <img
                            src={state.mediaArray[2]?.media}
                            alt={state.mediaArray[2]?.alt}
                            className="spin-item_1_img"
                          />
                        </div>
                        <div
                          className="spin-item_2"
                          style={{ animationDelay: "-4.5s" }}
                        >
                          <img
                            src={state.mediaArray[1]?.media}
                            alt={state.mediaArray[1]?.alt}
                            className="spin-item_2_img"
                          />
                        </div>
                        <div
                          className="spin-item_2"
                          style={{ animationDelay: "-11s" }}
                        >
                          <img
                            src={state.mediaArray[4]?.media}
                            alt={state.mediaArray[4]?.alt}
                            className="spin-item_2_img"
                          />
                        </div>
                        <div
                          className="spin-item_2"
                          style={{ animationDelay: "-18s" }}
                        >
                          <img
                            src={state.mediaArray[5]?.media}
                            alt={state.mediaArray[5]?.alt}
                            className="spin-item_2_img"
                          />
                        </div>
                      </div>
                    </div>
                  </Container>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Security;
