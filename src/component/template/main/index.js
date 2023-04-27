import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Backdrop, CircularProgress, Container, Typography, useMediaQuery } from "@mui/material";
import NavigationPaths from "../../../routes/navigationPath";
import { useTheme } from "@emotion/react";
import PrivateRoute from "../../../routes/privateRoute";

// WEBPAGES
const Home = React.lazy(() => import("../../../pages/webPages/home/index"));
const ContactUs = React.lazy(() => import("../../../pages/webPages/contactUs/index"))
const About = React.lazy(() => import("../../../pages/webPages/about/index"));
const Features = React.lazy(() => import("../../../pages/webPages/features/index"));
const WhyPickzon = React.lazy(() => import("../../../pages/webPages/whyPickzon/index"));
const FeedContent = React.lazy(() => import("../../../pages/webPages/feedContent/index"));
const Security = React.lazy(() => import("../../../pages/webPages/security/index"));
const Career = React.lazy(() => import("../../../pages/webPages/career/index"));
const Faq = React.lazy(() => import("../../../pages/webPages/faq/index"));
const PrivacyPolicy = React.lazy(() => import("../../../pages/webPages/privacyPolicy/index"));
const Terms = React.lazy(() => import("../../../pages/webPages/terms/index"));
const IntellectualPolicy = React.lazy(() => import("../../../pages/webPages/intellectual/index"));
const BusinessPromotion = React.lazy(() => import("../../../pages/webPages/businessPromotion/index"));
const SearchExplore = React.lazy(() => import("../../../pages/webPages/searchExplore/index"));
const SocialCreator = React.lazy(() => import("../../../pages/webPages/socialCreator/index"));
const OpenShortAppUrl = React.lazy(() => import("../../../pages/webPages/openShortAppUrl/index"));

const Login = React.lazy(() => import("../../../pages/webPages/login/index"));

// APPPAGES
const AppTerms = React.lazy(() => import("../../../pages/webPages/terms/index"));
const AppPrivacyPolicy = React.lazy(() => import("../../../pages/webPages/privacyPolicy/index"));

// DYNAMICPAGES
const WallPost = React.lazy(() => import("../../../pages/dynamicPages/wallpostModule/index"));
const Feed = React.lazy(() => import("../../../pages/dynamicPages/feedModule/index"));
const Page = React.lazy(() => import("../../../pages/dynamicPages/pageModule/index"));
const Search = React.lazy(() => import("../../../pages/dynamicPages/searchModule/index"));
const SavedPost = React.lazy(() => import("../../../pages/dynamicPages/savedPostModule/index"));

// PNFPAGE
const PageNotFound = React.lazy(() => import("../../../pages/webPages/pageNotFound/index"));

const Main = () => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const inNonTablet = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <Container
      component="main"
      disableGutters
      maxWidth="false"
      sx={{ minHeight: "100vh" }}
    >
      <Suspense
        fallback={
          <Backdrop
            open={open}
            sx={{ color: "##000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            onClick={() => setOpen(false)}
          >
            <CircularProgress />
            <Typography variant="h3">
              Loading...
            </Typography>
          </Backdrop>
        }
      >
        <Routes>
          {/* WEBPAGES */}
          <Route path={NavigationPaths.HOME} element={<Home />} />
          <Route path={NavigationPaths.ABOUTUS} element={<About />} />
          <Route path={NavigationPaths.CONTACT} element={<ContactUs />} />
          <Route path={NavigationPaths.FEATURE} element={<Features />} />
          <Route path={NavigationPaths.WHYPICKZONE} element={<WhyPickzon />} />
          <Route path={NavigationPaths.FEEDCONTENT} element={<FeedContent />} />
          <Route path={NavigationPaths.SECURITY} element={<Security />} />
          <Route path={NavigationPaths.CAREER} element={<Career />} />
          <Route path={NavigationPaths.FAQ} element={<Faq />} />
          <Route path={NavigationPaths.PRIVACYPOLICY} element={<PrivacyPolicy />} />
          <Route path={NavigationPaths.TERM} element={<Terms />} />
          <Route path={NavigationPaths.IPROPERTYPOLICY} element={<IntellectualPolicy />} />
          <Route path={NavigationPaths.BUSINESSPAGE} element={<BusinessPromotion />} />
          <Route path={NavigationPaths.SEARCHEXPLORE} element={<SearchExplore />} />
          <Route path={NavigationPaths.SOCIALCREATOR} element={<SocialCreator />} />
          <Route path={NavigationPaths.OPENSHORTAPPURL} element={<OpenShortAppUrl />} />
          {inNonTablet && <Route path={NavigationPaths.LOGIN} element={<Login />} />}

          {/* APPPAGES */}
          <Route path={NavigationPaths.APP_PRIVACYPOLICY} element={<AppPrivacyPolicy />} />
          <Route path={NavigationPaths.APP_TERM} element={<AppTerms />} />

          {/* DYNAMICPAGES */}
          {inNonTablet &&
            <Route element={<PrivateRoute><WallPost /></PrivateRoute>}>
              <Route index path={NavigationPaths.FEED} element={<Feed />} />
              <Route path={NavigationPaths.PAGE} element={<Page />} />
              <Route path={NavigationPaths.SEARCH} element={<Search />} />
              <Route path={NavigationPaths.SAVEFEED} element={<SavedPost />} />
            </Route>}

          {/* PAGENOTFOUNDPAGE */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Container >
  );
};

export default Main;
