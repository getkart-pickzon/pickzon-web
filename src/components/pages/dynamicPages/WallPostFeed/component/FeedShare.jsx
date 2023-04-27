import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segment, Header, Icon, Button, Modal, Form, List, Image, Grid, Dropdown, TextArea, Divider, Tab, Feed, } from "semantic-ui-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactPlayer from "react-player";
import { getUser, makeUserProfileImgURL } from "../../../../../utils/common";
import { POST } from "../../../../../Services";
import { notifyToast } from "../../../../../utils/Toast";
import Activities from "../createFeedPost/Activities"
import Feelings from "../createFeedPost/Feelings"
import TagPeople from "../../../../sub-component/uploadMediaPostIcons/component/Post/TagPeople";

import "./style.css"

const privacyOptions = [
  {
    key: "public",
    text: "Public",
    value: 1,
    icon: "globe",
  }, {
    key: "private",
    text: "Private",
    value: 2,
    icon: "lock",
  }, {
    key: "friend",
    text: "Friends",
    value: 3,
    icon: "users",
  }
];

const panes = [
  {
    menuItem: 'Feelings',
    render: () => <Tab.Pane attached={false}><Feelings /></Tab.Pane>,
  },
  {
    menuItem: 'Activities',
    render: () => <Tab.Pane attached={false}><Activities /></Tab.Pane>,
  },
];

let defaultObj = {
  userId: "618a6353fa5b8eb148d8b986",
  wallPostId: "624c392ad48dca081c6fd3eb",
  postType: 1,
  feeling: "",
  activities: "",
  payload: "",
  tagId: [],
}

const FeedShare = ({ shareCount, item }) => {
  const [sharePostModal, setSharePostModal] = useState(false);
  const [state, setState] = useState(defaultObj);
  const loggedUser = getUser();

  const [readMore, setReadMore] = useState(false);

  let dispatch = useDispatch();
  const createFeedPost = useSelector((state) => state.createFeedPostReducers);

  const [feelingActivitiesOpen, setFeelingActivitiesOpen] = useState(false);
  const [privacy, setPrivacy] = useState({ value: 1, text: "Public", icon: "globe" });

  useEffect(() => {
    try {
      function callEffect() {

      }; callEffect();
    } catch (er) { console.log(er); };
  }, []);

  const changeHandler = (e) => {
    let val = e.target.value;
    setState((pre) => ({ ...pre, payload: val }));
    disablePostB(val);
  };

  const disablePostB = (val) => {
    if (!val && state.postWallImages.length === 0) {
      return setState((pre) => ({ ...pre, disablePostBtn: true }));
    } else {
      setState((pre) => ({ ...pre, disablePostBtn: false }));
    };
  };


  const shareWallFeedBtn = async () => {
    try {
      state.tag = createFeedPost.taggedPeoples;
      if (createFeedPost.expression?.type === "feeling") {
        state.feeling = createFeedPost.expression?._id;
      } else {
        state.activities = createFeedPost.expression?._id;
      };
      state.postType = privacy.value;
      state.userId = loggedUser._id;
      state.wallPostId = item.id;

      const { status, message } = POST("/feed/share-feed", state);
      if (status === 0) { notifyToast(message, 'error', 'bottom'); };
      setSharePostModal(false);
      dispatch({ type: "wallPostCallback", payload: 1 });
    } catch (er) { console.log(er); };
  };


  const selectPrivacy = (e, data) => {
    try {
      let value = data.value, icon = "globe", text = "Public";
      if (value === 2) {
        value = value;
        text = "Private";
        icon = "lock";
      } else if (value === 3) {
        value = value;
        text = "Friends";
        icon = "users";
      };
      setPrivacy({ value: value, text: text, icon: icon });
    } catch (er) { console.log(er); };
  };
  // console.log("Share-main-item", item)
  return (
    <>
      <Modal
        closeIcon
        onOpen={() => setSharePostModal(true)}
        onClose={() => setSharePostModal(false)}
        open={sharePostModal}
        size="tiny"
        trigger={
          <Header as="a">
            <Feed.Like>
              <Icon name='share' fitted /> {shareCount} Share
            </Feed.Like>
          </Header>
        }
      >
        <Modal.Header>
          Share Post
          <Dropdown
            labeled compact basic button
            style={{ float: "right" }}
            direction="left"
            className="icon"
            icon={privacy.icon}
            options={privacyOptions}
            text={privacy.text}
            value={privacy.value}
            onChange={(e, data) => selectPrivacy(e, data)}
            defaultValue={privacy.value}
          />
        </Modal.Header>
        <Modal.Content>
          <Segment style={{ padding: "0px" }} basic>
            {(createFeedPost.taggedPeoples || []).map((tItem) => {
              // { console.log("shareTag", tItem) }
              return <a>@{tItem} </a>
            })}
            {createFeedPost.expression?.image}{createFeedPost.expression?.name}
          </Segment>
          <Form>
            <TextArea
              placeholder={`What's on your mind ${loggedUser.Name} ?`}
              onChange={changeHandler}
              rows={3}
              className="create-post-caption"
              style={{ backgroundColor: " #f3f4f5", border: "none" }}
            />
          </Form>
          <Segment secondary raised >
            <List>
              <List.Item>
                <Image avatar src={makeUserProfileImgURL(item?.user_info?.profile_pic)} />
                <List.Content>
                  <List.Header as='a'>
                    {item.user_info.first_name}
                  </List.Header>
                  <h6>{item.feedTime}</h6>
                </List.Content>
              </List.Item>
              {(item.tag || []).map((shareTag, index) => {
                return <a key={index}>@{shareTag}, </a>
              })}

              <List.Description>
                {item.payload?.length > 250 ? (
                  <>
                    {readMore === true ? (
                      item.payload
                    ) : (
                      <>{item.payload.slice(0, 250)}</>
                    )}
                    <Feed.Extra
                      as="a"
                      onClick={() => {
                        setReadMore(!readMore);
                      }}
                    >
                      {readMore === true ? <>Read less</> : <>Read more...</>}
                    </Feed.Extra>
                  </>
                ) : (
                  item.payload
                )}
              </List.Description>
            </List>
            {
              item?.mediaUrls?.length ?
                <Carousel
                  infiniteLoop
                  useKeyboardArrows
                  autoPlay={true}
                  showThumbs={false}
                  showStatus={false}
                  showIndicators={false}
                >
                  {
                    (item.mediaUrls || []).map((item, index) => {
                      let src = item.src ? item.src : item
                      let isVideo = false;

                      let mp4 = item.src.search(".mp4");
                      let mov = item.src.search(".mov");
                      let avi = item.src.search(".avi");
                      if (mp4 > 0 || mov > 0 || avi > 0) {
                        isVideo = true
                      }
                      return (
                        <>
                          {isVideo === false ?
                            (
                              <Segment basic className="crousel-contain-media">
                                <Image rounded centered alt={item.alt} fluid
                                  bordered src={src} size="big" />
                              </Segment>
                            ) : (
                              <Segment basic className="crousel-contain-media">
                                <ReactPlayer
                                  //  style={{ margin: "auto" }}
                                  width={498}
                                  url={src}
                                  controls={true}
                                  loop
                                />
                              </Segment>
                            )
                          }
                        </>
                      )
                    })
                  }
                </Carousel> : ""
            }
          </Segment>

          <Grid columns={2} >
            <Grid.Row>
              <Grid.Column textAlign="center">
                <TagPeople />
              </Grid.Column>
              <Grid.Column textAlign="right">
                <Button
                  onClick={() => setFeelingActivitiesOpen(true)}
                  icon
                  labelPosition="left"
                  fluid
                  basic
                  className="feel-activity-btn"
                  style={{
                    paddingLeft: "30px",
                    paddingRight: "0px"
                  }}>
                  <Icon name='smile' /> Feeling/Activity
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
          <Button fluid onClick={() => shareWallFeedBtn()} primary
            disabled={state.disablePostBtn} >
            Share
          </Button>
        </Modal.Content>
      </Modal>
      <Modal
        onClose={() => setFeelingActivitiesOpen(false)}
        open={feelingActivitiesOpen}
        size='mini'
      >
        <Modal.Content scrolling>
          <Tab menu={{ secondary: true, tabular: true, pointing: true, widths: 2, color: "blue", }} panes={panes} />
        </Modal.Content>
        <Button fluid onClick={() => setFeelingActivitiesOpen(false)} primary>Done</Button>
      </Modal>
    </>
  );
};

export default React.memo(FeedShare);
