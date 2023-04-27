import { Card, CardHeader, Skeleton } from '@mui/material';
import Cookies from 'js-cookie'
import React from 'react';
import { getBrowserLocation } from "../helper/getDeviceLocation/index";

export const setToken = (name, value, option) => {
  return Cookies.set(name, JSON.stringify(value), option) || null;
  // return JSON.parse(sessionStorage.getItem("authToken")) || null;
  // return JSON.parse(localStorage.getItem("LoggedUser")) || null;
};

export const getToken = (name) => {
  return Cookies.get(name) || null;
  // return JSON.parse(sessionStorage.getItem("authToken")) || null;
  // return JSON.parse(localStorage.getItem("LoggedUser")) || null;
};

export const removeUserSession = (name) => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  window.location.href = "/";
  return Cookies.remove(name) || null;
};

//to export html format
export const htmlData = (item) => {
  let data = item.replace(/\n/g, "<br/>")
  return <div dangerouslySetInnerHTML={{ __html: data }} />
}

//to export List palceholder
export const ListPlaceholder = ({ listCount }) => {
  return (
    <>
      {Array(listCount).fill(
        <>
          <Skeleton animation="wave" height={20} style={{ marginBottom: 8 }} />
          <Skeleton animation="wave" height={20} width="80%" />
        </>
      ).map((item) => {
        return item
      })}
    </>
  )
}

export const CardPlaceholder = ({ listCount }) => {
  return (<>
    {Array(listCount).fill(<Card sx={{ width: "100%", mb: 1, boxShadow: "none", borderRadius: 3 }}>
      <CardHeader
        avatar={<Skeleton animation="wave" variant="circular" width={60} height={60} />}
        title={<Skeleton animation="wave" height={20} width="20%" style={{ marginBottom: 6 }} />}
        subheader={<Skeleton animation="wave" height={20} width="15%" />}
      />
      <Skeleton sx={{ height: "600px", m: 2, borderRadius: 3 }} animation="wave" variant="rectangular" />
      {/* <CardContent sx={{ pt: "0", pb: "0" }}>
        <Skeleton animation="wave" height={50} />
      </CardContent> */}
    </Card>).map((item, i) => {
      return (<React.Fragment key={i}>
        {item}
      </React.Fragment>)
    })}
  </>)
}

export const openAppUrl = async () => {
  let obj = { ...await getBrowserLocation() }
  let _link = "https://play.google.com/store/apps/details?id=com.chat.pickzon"
  if (obj.OS === ('iPhone' || 'iPad')) {
    _link = "https://apps.apple.com/in/app/pickzon/id1560097730"
  }
  return window.location.href = _link;
};

//to install app regarding device OS
export const installAppBtn = async () => {
  let obj = { ...await getBrowserLocation() }
  let _link = "https://play.google.com/store/apps/details?id=com.chat.pickzon"
  if (obj.OS === ('iPhone' || 'iPad')) {
    _link = "https://apps.apple.com/in/app/pickzon/id1560097730"
  }
  window.open(`${_link}`, '_blank');
}

// export const getUser = () => {
//   const userStr = JSON.parse(sessionStorage.getItem("LoggedUser"));
//   if (userStr) return userStr;
//   else return null;
// };

// export const setUserSession = (token, user) => {
//   sessionStorage.setItem("authToken", JSON.stringify(token));
//   sessionStorage.setItem("LoggedUser", JSON.stringify(user));
// };

//to export default profile image
// export const makeUserProfileImgURL = (image) => {
//   try {
//     let userProfileComImg = "";
//     if (image.search("https") >= 0) {
//       userProfileComImg = image;
//     } else {
//       userProfileComImg = image;
//       userProfileComImg = userProfileComImg.split("./")[1];
//       userProfileComImg = CONFIG.imageURL + userProfileComImg;
//     }
//     return userProfileComImg;
//   } catch (er) {
//     return pickzonIcon;
//   }
// };