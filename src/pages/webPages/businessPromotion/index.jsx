import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Skeleton,
} from "@mui/material";

import { useLocation } from "react-router-dom";
import { GET } from "../../../services";
import { CMS } from "../../../routes/apiEndPoints";
import Metatags from "../../../component/organisms/MetaTags";
import { ListPlaceholder } from "../../../utils/common";
const defaultObj = {};

const BusinessPromotion = () => {
  const [state, setState] = useState(defaultObj);
  let location = useLocation();
  const [loader, setLoader] = useState(0);

  useEffect(() => {
    const api_FetchWebMedia = async () => {
      try {
        setLoader(0);
        let { status, message, payload } = await GET(
          `${CMS.BUSINESS_PAGE}${location.pathname}`
        );
        if (status === 0) {
          console.log(message);
        }
        setLoader(status);
        setState(payload);
      } catch (error) {
        console.error(error);
      }
    };
    api_FetchWebMedia();
  }, [location.pathname]);

  return (
    <>
      <Metatags
        title={state.seo?.title}
        description={state.seo?.description}
        keywords={state.seo?.keywords}
        route={window.location.href}
      />

      <Box>
        {loader === 0 ? (
          <>
            <Box>
              <Stack>
                <Skeleton
                  sx={{ height: 250 }}
                  animation="wave"
                  variant="rectangular"
                />
              </Stack>
            </Box>
            <Container>
              <Box>
                <Stack spacing={1}>
                  <Skeleton
                    variant="rectangular"
                    width={300}
                    height={20}
                    sx={{ margin: "0 auto", marginTop: "1rem" }}
                  />
                </Stack>

                <ListPlaceholder listCount={8} />
              </Box>
            </Container>
          </>
        ) : (
          <>
            <Box>
              <img
                src={state.bannerImage?.image}
                alt={state.bannerImage?.alt}
                style={{ maxWidth: "100%" }}
              />
            </Box>
            <Container>
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography
                    variant="h1"
                    textAlign="center"
                    sx={{
                      fontWeight: "700",
                      fontSize: {
                        xs: "1.5rem",
                        md: "2rem",
                        lg: "2.5rem",
                        xl: "2.5rem",
                      },
                      margin: "1rem 0",
                    }}
                  >
                    {state.name}
                  </Typography>

                  <Typography variant="h6">
                    <div
                      dangerouslySetInnerHTML={{ __html: state.description }}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </>
        )}
      </Box>
    </>
  );
};

export default BusinessPromotion;
