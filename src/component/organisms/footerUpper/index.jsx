import React from "react";
import {
  Grid,
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import footerLinks from "../../../routes/footerLinks";
import { Assets } from "../../../assets/Assets";

const Footer = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery(theme.breakpoints.up("sm"));
  // const tabletScreen = useMediaQuery("(max-width:1366px)");

  return (
    <Container maxWidth="false" sx={styles.footer}>
      <Grid container pt={4} pb={4} p={{ sx: 1, sm: 4, md: 4, lg: 4, xl: 4 }}>
        <Grid item xl={10} md={12} xs={12} sm={12} lg={10}>
          <Grid container spacing={2}>
            {footerLinks.upperFooter.summary.map((item, i) => (
              <Grid item xs={12} xl={3} lg={4} md={4.5} sm={12} key={i}>
                <Typography
                  variant="h5"
                  color="#fff"
                  sx={{ fontWeight: "700" }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="#fff"
                  textAlign="justify"
                  mt={1}
                  width={{
                    sx: "80%",
                    sm: "80%",
                    md: "90%",
                    lg: "90%",
                    xl: "80%",
                  }}
                >
                  {item.description}
                </Typography>
                <List>
                  <ListItem disablePadding>
                    <ListItemIcon
                      sx={{ color: "#fff", mr: -3, fontSize: "1.5rem" }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        variant="h6"
                        component={"a"}
                        href={item.to}
                        color="#fff"
                      >
                        {item.label}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                </List>
              </Grid>
            ))}
            {footerLinks.upperFooter.links.map((item, i) => (
              <Grid item xs={4} xl={2} lg={2} md={2.5} sm={4} key={i}>
                <Typography
                  variant={isNonMobile ? "h5" : "h6"}
                  color="#fff"
                  sx={{ fontWeight: "700" }}
                >
                  {item.title}
                </Typography>
                <List>
                  {item.description.map((el) => (
                    <ListItem disablePadding key={el.text}>
                      <ListItemText>
                        <Typography
                          component={"a"}
                          href={el.route}
                          target="_blank"
                          rel="noreferrer noopener"
                          variant="body1"
                          color="#fff"
                          sx={styles.linkText}
                        >
                          {el.text}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          xl={2}
          md={12}
          xs={12}
          sm={12}
          lg={2}
          display={"flex"}
          justifyContent={{
            xs: "center",
            sm: "center",
            md: "center",
            lg: "flex-end",
            xl: "flex-end",
          }}
          alignItems={"center"}
        >
          <img
            src={Assets.trade_mark_logo.img}
            alt={Assets.trade_mark_logo.alt}
            style={{ maxWidth: "10rem" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;

const styles = {
  footer: {
    borderRadius: "3.125rem 3.125rem 0 0",
    background: "linear-gradient(-45deg,#379cc1,#8b42bb, #48acb9, #af5ca4)  ",
    animation: "gradient 15s ease infinite",
    backgroundSize: "400% 400%",
    "@keyframes gradient": {
      "0%": { backgroundPosition: "0% 50%" },
      "50%": { backgroundPosition: "100% 50%" },
      "100%": { backgroundPosition: "0% 50%" },
    },
  },
  linkText: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
};
