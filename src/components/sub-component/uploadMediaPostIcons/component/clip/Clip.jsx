import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Segment,
  Header,
  Icon,
  Button,
  Input,
  Modal,
  Form,
  Label,
  Image,
  Grid,
  Dropdown,
  TextArea,
  Divider,
  Tab,
} from "semantic-ui-react";
import { LoadScript, StandaloneSearchBox, } from "@react-google-maps/api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactPlayer from "react-player";

import { googleLibrary, googleApiKey } from "../../../../../config/config.js"
import { loader, stopLoader } from "../../../../../utils/sweetAlert";
import { getUser } from "../../../../../utils/common";
import { POST, UPLOADMEDIA } from "../../../../../Services";
import { notifyToast } from "../../../../../utils/Toast";

import "../Post/style.css"

import iconClip from "../../../../../assets/images/clip.svg"


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


let defaultObj = {
  postWallImages: [],
  userId: "",
  disablePostBtn: true,
  commentType: 0,
  feeling: "",
  activities: "",
  latitude: "",
  longitude: "",
  payload: "",
  place: "",
  postType: 1,
  tag: [],
  thumbUrl: [],
  url: [],
  dimension: []
};

const Clip = () => {
  const [state, setState] = useState(defaultObj);
  const [searchBox, setSearchBox] = useState(null);
  const loggedUser = getUser();

  let dispatch = useDispatch();
  const createFeedPost = useSelector((state) => state.createFeedPostReducers);
  const [createPost, setCreatePost] = useState(false);
  const [feelingActivitiesOpen, setFeelingActivitiesOpen] = useState(false);

  const [privacy, setPrivacy] = useState({ value: 1, text: "Public", icon: "globe" });

  useEffect(() => {
    try {
      function callEffect() {

      }; callEffect();
    } catch (er) { console.log(er); };
  }, []);

  const fileHandler = (event) => {
    try {
      event.preventDefault();
      const { files } = event.target;
      let localFiles = state.postWallImages;
      if (localFiles.length >= 5) { return; };
      let _length = 0;
      if (files.length >= 5) {
        _length = 5 - localFiles.length
      } else {
        _length = localFiles.length > 0 ? (5 - localFiles.length) : files.length;
      };
      for (let fi = 0; fi < _length; fi++) {
        let mediaObj = {};
        mediaObj.alt = files[fi].name;
        mediaObj.filePath = files[fi];
        let validateURL = mediaObj.alt.match(/\.(jpg|jpeg|png|gif|jfif)$/);
        if (!validateURL) {
          mediaObj.video = URL.createObjectURL(files[fi]);
        } else {
          mediaObj.image = URL.createObjectURL(files[fi]);
        };
        localFiles.push(mediaObj);
      };
      setState((pre) => ({
        ...pre,
        postWallImages: localFiles,
      }));
      disablePostB();
    } catch (er) { console.log(er); };
  };

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

  const removeUploadeImage = (index) => {
    try {
      let medias = state.postWallImages;
      medias.splice(index, 1);
      setTimeout(() => {
        setState((pre) => ({ ...pre, postWallImages: [] }));
        setState((pre) => ({ ...pre, postWallImages: medias }));
        if (medias.length === 0) { disablePostB() }
      }, 12);
    } catch (er) { console.log(er); };
  };

  const uploadMedias = async () => {
    try {
      let imagePath = (state.postWallImages || []).map((item) => { return item.filePath });
      loader("Uploading Your Media, it will take some time");
      let { status, payload } = await UPLOADMEDIA("/upload/upload-media", imagePath);
      stopLoader();
      if (status === 0) { return 0; };
      return payload;
    } catch (er) { console.log(er); };
  };

  const postWallFeedBtn = async () => {
    try {
      if (!state.payload && state.postWallImages.length === 0) {
        return
      };

      if (state.postWallImages.length > 0) {
        let uploadRes = await uploadMedias();
        if (uploadRes === 0) { return };
        state.url = uploadRes.url;
        state.thumbUrl = uploadRes.thumbUrl;
        state.dimension = uploadRes.dimention;
      }
      state.tag = createFeedPost.taggedPeoples;
      if (createFeedPost.expression?.type === "feeling") {
        state.feeling = createFeedPost.expression?._id;
      } else {
        state.activities = createFeedPost.expression?._id;
      }
      state.userId = loggedUser._id;
      const { status, message } = POST("/feed/add-feed", state);
      if (status === 0) { notifyToast(message, 'error', 'bottom'); };
      setCreatePost(false);
      dispatch({ type: "wallPostCallback", payload: 1 });
    } catch (er) { console.log(er); };
  };

  const onSBLoad = (ref) => {
    setSearchBox(ref);
  };

  const handleSearchBox = () => {
    try {
      let searchData = searchBox.getPlaces()[0];
      let lat = searchData.geometry?.location?.lat()
      let lng = searchData.geometry?.location?.lng()
      let address = searchData?.formatted_address
      setState((pre) => ({
        ...pre,
        latitude: lat,
        longitude: lng,
        place: address
      }));
    } catch (er) { console.log(er); };
  };

  const selectPrivacy = (data) => {
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

  return (
    <>
      <Modal
        closeIcon
        onOpen={() => setCreatePost(true)}
        onClose={() => setCreatePost(false)}
        open={createPost}
        size="tiny"
        trigger={
          <Image src={iconClip} size="mini" />
        }
      >
        <Modal.Header>
          Create Post
          <Dropdown
            labeled compact basic button
            style={{ float: "right" }}
            direction="left"
            className="icon"
            icon={privacy.icon}
            options={privacyOptions}
            text={privacy.text}
            value={privacy.value}
            onChange={(e, data) => selectPrivacy(data)}
            defaultValue={privacy.value}
          />
        </Modal.Header>
        <Modal.Content>
          <Segment style={{ padding: "0px" }} basic>
            {(createFeedPost.taggedPeoples || []).map((tItem) => {
              return <a>@{tItem} </a>
            })}
            {createFeedPost.expression?.image}{createFeedPost.expression?.name}
          </Segment>
          <Form>
            <TextArea placeholder={`What's on your mind ${loggedUser.Name} ?`}
              onChange={changeHandler} rows={3} className="create-post-caption" style={{ backgroundColor: " #f3f4f5", border: "none" }} />
          </Form>
          {
            state.postWallImages.length > 0 ?
              (
                <Segment className="crousel-wrapper" >
                  <Carousel
                    infiniteLoop
                    useKeyboardArrows
                    autoPlay={false}
                    showThumbs={false}
                    showStatus={false}
                    className="create-post-crousel"
                  >
                    {(state.postWallImages || []).map((item, index) => {
                      return <div className="imagesCarousel">
                        {!item.video ?
                          <Segment basic className="crousel-contain-media">
                            <Label as="a" corner onClick={() => removeUploadeImage(index)}>
                              <Icon name="close" />
                            </Label>
                            <Image rounded centered alt={item.alt} fluid
                              bordered src={item.image} size="big" />
                          </Segment>
                          :
                          <Segment basic className="crousel-contain-media">
                            <Label as="a" corner onClick={() => removeUploadeImage(index)}>
                              <Icon name="close" />
                            </Label>
                            <ReactPlayer
                              width={499}
                              url={item.video}
                              controls={true}
                            />
                          </Segment>}
                      </div>
                    })}
                  </Carousel>
                </Segment>
              )
              :
              (<Segment
                secondary
                className="empty-crousel"
                textAlign="center"
              >
                <Header
                  icon
                  color="grey"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    document.getElementById("Uploadbtn").click();
                  }}
                >
                  <Icon name="images outline" />
                  Add photos/videos for Post
                </Header>
              </Segment>)
          }
          <input
            style={{ display: "none" }}
            id="Uploadbtn"
            multiple
            maxLength={5}
            max={5}
            type="file"
            accept="image/jpg,image/png,image/jpeg,image/jfif,video/mp4"
            onChange={fileHandler}
          />
          {state.postWallImages.length > 0 ?
            (
              <>
                <Button
                  icon="plus"
                  circular
                  className="upload-btn"
                  onClick={() => {
                    document.getElementById("Uploadbtn").click();
                  }}>
                </Button>
              </>
            ) : ""
          }

          <Grid columns={3} >
            <Grid.Row>
              <Grid.Column textAlign="left">
                <LoadScript googleMapsApiKey={googleApiKey} libraries={googleLibrary} style={{ display: "hiddden" }}>
                  <StandaloneSearchBox
                    onPlacesChanged={handleSearchBox}
                    onLoad={onSBLoad}
                  >
                    <Input
                      action={{ icon: 'map marker alternate' }}
                      actionPosition="left"
                      placeholder='Location ...'
                      style={{
                        width: `107px`,
                        height: `auto`,
                      }} />
                  </StandaloneSearchBox>
                </LoadScript>
              </Grid.Column>
              <Grid.Column textAlign="center">

              </Grid.Column>
              <Grid.Column textAlign="right">
                <Button onClick={() => setFeelingActivitiesOpen(true)} icon labelPosition="left" fluid basic
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
          <Button fluid onClick={() => postWallFeedBtn()} primary
            disabled={state.disablePostBtn} >
            Post
          </Button>
        </Modal.Content>
      </Modal >

    </>
  );
};

export default React.memo(Clip);
