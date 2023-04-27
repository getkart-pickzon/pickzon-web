import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
  CardContent,
  List,
  ListItemText,
  ListItem,
} from "@mui/material";

import { GET } from "../../../services/index";
import { WEB } from "../../../routes/apiEndPoints";
import { FaqCom } from "./Common";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useLocation } from "react-router-dom";

const defaultObj = {
  mediaArray: [],
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Faq = () => {
  const theme = useTheme();

  let location = useLocation();
  const [state, setState] = useState(defaultObj);
  const screen1024 = useMediaQuery("(min-width:1200px)");
  const screen620 = useMediaQuery("(min-width: 620px)");
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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

  let servicesSection = [
    {
      img:
        theme.palette.mode === "dark"
          ? state.mediaArray[4]?.media
          : state.mediaArray[1]?.media,
      alt: state[1]?.alt,
      heading: "Grow your Network",
      text: "Make connections with your Friends & Family.",
    },
    {
      img:
        theme.palette.mode === "dark"
          ? state.mediaArray[3]?.media
          : state.mediaArray[2]?.media,

      alt: state[2]?.alt,
      heading: "Career Growth",
      text: "Build your Professional community and grow in your Career.",
    },
    {
      img: state.mediaArray[9]?.media,
      alt: state[9]?.alt,
      heading: "Verified Users",
      text: "Get your account verified & receive a growth tick on your profile",
    },
  ];
  const pickzonSecBg = {
    background: `#007bff url(${state.mediaArray[11]?.media})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right center",
    backgroundSize: "70px",
    padding: "3rem 0px",
  };
  const pickzonSecBgMobile = {
    background: "#007bff",
    padding: "2rem 0px",
  };
  const generate = [
    FaqCom.content.list1,
    FaqCom.content.list2,
    FaqCom.content.list3,
    FaqCom.content.list4,
    FaqCom.content.list5,
  ];

  return (
    <Box>
      <Box
        sx={{
          background: "linear-gradient(360deg, #3347bc 4%, #4b6bef 50%)",
          padding: "4rem 0",
        }}
      >
        <Container>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: "700",
                  fontSize: {
                    xs: "2rem",
                    sm: "2rem",
                    md: "3rem",
                    lg: "4rem",
                    xl: "6.2rem",
                  },
                  color: "#fff",
                }}
              >
                How can we help?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <img
                src={state.mediaArray[0]?.media}
                alt={state.mediaArray[0]?.alt}
                style={{ maxWidth: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          margin: "2rem 0",
        }}
      >
        <Container>
          <Grid container spacing={6}>
            {servicesSection.map((item, i) => {
              return (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={i}>
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
                            style={{ maxWidth: "80px" }}
                          />
                        </Box>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: "700", margin: "0.6rem 0" }}
                        >
                          {item.heading}
                        </Typography>
                        <Typography variant="h6" component="div">
                          {item.text}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Container>
      </Box>
      <Box sx={screen1024 ? pickzonSecBg : pickzonSecBgMobile}>
        <Container>
          <Grid container>
            <Grid item xs={12} sm={12} md={3} lg={1} xl={1}>
              <img
                src={state.mediaArray[10]?.media}
                alt={state.mediaArray[10]?.alt}
                style={{ maxWidth: "80px" }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={10} xl={10}>
              <Typography
                variant="h3"
                sx={{ fontWeight: "700", color: "#fff" }}
              >
                {FaqCom?.Frequently}
              </Typography>
              <Typography variant="h6" sx={{ color: "#fff" }}>
                {FaqCom?.Frequently2}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          mt: { xs: "2rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3rem" },
          mb: { xs: "2rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3rem" },
        }}
      >
        <Container>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography variant="h5" sx={{ fontWeight: "700" }}>
                    {FaqCom.head1}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="h6">{FaqCom.pra1}</Typography>
                  <List>
                    {generate.map((item, i) => {
                      return (
                        <>
                          <ListItem>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "0.8rem", marginRight: "0.5rem" }}
                            />
                            <ListItemText>{item}</ListItemText>
                          </ListItem>
                        </>
                      );
                    })}
                  </List>
                  <Typography variant="h6">{FaqCom.pra1_1}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography variant="h5" sx={{ fontWeight: "700" }}>
                    {FaqCom.head2}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{FaqCom.pra2}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                >
                  <Typography variant="h5" sx={{ fontWeight: "700" }}>
                    {FaqCom.head3}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{FaqCom.pra3}</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4")}
              >
                <AccordionSummary
                  aria-controls="panel4d-content"
                  id="panel3d-header"
                >
                  <Typography variant="h5" sx={{ fontWeight: "700" }}>
                    {FaqCom.head4}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{FaqCom.pra4}</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box>
        <Container>
          <Grid container>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
              <Typography
                variant="h4"
                sx={{
                  maxWidth: "390px",
                  fontWeight: "700",
                  margin: "2rem 0 1rem 0",
                }}
              >
                Download the PickZon app, & manage your account!
              </Typography>
              <Box
                sx={{
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
                >
                  <img
                    src={state.mediaArray[5]?.media}
                    alt={state.mediaArray[5]?.alt}
                    style={{
                      width: screen620 ? "150px" : "120px",
                      marginRight: "15px",
                      borderRadius: "5px",
                      height: "auto",
                      boxShadow: "1px 3px 8px 1px #8f8b8b",
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
                    src={state.mediaArray[6]?.media}
                    alt={state.mediaArray[6]?.alt}
                    style={{
                      width: screen620 ? "150px" : "120px",
                      borderRadius: "5px",
                      height: "auto",
                      boxShadow: "1px 3px 8px 1px #8f8b8b",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
              <Typography
                variant="h4"
                textAlign="center"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={state.mediaArray[7]?.media}
                  alt={state.mediaArray[7]?.alt}
                  style={{ maxWidth: "300px" }}
                />
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Faq;
