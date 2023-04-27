import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Assets } from "../assets/Assets"
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Box textAlign={"center"}>
            <img src={Assets.error_boundary.img} alt={Assets.error_boundary.alt} style={{ maxWidth: "100%" }} />
            <Typography variant="h3" sx={{ fontWeight: "500" }}>
              Something Went Wrong
            </Typography>
            <Typography variant="h5">
              Please refresh the page or try later.
            </Typography>
          </Box>
        </Container >
      );
    }
    return this.props.children;
  }
}
