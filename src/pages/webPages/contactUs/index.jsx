import React, { useEffect, useState } from "react";
import { Box, Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography, useMediaQuery, useTheme, } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PUBLIC, WEB } from "../../../routes/apiEndPoints";
import { FORMDATA, GET } from "../../../services";
import { onShowSnackbar } from "../../../redux/reducer/snackbar";
import REGEX from "../../../helper/regexPattern";
import Metatags from "../../../component/organisms/MetaTags";
import ScreenshotOutlinedIcon from "@mui/icons-material/ScreenshotOutlined";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const defaultObj = {
  name: "",
  email: "",
  mobile: "",
  issue: "",
  category: "",
  files: {},
  img: "",
};

const ContactUs = () => {
  let location = useLocation();
  const theme = useTheme();
  const isNonMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch();
  const [state, setState] = useState(defaultObj);
  const [bgImg, setBgImg] = useState({ mediaArray: [] });
  const [option, setOption] = useState([]);

  const Style = {
    wrapper: {
      backgroundImage:
        theme.palette.mode === "dark"
          ? `linear-gradient(#00000080,#00000080), url(${bgImg.mediaArray[0]?.media})`
          : `url(${bgImg.mediaArray[0]?.media})`,
      backgroundSize: "cover",
      paddingBottom: "1rem",
      backgroundPosition: isNonMobile ? "" : "center",
      backgroundRepeat: "no-repeat",
    },

    formWrapper: {
      padding: isNonMobile ? "2rem" : "2rem 1rem",
      background: "#ffffff1f",
      borderRadius: "1rem",
      boxShadow: "0 4px 30px #0000001a",
      backdropFilter: "blur(5.4px)",
      webkitbackdropFilter: "blur(5.4px)",
      border: "1px solid #ffffff54",
    },

    uploadWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "20rem",
      border: `0.1rem solid ${theme.palette.mode === "dark" ? "#ffffff3b" : "#0000003b"
        }`,
      borderRadius: "0.3rem",
      "&:hover": {
        border: `0.1rem solid`,
        borderColor: "primary.100",
      },
    },

    uploadBox: {
      border: `0.2rem dashed ${theme.palette.mode === "dark" ? "#ffffff3b" : "#0000003b"
        }`,
      borderRadius: "0.5rem",
      textAlign: "center",
      padding: "3rem 7rem",
      "&:hover": {
        cursor: "pointer",
        borderStyle: "dashed",
        border: "0.2rem dashed",
        borderColor: "primary.100",
      },
    },
    submitBtn: {
      backgroundColor: "secondary.main",
      textTransform: "none",
    },
    "&:hover": {
      backgroundColor: "secondary.main",
    },
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
        setBgImg((prev) => ({
          ...prev,
          mediaArray: payload.mediaCdnUrl || [],
        }));
      } catch (error) {
        console.error(error);
      }
    };
    api_FetchWebMedia();
    api_FetchCategory();
  }, [location.pathname]);

  const api_FetchCategory = async () => {
    try {
      let { status, message, payload } = await GET(
        PUBLIC.CONTACTUS_CATEGORY,
        {}
      );
      if (status === 0) {
        console.log(message);
      }
      setOption(payload);
    } catch (error) {
      console.error(error);
    }
  };

  const onHandleChange = (e) => {
    try {
      e.preventDefault();
      const value = e.target.value;
      const name = e.target.name;
      if (name === "mobile") {
        if (!value.match(REGEX.POSITIVE_INT)) {
          dispatch(
            onShowSnackbar({
              message: "Enter correct Phone no.",
              status: "error",
              call: true,
            })
          );
          return false;
        }
        if (value.length > 15) {
          dispatch(
            onShowSnackbar({
              message: "Enter upto 15 digits",
              status: "error",
              call: true,
            })
          );
          return false;
        }
      }
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const validateEmail = (value) => {
    try {
      if (!value.match(REGEX.EMAIL)) {
        dispatch(
          onShowSnackbar({
            message: "Enter correct email address",
            status: "error",
            call: true,
          })
        );
        return false;
      }
      return true;
    } catch (er) {
      console.log(er);
    }
  };

  const onHandleUploadImage = (event) => {
    try {
      event.preventDefault();
      const { files } = event.target;
      // let name = event.target.id
      let mediaObj = {};
      mediaObj.alt = files[0].name;
      mediaObj.filePath = files[0];
      mediaObj.image = URL.createObjectURL(files[0]);
      let validateFormat = mediaObj.alt.match(REGEX.IMAGES_EXT);
      if (!validateFormat) {
        return dispatch(
          onShowSnackbar({
            message: "Image Format Unsupported",
            status: "error",
            call: true,
          })
        );
      } else {
        setState((pre) => ({
          ...pre,
          files: mediaObj.filePath,
          img: mediaObj.image,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleRemove = () => {
    setState((pre) => ({
      ...pre,
      files: {},
      img: "",
    }));
  };

  const onHandleFormSubmit = async (e) => {
    e.preventDefault();
    if (!state.name || !state.email || !state.mobile || !state.issue || !state.category) {
      return dispatch(
        onShowSnackbar({
          message: "Please fill mandatory fields",
          status: "error",
          call: true,
        })
      );
    } else if (!validateEmail(state.email)) {
      return;
    } else {
      delete state.img;
      let { status, message } = await FORMDATA(PUBLIC.SUBMIT_CONTACTUS, state);
      if (status === 0) {
        return dispatch(
          onShowSnackbar({ message: message, status: "error", call: true })
        );
      }
      setState(defaultObj);
      return dispatch(
        onShowSnackbar({ message: message, status: "success", call: true })
      );
    }
  };

  return (
    <>
      <Metatags />
      <Container maxWidth="false" sx={Style.wrapper}>
        <Container>
          <Box p={"2rem 0"}>
            <Grid
              container
              component={"form"}
              sx={Style.formWrapper}
              onSubmit={onHandleFormSubmit}
            >
              <Box mb={5}>
                <Typography
                  variant={isNonMobile ? "h1" : "h2"}
                  textAlign={"center"}
                >
                  Contact us
                </Typography>
                <Typography
                  variant="h5"
                  textAlign={isNonMobile ? "center" : "justify"}
                >
                  You can always count on us for assistance. If you have
                  questions or concerns, please don't hesitate to reach out to
                  us. Just fill out the form below and our team will get back to
                  you shortly.
                </Typography>
              </Box>
              <Grid container spacing={2} columns={16} rowSpacing={2}>
                <Grid item xs={16} sm={16} md={16} lg={8} xl={8}>
                  <TextField
                    name="name"
                    fullWidth
                    label="Name"
                    variant="outlined"
                    required
                    value={state.name}
                    onChange={onHandleChange}
                  />
                </Grid>
                <Grid item xs={16} sm={16} md={16} lg={8} xl={8}>
                  <TextField
                    name="email"
                    fullWidth
                    label="E-mail"
                    variant="outlined"
                    required
                    value={state.email}
                    onChange={onHandleChange}
                  />
                </Grid>
                <Grid item xs={16} sm={16} md={16} lg={8} xl={8}>
                  <TextField
                    name="mobile"
                    fullWidth
                    label="Phone no."
                    variant="outlined"
                    required
                    value={state.mobile}
                    onChange={onHandleChange}
                  />
                </Grid>
                <Grid item xs={16} sm={16} md={16} lg={8} xl={8}>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label" required>
                        Subject
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="category"
                        value={state.category}
                        label="Subject"
                        onChange={(e, data) => onHandleChange(e, data)}
                      >
                        {option.map((item, i) => {
                          return (
                            <MenuItem key={i} value={item.value}>
                              {item.value}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={16}>
                  <TextField
                    name="issue"
                    fullWidth
                    label="Your Issue/Query"
                    multiline
                    rows={4}
                    required
                    value={state.issue}
                    onChange={onHandleChange}
                  />
                </Grid>

                <Grid item xs={16}>
                  <Box sx={Style.uploadWrapper}>
                    {state.img ? (
                      <Paper elevation={3}>
                        <Box m={1} position={"relative"}>
                          <IconButton
                            onClick={onHandleRemove}
                            sx={{
                              color: "#c2c2c2",
                              position: "absolute",
                              right: "0",
                            }}
                          >
                            <CancelRoundedIcon />
                          </IconButton>
                          <img
                            src={state.img}
                            alt={state.files.name}
                            loading="lazy"
                            style={{
                              width: "auto",
                              height: "15rem",
                              overflow: "hidden",
                            }}
                          />
                        </Box>
                      </Paper>
                    ) : (
                      <>
                        <Box
                          title={"Click to upload file"}
                          sx={
                            isNonMobile
                              ? Style.uploadBox
                              : { textAlign: "center", cursor: "pointer" }
                          }
                          onClick={() => {
                            document.getElementById("UploadImage").click();
                          }}
                        >
                          <Box>
                            <ScreenshotOutlinedIcon
                              sx={{
                                fontSize: "5rem",
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#fff"
                                    : "#525252",
                              }}
                            />
                          </Box>
                          <Typography
                            variant="h5"
                            sx={{
                              textTransform: "none",
                              color:
                                theme.palette.mode === "dark"
                                  ? "#fff"
                                  : "#525252",
                            }}
                          >
                            Add Screenshot
                          </Typography>
                        </Box>
                        <input
                          style={{ display: "none" }}
                          id="UploadImage"
                          type="file"
                          accept="image/jpg,image/png,image/jpeg,image/jfif"
                          onChange={onHandleUploadImage}
                        />
                      </>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={16} textAlign={"right"}>
                  <Box>
                    <Button
                      variant="contained"
                      sx={Style.submitBtn}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>
    </>
  );
};

export default ContactUs;
