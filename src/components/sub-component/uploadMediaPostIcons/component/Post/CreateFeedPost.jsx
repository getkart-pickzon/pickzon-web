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
import { PATCH, POST, PUT, UPLOADMEDIA } from "../../../../../Services";
import { notifyToast } from "../../../../../utils/Toast";

import Activities from "./Activities"
import Feelings from "./Feelings"
import TagPeople from "./TagPeople";
import "./style.css"

import iconImage from "../../../../../assets/images/post.svg"
import REGEX from "../../../../../helper/regex.js";

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
  postWallImages: [],
  userId: "",
  disablePostBtn: true,
  commentType: 0,
  feeling: "",
  activities: "",
  latitude: "",
  longitude: "",
  payload: "",
  payloadDefaultValue: "",
  place: "",
  placePlaceHolder: "Location ...",
  postType: 1,
  tag: [],
  thumbUrl: [],
  url: [],
  dimension: [],
  tagId: []
};

//inUse
const CreateFeedPost = () => {
  const [state, setState] = useState(defaultObj);
  const [searchBox, setSearchBox] = useState(null);
  const loggedUser = getUser();

  let dispatch = useDispatch();
  const createFeedPost = useSelector((state) => state.createFeedPostReducers);

  const [createPost, setCreatePost] = useState(false);
  const [feelingActivitiesOpen, setFeelingActivitiesOpen] = useState(false);

  const [privacy, setPrivacy] = useState({ value: 1, text: "Public", icon: "globe" });

  // useEffect(() => {
  //   try {
  //     function callEffect() {
  //       console.clear();
  //       if (createFeedPost.editWallPost?.id) {
  //         openEditModal();
  //       };
  //     }; callEffect();
  //   } catch (er) { console.log(er); };
  // }, [createFeedPost.editWallPost]);


  // const openEditModal = () => {
  //   try {
  //     let url = createFeedPost.editWallPost?.url || [];
  //     let length = url.length;
  //     let postURL = []
  //     for (let ui = 0; ui < length; ui++) {
  //       let isVideo = url[ui].search(".mp4");
  //       if (isVideo >= 0) {
  //         postURL.push({ video: url[ui], alt: ui });
  //       } else {
  //         postURL.push({ image: url[ui], alt: ui });
  //       };
  //     };
  //     setState((pre) => ({
  //       ...pre,
  //       payloadDefaultValue: createFeedPost.editWallPost?.payload,
  //       payload: createFeedPost.editWallPost?.payload,
  //       feeling: createFeedPost.editWallPost?.feeling,
  //       activities: createFeedPost.editWallPost?.activities,
  //       place: createFeedPost.editWallPost?.place,
  //       placePlaceHolder: createFeedPost.editWallPost?.place,
  //       postType: createFeedPost.editWallPost?.postType === 'Public' ? 1 : 0,
  //       tag: createFeedPost.editWallPost?.tag,
  //       // tagId: createFeedPost.editWallPost?.tagId,
  //       thumbUrl: createFeedPost.editWallPost?.thumbUrl,
  //       url: createFeedPost.editWallPost?.url,
  //       dimension: createFeedPost.editWallPost?.dimension,
  //       postWallImages: postURL
  //     }));
  //     dispatch({ type: "tagPeople_data", payload: createFeedPost.editWallPost?.tag });
  //     let name = "", image = '';
  //     if (createFeedPost.editWallPost?.feeling?.name) {
  //       name = createFeedPost.editWallPost?.feeling.name;
  //       image = createFeedPost.editWallPost?.feeling.image;
  //     };
  //     if (createFeedPost.editWallPost?.activities?.name) {
  //       name = createFeedPost.editWallPost?.activities.name;
  //       image = createFeedPost.editWallPost?.activities.image;
  //     };
  //     createFeedPost.expression.image = image;
  //     createFeedPost.expression.name = name;
  //     return setCreatePost(true);
  //   } catch (er) { console.log(er); };
  // };

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
        if (files[fi] === undefined) { continue };
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
    let defaultValue = e.target.innerHTML;
    setState((pre) => ({ ...pre, payload: val })); //change defaultValue to val
    setState((pre) => ({ ...pre, payloadDefaultValue: val }));
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
      if (status === 0) { return {}; };
      return payload;
    } catch (er) { console.log(er); };
  };

  const postWallFeedBtn = async () => {
    try {
      if (!state.payload.match(REGEX.NO_SPACE) && state.postWallImages.length === 0) {
        notifyToast("caption can't be empty", "error", "bottom-right")
        return
      }
      if (!state.payload && state.postWallImages.length === 0) {
        return
      };
      if (state.postWallImages.length > 0) {
        let uploadRes = await uploadMedias();
        if (uploadRes === 0) { return };
        let urlLength = uploadRes.url.length;

        let stateUrl = state.url;
        let stateThumbUrl = state.thumbUrl;
        let stateDimension = state.dimension;
        for (let u = 0; u < urlLength; u++) {
          stateUrl.push(uploadRes.url[u]);
          if (uploadRes.thumbUrl[u]) {
            stateThumbUrl.push(uploadRes.thumbUrl[u]);
          };
          stateDimension.push(uploadRes.dimention[u] || []);
        };

        state.url = stateUrl;
        state.thumbUrl = stateThumbUrl;
        state.dimension = stateDimension;
      };
      state.tag = createFeedPost.taggedPeoples;

      if (createFeedPost.expression?.type === "feeling") {
        state.feeling = createFeedPost.expression?._id;
      } else {
        state.activities = createFeedPost.expression?._id;
      }
      state.userId = loggedUser._id;
      let response = "";
      setState((pre) => ({ ...pre, disablePostBtn: true }));

      // if (createFeedPost.editWallPost?.id) {
      //   if (createFeedPost.expression?.type === "feeling") {
      //     state.feelingData = createFeedPost.expression;
      //   } else {
      //     state.activitiesData = createFeedPost.expression;
      //   }
      //   response = await PUT("/feed/update-feed", createFeedPost.editWallPost?.id, state);
      // } else {
      response = await POST("/feed/add-feed", state);
      // };
      setState((pre) => ({ ...pre, disablePostBtn: false }));

      if (response.status === 0) { notifyToast(response.message, 'error', 'bottom'); };
      setCreatePost(false);
      dispatch({ type: "wallPostCallback", payload: 1 });
      dispatch({ type: "wallPostCallback", payload: 3 });
      dispatch({ type: "tagPeople_data", payload: [] });
      setState(defaultObj);
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

  function unescapeHTML(html) {
    var escapeEl = document.createElement('textarea');
    escapeEl.innerHTML = html;
    return escapeEl.textContent;
  };

  const onCloseModal = () => {
    try {
      dispatch({ type: "editWallPost", payload: {} });
      setCreatePost(false);
    } catch (er) { console.log(er); };
  };

  const removeTagPeople = (item, index) => {
    try {
      let filterTagValue = createFeedPost.taggedPeoples.filter((_item) => {
        return _item !== item
      })
      dispatch({ type: "tagPeople_data", payload: filterTagValue });
    } catch (er) { console.log(er); };
  }

  return (
    <>
      <Modal
        closeIcon
        onOpen={() => setCreatePost(true)}
        onClose={() => onCloseModal()}
        open={createPost}
        size="tiny"
        trigger={
          <Image src={iconImage} size="mini" />
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
            {(createFeedPost.taggedPeoples || []).map((tItem, tIndex) => {
              return <>
                <Label basic circular color="blue" key={tIndex}>
                  @{tItem}
                  <Icon name='delete' onClick={() => removeTagPeople(tItem, tIndex)} />
                </Label>
              </>
            })}
            {createFeedPost.expression?.image}{createFeedPost.expression?.name}
          </Segment>
          <Form>
            <TextArea placeholder={`What's on your mind ${loggedUser.Name} ?`}
              value={state.payloadDefaultValue}
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
              <Grid.Column textAlign="left width-100 mb-10 ">
                <LoadScript googleMapsApiKey={googleApiKey} libraries={googleLibrary} style={{ display: "hi dden" }}>
                  <StandaloneSearchBox
                    onPlacesChanged={handleSearchBox}
                    onLoad={onSBLoad}
                  >
                    <Input
                      action={{ icon: 'map marker alternate' }}
                      actionPosition="left"
                      placeholder={state.placePlaceHolder}
                      title={state.placePlaceHolder}
                      className="width-100 width-80"
                      style={{
                        // width: `107px`,
                        height: `auto`,
                      }} />
                  </StandaloneSearchBox>
                </LoadScript>
              </Grid.Column>
              <Grid.Column textAlign="center width-100 mb-10">
                <TagPeople />
              </Grid.Column>
              <Grid.Column textAlign="right width-100 mb-10">
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

export default React.memo(CreateFeedPost);
