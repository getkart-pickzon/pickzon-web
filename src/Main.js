import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import NavigationPaths from "./route/navigationPath";
import { getBrowserLocation } from "./helper/getDeviceLocation";
import Toast from "./utils/Toast";
import ScrollTopBtn from "./utils/ScrollTopBtn";
import StartPopUp from "./components/sub-component/startPop/StartPopUp";
import ScrollToTop from "./utils/ScrollToTop";
import { PageNotFound, ComingSoon } from "./utils/common";
import PrivateRoute from "./utils/privateRoute";
import PublicRoute from "./utils/publicRoute";
import Footer from "./components/footer/Footer";
import Header from "./components/Header/Header";

const Home_In = React.lazy(() => import("./components/pages/webPages/india/home/Home"));
const WhyPickzon = React.lazy(() => import("./components/pages/webPages/india/whyPickzon/WhyPickzon"));
const FAQ = React.lazy(() => import("./components/pages/webPages/india/faq/FAQ"));
const PrivacyPolicy = React.lazy(() => import("./components/pages/staticPages/pickzon/PrivacyPolicy"));
const Terms = React.lazy(() => import("./components/pages/staticPages/pickzon/Terms"));
const IntellectualPolicy = React.lazy(() => import("./components/pages/staticPages/pickzon/IntellectualPolicy"));
const Services = React.lazy(() => import("./components/pages/staticPages/exploreMore/Services"));
const BusinessPage = React.lazy(() => import("./components/pages/staticPages/exploreMore/BusinessPage"));
// const EarnMoneyPage = React.lazy(() => import("./components/pages/staticPages/exploreMore/EarnMoneyPage"));
const SearchExplore = React.lazy(() => import("./components/pages/staticPages/discover/SearchExplore"));
const SocialCreator = React.lazy(() => import("./components/pages/staticPages/discover/SocialCreator"));
const Features = React.lazy(() => import("./components/pages/webPages/india/features/Features"));
const Security = React.lazy(() => import("./components/pages/webPages/india/security/Security"))
const AboutUs = React.lazy(() => import("./components/pages/webPages/india/aboutUs/AboutUs"));
const FeedContent = React.lazy(() => import("./components/pages/webPages/india/feedContent/FeedContent"));
const Blogs = React.lazy(() => import("./components/pages/dynamicPages/blog/blogsGrid/Blogs"));
const BlogDetails = React.lazy(() => import("./components/pages/dynamicPages/blog/blogDetail/BlogsDetails"));
// const AppViewRefer = React.lazy(() => import("./components/pages/staticPages/appView/appReferEarn/AppReferAndEarn"))
const AppPrivacyPolicy = React.lazy(() => import("./components/pages/staticPages/appView/appPrivacyPolicy/AppPrivacyPolicy"))
const AppViewTerms = React.lazy(() => import("./components/pages/staticPages/appView/appTerms/AppTerms"))
const ContactUs = React.lazy(() => import("./components/pages/webPages/india/webContact/ContactUs"));

// after login
const Login = React.lazy(() => import("./components/pages/dynamicPages/auth/Login"));
const PageFeed = React.lazy(() => import("./components/pages/dynamicPages/WallPostFeed/WallPostFeed"));
const UserProfilePage = React.lazy(() => import("./components/pages/dynamicPages/userInfo/userProfilePage/UserProfilePage"));
const SavePageFeed = React.lazy(() => import("./components/pages/dynamicPages/WallPostFeed/SavedFeedPostPage"));
const SharingMedia = React.lazy(() => import("./components/pages/public/sharingMedia/SharingMedia"));
/* -------------  PUBLIC  ------------ */
const OpenShortAppUrl = React.lazy(() => import("./components/pages/public/openShortAppUrl"));

const Main = () => {
  //for show modal only in mobile device
  const [call, setCall] = useState(false);
  useEffect(() => {
    async function callEffect() {
      let device = await getBrowserLocation();
      if (device.OS === 'Android' || device.OS === 'iPhone' || device.OS === 'iPad') {
        setCall(true)
      } else {
        setCall(false)
      }
    }; callEffect();
  }, [])

  return (
    <Router>
      <Suspense fallback={
        <Dimmer active>
          <Loader size="huge">Loading...</Loader>
        </Dimmer>
      }>
        {/* <Header /> */}
        <ScrollToTop />
        <StartPopUp call={call} parent={setCall} />
        <Toast />
        <Switch>
          {/* --- */}
          {/* <Route exact path={NavigationPaths.OPENSHORTAPPURL} component={OpenShortAppUrl} />
          <Route exact path={NavigationPaths.WHYPICKZONE} component={WhyPickzon} />
          <Route exact path={NavigationPaths.SERVICES} component={Services} />
          <Route exact path={NavigationPaths.PRIVACYPOLICY} component={PrivacyPolicy} />
          <Route exact path={NavigationPaths.TERM} component={Terms} />
          <Route exact path={NavigationPaths.SEARCHEXPLORE} component={SearchExplore} />
          <Route exact path={NavigationPaths.SOCIALCREATOR} component={SocialCreator} />
          <Route exact path={NavigationPaths.BUSINESSPAGE} component={BusinessPage} /> */}
          {/* --- */}
          {/* <Route exact path={NavigationPaths.EARNMONEYPAGE} component={EarnMoneyPage} /> */}
          {/* --- */}
          {/* <Route exact path={NavigationPaths.IPROPERTYPOLICY} component={IntellectualPolicy} /> */}
          {/* --- */}
          <Route exact path={NavigationPaths.HOME} component={Home_In} />
          {/* --- */}
          {/* <Route exact path={NavigationPaths.SECURITY} component={Security} />
          <Route exact path={NavigationPaths.FEATURE} component={Features} />
          <Route exact path={NavigationPaths.ABOUTUS} component={AboutUs} />
          <Route exact path={NavigationPaths.FEEDCONTENT} component={FeedContent} />
          <Route exact path={NavigationPaths.FAQ} component={FAQ} />
          <Route exact path={NavigationPaths.BLOGS} component={Blogs} />
          <Route exact path={NavigationPaths.BLOG} component={BlogDetails} />
          <Route exact path={NavigationPaths.CONTACT} component={ContactUs} /> */}
          {/* --- */}
          {/* ----------------- Dynamic Pages Start -----------------*/}
          {/* <Route exact path={NavigationPaths.APP_REFER} component={AppViewRefer} /> */}
          {/* --- */}
          {/* <Route exact path={NavigationPaths.APP_PRIVACYPOLICY} component={AppPrivacyPolicy} />
          <Route exact path={NavigationPaths.APP_TERM} component={AppViewTerms} />
          <PrivateRoute exact path={NavigationPaths.PAGEFEED} component={PageFeed} /> */}
          <PrivateRoute exact path={NavigationPaths.USERPROFILEPAGE} component={UserProfilePage} />
          {/* <PrivateRoute exact path={NavigationPaths.PAGESAVEFEED} component={SavePageFeed} />
          <PublicRoute exact path={NavigationPaths.LOGIN} component={Login} /> */}
          {/* --- */}
          <Route exact path={NavigationPaths.SHARINGMEDIA} component={SharingMedia} />
          {/* <Route exact path={NavigationPaths.COMINGSOON} component={ComingSoon} /> */}
          <Route component={PageNotFound} />
        </Switch >
        {/* <Footer /> */}
        <ScrollTopBtn iconName="arrow up" className="scroll-to-top" scrollLength="500" />
      </Suspense >
    </Router >
  );
};

export default React.memo(Main);
