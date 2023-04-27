import React, { memo, useCallback, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Menu, Dropdown, Image, Segment, Feed, Button } from "semantic-ui-react";
import { getUser, makeUserProfileImgURL, removeUserSession, trimUserName } from "../../../utils/common";
import NavigationPaths from "../../../route/navigationPath";
import Globalsearch from "../../sub-component/globalSearch/GlobalSearch";
import Notification from "../../sub-component/notification/Notification";
import Assets from "../../../assets/Assets";
import WebLogo from "../../sub-component/webLogo/WebLogo";
import "./style.css";

const navigationLinks = [
  // { value: NavigationPaths.HOME, text: "Home" },
  { value: NavigationPaths.ABOUTUS, text: "About Us" },
  { value: NavigationPaths.FEATURE, text: "Features" },
  { value: NavigationPaths.WHYPICKZONE, text: "Why Pickzon ?" },
  { value: NavigationPaths.FAQ, text: "FAQ" },
  { value: NavigationPaths.BLOGS, text: "Blogs" },
  { value: NavigationPaths.LOGIN, text: "Web Login" },
];
const loggedNavigationLinks = [
  { value: NavigationPaths.PAGEFEED, text: "Feed", icon: "users" },
  // { value: NavigationPaths.CLIP, text: "Clip", icon: "play circle outline" },
  // { value: NavigationPaths.MALL, text: "Mall", icon: "shopping bag" },
];
const dropdownOptions = [
  // { text: "Dasboard", icon: "th large", value: "/dashboard/analytics" },
  // { text: "Help", icon: "help", value: "/dashboard/help" },
  { text: "Notification", icon: "bell", value: true },
  { text: "Feed", icon: "users", value: "/feed" },
  { text: "Profile", icon: "user", value: "/dashboard" },
  { text: "Logout", icon: "sign out", value: "/dashboard" },
];

const Navbar = () => {
  let router = useHistory();
  const loggedUser = getUser();
  const loggedUserName = loggedUser?.Tiktokname ?? loggedUser?.Name;
  const [activeItem, setActiveItem] = useState({ current: "" });
  const [call, setCall] = useState(false);
  const handleActive = (e, item) => {
    router.push(item.to);
    setActiveItem({ current: item.name });
  };

  const trigger = (
    <Feed className="login-label" title={`${loggedUser?.Name}\n@${loggedUser?.Tiktokname}`}>
      <Feed.Event>
        <Feed.Label>
          <Image
            bordered
            avatar
            circular
            style={{ width: "30px", height: "30px", objectFit: "cover" }}
            src={makeUserProfileImgURL(loggedUser?.ProfilePic) ?? Assets.defaultPlaceholders.userProfile.img}
            alt={loggedUser?.Tiktokname ?? Assets.defaultPlaceholders.userProfile.alt}
          />
        </Feed.Label>
        <Feed.Content style={{ marginLeft: "3px" }}>
          {trimUserName(loggedUserName, 12)}
        </Feed.Content>
      </Feed.Event>
    </Feed>
  );

  const hisPush = (item) => {
    if (item.text === "Logout") {
      router.push(item.value);
      return removeUserSession();
    } else if (item.text === "Profile") {
      return userProfile(loggedUser);
    } else if (item.text === "Notification") {
      setCall(true)
    } else {
      router.push(item.value);
    }
  };

  const userProfile = (item) => {
    let name = item.name || item.Name;
    let tik = item.Tiktokname || item.tiktokName;
    try {
      let user = tik ? tik : name;
      let id = item.userId ? item.userId : item._id;
      router.push({
        pathname: "/user-profile/" + user,
        state: { id: id },
      });
      return window.location.reload();
    } catch (er) {
      console.log(er);
    }
  };

  const handleSet = useCallback((val) => {
    setCall(val);
  }, [call])

  return (
    <>
      <Segment inverted className="navbar-wrapper custom-bg">
        <Menu inverted secondary icon="labeled" className="nav-links-label">
          <Menu.Item
            fitted
            position="left"
            className="mobile"
            onClick={() => loggedUser ? window.scrollTo({ top: 0, behavior: 'smooth' }) : window.location.href = NavigationPaths.HOME}>
            <WebLogo />
          </Menu.Item>

          <Menu.Menu className={loggedUser ? "nav-links-wrapper-logged" : "nav-links-wrapper"}>
            {loggedUser ? (
              <>
                <Menu.Item fitted as="h5">
                  <Globalsearch />
                </Menu.Item>
                <Menu.Item fitted style={{ display: "none" }}>
                  <Notification call={call} parent={handleSet} />
                </Menu.Item>
                <Menu.Item className="logged-btn-wrapper">
                  <Button compact circular basic className="logged-btn-circular">
                    <Dropdown className="Logged-btn" trigger={trigger} icon="chevron down" direction="left">
                      <Dropdown.Menu className="login-btn-dropdown">
                        {/* <Dropdown.Header
                          onClick={() => userProfile(loggedUser)}
                          style={{ cursor: "pointer" }}
                        >
                          <Image
                            src={makeUserProfileImgURL(loggedUser.ProfilePic)}
                            avatar
                          />{" "}
                          {trimUserName(loggedUserName, 15)}
                        </Dropdown.Header> */}
                        <Dropdown.Menu
                          scrolling
                        >
                          {dropdownOptions.map((option) => {
                            return (
                              <Dropdown.Item
                                key={option.text}
                                {...option}
                                onClick={() => hisPush(option)}
                              />
                            )
                          })}
                        </Dropdown.Menu>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Button>
                </Menu.Item>
              </>
            ) : (
              <>
                {navigationLinks.map((item) => {
                  return (
                    <Menu.Item
                      className="static-links"
                      key={item.value}
                      as={Link}
                      to={item.value}
                      name={item.text}
                      active={activeItem.current === item.text}
                      onClick={handleActive}
                    />
                  );
                })}
                <Dropdown icon="bars" direction="left" className="bars">
                  <Dropdown.Menu className="blocks-nav-links">
                    <Dropdown.Menu scrolling className="block-nav-links-scroll">
                      {navigationLinks.map((option) => (
                        <Dropdown.Item
                          key={option.value}
                          {...option}
                          onClick={() => hisPush(option)}
                        />
                      ))}
                    </Dropdown.Menu>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </Menu.Menu>
        </Menu>
      </Segment>
    </>
  );
};

export default React.memo(Navbar);
