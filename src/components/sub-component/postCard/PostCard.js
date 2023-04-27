import React, { useEffect, useState } from "react";
import "./style.css";
import { Image, Feed, Icon, Button, Card, Header, Dropdown, Segment, Item, List, FeedUser } from "semantic-ui-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player';

import Assets from "../../../assets/Assets";
import { htmlData, openAppUrl, trimUserName } from "../../../utils/common";

const dropdownOptions = [
  { key: "1", text: "Share", icon: "share alternate" },
  { key: "3", text: "Report", icon: "warning sign" },
  { key: "2", text: "Block", icon: "dont" },
];

const PostCard = ({
  activitiesData = {},
  feelingData = {},
  tagList = [],
  type,
  avatar,
  item,
  profileName,
  postLocation,
  postTime,
  postDescription,
  hashTags = [],
  followLabel,
  mediaUrls = [],
  likeCount,
  commentCount,
  shareCount,
  metaHeading,
  metaDescription,
  metaButton,
  extraButton,
}) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      <Card color="blue" fluid centered >
        <Card.Content className="post-feed-header" style={{ overflow: "inherit" }} >
          <Feed style={{ marginBottom: "0" }}>
            <Feed.Event>
              <Feed.Label >
                <Image avatar src={avatar ? avatar : Assets.defaultPlaceholders.userProfile.img} alt={profileName ? profileName : Assets.defaultPlaceholders.userProfile.alt} />
              </Feed.Label>
              <Feed.Content className="head-label">
                <Feed.Summary>
                  <FeedUser onClick={() => openAppUrl()} title={profileName ? profileName : "Unknown"}>
                    {trimUserName(profileName ? profileName : "Unknown", 10)}
                  </FeedUser>
                </Feed.Summary>
                <Feed.Meta title={postLocation ? `${postTime},${postLocation}` : postTime}>
                  {postTime ? <Feed.Date content={postTime} /> : ""}
                  {postLocation ?
                    <Feed.Like style={{ margin: "0" }}>
                      <Icon name="map marker alternate" />{postLocation}
                    </Feed.Like>
                    : ""}
                </Feed.Meta>
              </Feed.Content>
              <Feed.Extra>
                <Button color="blue" circular compact onClick={() => openAppUrl()} style={{ padding: "0.4rem 1rem" }}>
                  {/* <Icon name={followLabel === "Follow" ? "add user" : "user delete"} /> {followLabel ?? "Follow"} */}
                  Follow
                </Button>&nbsp;
                <Icon link name={"bookmark outline"} color="blue" size="large" fitted onClick={() => openAppUrl()}
                />&nbsp;
                <Dropdown icon="ellipsis vertical" direction="left" className="dropdown-dots" as="h4" pointing="top left">
                  <Dropdown.Menu>
                    {(dropdownOptions || []).map((option) => (
                      <Dropdown.Item
                        onClick={() => openAppUrl()}
                        key={option.value}
                        {...option}
                      />
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Feed.Extra>
            </Feed.Event>
          </Feed>
          <List style={{ margin: "0" }}>
            <List.Description>
              {postDescription?.length > 250 ? (
                <>
                  {readMore === true ? htmlData(postDescription) : (
                    <>{htmlData(postDescription?.slice(0, 250))}</>
                  )}
                  <Feed.Extra as="a" onClick={() => { setReadMore(!readMore) }}>
                    {readMore === true ? <>Read less</> : <>Read more...</>}
                  </Feed.Extra>
                </>
              ) : (
                postDescription
              )}
            </List.Description>
          </List>
          {hashTags.length > 0 ?
            hashTags.map(item => {
              return (<FeedUser onClick={() => openAppUrl()}>
                {item}{" "}
              </FeedUser>
              )
            }) : ""
          }
          {activitiesData &&
            <>
              {activitiesData?.image} {activitiesData?.name}
              < br />
            </>
          }
          {feelingData &&
            <>
              {feelingData?.image} {feelingData?.name}
              < br />
            </>
          }
          {tagList.length > 0 ?
            (tagList || []).map(item => {
              return (
                <Feed.User onClick={() => openAppUrl()}>
                  @{item}{" "}
                </Feed.User>)
            }) : ""}
        </Card.Content>
        <div>
          {mediaUrls.length ?
            <Carousel
              infiniteLoop
              useKeyboardArrows
              autoPlay={false}
              showThumbs={false}
              showIndicators={false}
              showStatus={mediaUrls.length > 1 ? true : false}
            >
              {(mediaUrls || []).map((item, index) => {
                let src = item.src ? item.src : item
                let isVideo = false;
                if (src) {
                  let mp4 = src.search(".mp4");
                  let mov = src.search(".mov");
                  let avi = src.search(".avi");
                  if (mp4 > 0 || mov > 0 || avi > 0) {
                    isVideo = true
                  }
                }
                return <>
                  {isVideo === false ?
                    <div className="content-slider">
                      <Image src={src} centered className="content-container" />
                    </div>
                    :
                    <div className="video-player">
                      <ReactPlayer
                        playing={true}
                        url={src}
                        controls={true}
                        loop={true}
                        light={true}
                      />
                    </div>
                  }
                </>
              })}
            </Carousel>
            :
            <>
              {
                postDescription ? " " :
                  <Image src={Assets.defaultPlaceholders.waterMarkSq.img} centered size="large" />
              }
            </>}
        </div>
        {metaHeading && <Segment tertiary clearing className="post-ad-label">
          <Item >
            <Item.Content verticalAlign="middle">
              <Item.Description>
                <Item.Header as="h2">
                  {metaHeading ? metaHeading : "Sponsored"}
                </Item.Header>
                <Item.Meta>
                  {metaDescription ? metaDescription : "Button Label"}
                </Item.Meta>
              </Item.Description>
            </Item.Content>
            <Item.Extra>
              <Button floated="right" positive basic type="button">
                {metaButton ? metaButton : "Sponsored"}
              </Button>
            </Item.Extra>
          </Item>
        </Segment>}
        <Card.Content className="post-feed-footer" >
          <div className="post-feed-footer-icon">
            <Header as="a">
              <Icon.Group size="medium" >
                <Icon name="like outline" onClick={() => openAppUrl()} />
              </Icon.Group>
              {likeCount ?? "0"} Like
            </Header>
            <Header as="a">
              <Icon.Group size="medium" >
                <Icon name="comment outline" onClick={() => openAppUrl()} />
              </Icon.Group>
              {commentCount ?? "0"} Comment
            </Header>
            <Header as="a">
              <Icon.Group size="medium" >
                <Icon name="share square outline" onClick={() => openAppUrl()} />
              </Icon.Group>
              {shareCount ?? "0"} Share
            </Header>
          </div>
          {
            extraButton ? (
              <div className="post-feed-footer-btn">
                <Button animated="vertical" positive type="button">
                  <Button.Content visible>Boost</Button.Content>
                  <Button.Content hidden>
                    <Icon name='rocket' />
                  </Button.Content>
                </Button>
              </div>
            ) : null
          }
        </Card.Content>
      </Card >
    </>
  );
};
export default PostCard;
