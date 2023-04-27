import React, { useCallback } from "react";
import { Feed, Image, Icon, } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { makeUserProfileImgURL } from "../../../../../../../utils/common";

import ClipMenu from "./clipMenu/ClipMenu";

import "./style.css"

import verifyImage from "../../../../../../../assets/images/verify.png"

const ClipUserLabel = ({ clipData }) => {
  let router = useHistory();

  const userProfile = useCallback((item) => {
    let name = item?.user_info?.tiktokName ? item?.user_info?.tiktokName : item?.user_info?.firstName
    let id = item?.from
    try {
      router.push({
        pathname: "/user-profile/" + name,
        state: {
          id: id
        },
      });
      window.location.href = "/user-profile/" + name;
    } catch (er) { console.log(er); };
  }, []);

  return (
    <Feed className="clip-card-head">
      <Feed.Event>
        <Feed.Label className="clip-card-head-img" >
          <Image src={makeUserProfileImgURL(clipData?.user_info?.profilePic)} avatar bordered style={{ height: "45px" }} />
        </Feed.Label>

        <Feed.Content className="clip-card-head-content">
          <Feed.Summary>
            <a onClick={() => userProfile(clipData)}>
              {clipData?.user_info?.tiktokName ? clipData?.user_info?.tiktokName : clipData?.user_info?.firstName}{" "}
              {clipData?.user_info?.celebrity?.status === 1 && <Image src={verifyImage} style={{ height: "16px", marginLeft: "5px" }} />}
            </a>
          </Feed.Summary>

          <Feed.Date >
            {clipData.videoType}{" "}<Icon name={clipData.videoType === "public" ? "globe" : "lock"} fitted />
          </Feed.Date>
        </Feed.Content>

        <Feed.Extra>
          <ClipMenu clipData={clipData} />
        </Feed.Extra>
      </Feed.Event>
    </Feed>
  );
}
export default React.memo(ClipUserLabel);