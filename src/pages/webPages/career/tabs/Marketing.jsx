import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Marketing = ({ name }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");

  const screen601 = useMediaQuery("(min-width: 601px)");

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };
  const handleChange = (event) => {
    setState(event.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: screen601 ? "600px" : "100%",
    // width: "600px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "100%",
    overflowY: "scroll",
  };
  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        {name}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h4"
              textAlign="center"
              sx={{ margin: { xs: "0  0 1rem 0" } }}
            >
              Select your Field
            </Typography>

            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: "1.5%", width: "47%" },
              }}
              noValidate
              autoComplete="off"
            >
              <Box>
                <TextField id="outlined-error" label="Name" name="userName" />
                <TextField
                  id="outlined-error-helper-text"
                  label="User Mail"
                  name="userEmail"
                />
              </Box>
              <Box>
                <TextField id="filled-error" label="Current Location" />
                <TextField
                  number
                  id="filled-error-helper-text"
                  label="Mobile No"
                />
              </Box>

              <Box>
                <FormControl sx={{ minWidth: "47%", margin: "1.5%" }}>
                  <InputLabel id="demo-simple-select-label">State</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label="state"
                    name="state"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: "47%", margin: "1.5%" }}>
                  <InputLabel id="demo-simple-select-label">City</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={city}
                    label="City"
                    name="city"
                    onChange={handleChangeCity}
                  >
                    <MenuItem value={10}>Delhi</MenuItem>
                    <MenuItem value={20}>Faridabad</MenuItem>
                    <MenuItem value={30}>Ghaziabad</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <TextField
                  id="outlined-error"
                  label="Total Experience "
                  name="TotalExperience"
                />
                <TextField
                  id="outlined-error-helper-text"
                  label="Zip Code"
                  name="usercode"
                />
              </Box>

              <Box>
                <TextField
                  id="outlined-error"
                  name="TotalExperience"
                  type="file"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="I don't have Resume"
                />
              </Box>

              <Box sx={{ minWidth: "94%", margin: "1.5%" }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="I have Terms and Conditions"
                />
              </Box>
              <Box sx={{ minWidth: "94%", margin: "1.5%" }}>
                <Button variant="contained">Contained</Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Marketing;
