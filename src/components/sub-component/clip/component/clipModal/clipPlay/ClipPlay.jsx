import React, { useState } from "react";
import { Card, Image } from "semantic-ui-react";

import "./style.css"

let _isVideoId = ""

const ClipPlay = ({ clipData }) => {
  const [isVideoId, setIsVideoId] = useState("");

  const playVideoBtn = (type, item) => {
    if (type === 1) { setIsVideoId(""); _isVideoId = ""; return }
    setIsVideoId(item._id);
    _isVideoId = item._id
    return
  };

  return (
    <Card className={"clip-container " + clipData._id} id={clipData._id} centered >
      {clipData._id === isVideoId ?
        <video
          autoPlay={clipData._id === isVideoId ? true : false}
          onClick={() => playVideoBtn(1, clipData)}
          src={clipData.mediaUrl} style={{ width: "auto", height: "100%" }} />
        :
        <Image src={clipData.thumUrl}
          onClick={() => playVideoBtn(0, clipData)}
          style={{ height: "100%" }}
        />
      }
      <>
        {/* <Menu secondary vertical icon="labeled" inverted compact className="clip-btn" >
                <Menu.Item>
                <Icon name="eye" />{data.item.totalView}
                </Menu.Item>
                <Menu.Item>
                {data.item.videoLike === 1 ?
                  <Icon name="like" style={{ cursor: 'pointer' }} color="red"
                  // onClick={() => likeClipBtn(item, index, 0)} 
                    />
                    : <Icon name="like" style={{ cursor: 'pointer' }}
                    //  onClick={() => likeClipBtn(item, index, 1)} 
                    />
                  }
                  {data.item.totalLike}
                </Menu.Item>
                <Menu.Item>
                  <Icon name="comment alternate" />{data.item.totalComment}
                </Menu.Item>
                <Menu.Item >
                <Dropdown
                    icon="ellipsis vertical"
                    pointing="bottom right"
                    direction="left"
                    >
                    <Dropdown.Menu as="p">
                    {(feedActionDropOptions || []).map((option) => {
                      return (
                        <Dropdown.Item
                        key={option.value}
                        {...option}
                        // onClick={() => clipActionBtn(item._id, option)}
                        />
                        )
                      })}
                      </Dropdown.Menu>
                      </Dropdown>
                      </Menu.Item>
                      </Menu>
                      <Feed className="clip-caption-wrapper">
                      <Feed.Event>
                      <Feed.Content>
                      <Feed.Summary>
                      <Feed.User className="clip-caption">
                      @{data.item.user_info.tiktokName}
                      </Feed.User>
                      </Feed.Summary>
                      </Feed.Content>
                      </Feed.Event>
                      <Feed.Date className="clip-caption">
                      <p>
                      {data.item.description}
                      </p>
                      {data.item.section}
                      </Feed.Date>
                    </Feed> */}
      </>
    </Card>
  );
}

export default React.memo(ClipPlay);