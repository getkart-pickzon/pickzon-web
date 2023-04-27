import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Button, Header, Form, Input, Segment, Label, TextArea, Image, Icon, Radio, Menu } from 'semantic-ui-react';
import { useSelector } from "react-redux";
import { LoadScript, StandaloneSearchBox, } from "@react-google-maps/api";
import moment from 'moment';
import { googleLibrary, googleApiKey } from "../../../../../config/config.js"
import { GET, PATCH, UPLOADSINGLE } from '../../../../../Services';
import { getUser, makeUserProfileImgURL } from '../../../../../utils/common';
import { notifyToast } from '../../../../../utils/Toast';
import { loader, stopLoader } from '../../../../../utils/sweetAlert';
import { COMMON, USER } from '../../../../../route/apiPath.js';
import Assets from '../../../../../assets/Assets.js';
import REGEX from '../../../../../helper/regex.js';
import "./style.css"

let defaultState = {
  place: "",
  celebrity: { status: "" },
  description: "",
  dob: "",
  email: "",
  Name: "",
  gender: "",
  interest: "",
  jobProfile: "",
  livesIn: "",
  latitude: "",
  longitude: "",
  msisdn: "",
  ProfilePic: "",
  profileImage: "",
  showDOB: "",
  showEmail: "",
  showMobile: "",
  TiktokName: "",
  userName: "",
  usertype: "",
  website: "",
  coverImage: ""
}
const EditUserProfile = ({ btnStyle, callBack }) => {

  let loggedUser = getUser();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(defaultState);
  const [searchBox, setSearchBox] = useState(null);
  const [professionOptions, setProfession] = useState([]);
  const [disablePostDate, setDisablePostDate] = useState("")
  const userDetials = useSelector((states) => states.userDetials);

  useEffect(() => {
    try {
      function callEffect() {
        disableFeatureDate();
        setState((pre) => ({
          ...pre,
          celebrity: { status: userDetials.userInfo?.celebrity },
          description: userDetials.userInfo?.description,
          dob: userDetials.userInfo?.dob,
          email: userDetials.userInfo?.email,
          Name: userDetials.userInfo?.firstName,
          gender: userDetials.userInfo?.gender,
          interest: userDetials.userInfo?.interest,
          jobProfile: userDetials.userInfo?.jobProfile,
          latitude: userDetials.userInfo?.latitude,
          longitude: userDetials.userInfo?.longitude,
          livesIn: userDetials.userInfo?.livesIn,
          msisdn: userDetials.userInfo?.mobileNumber,
          userCoverImgage: { src: userDetials.userInfo?.userCoverImgage, filePath: "" },
          profileImage: { src: userDetials.userInfo?.userProfile, filePath: "" },
          coverImage: userDetials.userInfo?.coverImage,
          ProfilePic: userDetials.userInfo?.profilePic,
          showDob: userDetials.userInfo?.showDob,
          showEmail: userDetials.userInfo?.showEmail,
          showMobile: userDetials.userInfo?.showMobile,
          TiktokName: userDetials.userInfo?.tiktokName,
          userName: userDetials.userInfo?.userName,
          usertype: userDetials.userInfo?.userType,
          website: userDetials.userInfo?.website,
        }));
        fetchJobs();
      }; callEffect();
    } catch (er) { console.log(er); };
  }, [userDetials]);

  const fetchJobs = useCallback(async () => {
    const { status, message, payload } = await GET(COMMON.FETCH_ALL_JOBS, {});
    if (status === 0) { return console.error(message); };
    setProfession(payload || []);
  }, [userDetials.userInfo]);

  // const fetchUserDetails = async () => {
  //   try {
  //     setLoader(0)
  //     const { status, message, payload } = await GET(USER.FETCH_USER_PROFILE_DETAILS, {
  //       userId: loggedUser._id,
  //       followedUserId: userID
  //     });
  //     if (status === 0) { return console.error(message); };
  //     setLoader(status)
  //     setState((pre) => ({
  //       ...pre,
  //       userData: payload,
  //       userInfo: payload.userInfo,
  //       loggedUserProfile: loggedUser._id === userID ? true : false
  //     }));

  //     dispatch({ type: "userInfo", payload: payload.userInfo });
  //     payload.userInfo.userProfile = payload.userInfo.profilePic;
  //     payload.userInfo.userCoverImgage = payload.userInfo.coverImage;
  //   } catch (er) { console.log(er); };
  // };

  const onSBLoad = (ref) => { setSearchBox(ref); };

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
        livesIn: address
      }));
    } catch (er) { console.log(er); };
  };

  const handelChange = (e) => {
    try {
      setState((pre) => ({
        ...pre,
        gender: e
      }));
    } catch (er) { console.log(er); };
  };

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === 'description' && value.length > 150) {
      notifyToast("Descriptiom length must be greater 150 character", "error", "bottom-right")
      return false
    }
    setState((pre) => ({
      ...pre,
      [name]: value
    }));
  };

  const showPrivacyRadio = (name, value, message) => {
    try {
      setState((pre) => ({
        ...pre,
        [name]: value
      }));
      notifyToast(`Your ${message} is ${value === 1 ? `private` : `public`} now  `, "info", "bottom-right")
    } catch (er) { console.log(er); };
  };

  const validateUsername = (value) => {
    try {
      if (value.length > 50 || value.length < 4) {
        notifyToast("Full name length must be greater than 3 and less than 50 character", "error", "bottom-right")
        return false
      } else if (value === "") {
        notifyToast("Full name can't be empty", "error", "bottom-right")
        return false
      } else if (!value.match(REGEX.LETTER_ONLY)) {
        notifyToast("Full name should be contain alphabets only", "error", "bottom-right")
        return false
      }
      return true
    } catch (er) { console.log(er); };
  }

  const validateEmail = (value) => {
    try {
      if (!value.match(REGEX.EMAIL)) {
        notifyToast("Enter correct e-mail address", "error", "bottom-right")
        return false
      } return true;
    } catch (er) { console.log(er); };
  }

  const disableFeatureDate = (e) => {
    try {
      let dateValue = moment(new Date()).format("YYYY-MM-DD");
      let difference = moment(dateValue).subtract(13, 'years');
      let thirteenYearAgo = moment(difference).format("YYYY-MM-DD");
      setDisablePostDate(thirteenYearAgo);
    } catch (er) { console.log(er); };
  }

  const handleDobChange = (e) => {
    try {
      let val = e.target.value;
      setState((pre) => ({
        ...pre,
        dob: val
      }));
    } catch (er) { console.log(er); };
  }

  const uploadImageHandle = (event) => {
    try {
      event.preventDefault();
      const { files } = event.target;
      let name = event.target.id
      let mediaObj = {};
      mediaObj.alt = files[0].name;
      mediaObj.filePath = files[0];
      mediaObj.image = URL.createObjectURL(files[0])
      let validateURL = mediaObj.alt.match(REGEX.IMAGES_EXT);
      if (!validateURL) {
        notifyToast("Image Format Unsupported", "error", "bottom-right")
      } else {
        if (name === "coverImage") {
          setState((pre) => ({
            ...pre,
            userCoverImgage: { src: mediaObj.image, filePath: files[0] }
          }));
        } else {
          setState((pre) => ({
            ...pre,
            profileImage: { src: mediaObj.image, filePath: files[0] }
          }));
        };
      };
    } catch (er) { console.log(er); };
  };

  const updateProfileBtn = async () => {
    try {
      if (!state.gender) {
        return notifyToast("Please check gender field", "error", "bottom-right");
      }
      if (!state.dob) {
        return notifyToast("Please fill date-of-birth field", "error", "bottom-right");
      }
      if (!state.jobProfile) {
        return notifyToast("Please select work field", "error", "bottom-right");
      }
      if (!state.livesIn) {
        return notifyToast("Please fill lives-in field", "error", "bottom-right");
      }
      // if (!state.livesIn) {
      //   return notifyToast("Please fill interesed fields", "error", "bottom-right");
      // }   if (!state.livesIn) {
      //   return notifyToast("Please fill interesed fields", "error", "bottom-right");
      // }
      // if (
      //   !state.Name ||
      //   !state.gender ||
      //   !state.dob ||
      //   !state.jobProfile ||
      //   !state.livesIn ||
      //   !state.latitude ||
      //   !state.longitude
      // ) {
      //   notifyToast("Please fill mandatory fields", "error", "bottom-right");
      // } else {
      if (!validateUsername(state.Name)) {
        return
      }
      if (!validateEmail(state.email)) {
        return
      }
      loader();
      if (state.userCoverImgage.filePath) {
        const coverRes = await UPLOADSINGLE("/upload/upload-user-image", state.userCoverImgage.filePath);
        if (coverRes.status === 0) { notifyToast(coverRes.message, 'info', 'bottom'); stopLoader(); return };
        state.coverImage = coverRes.payload;
      };
      if (state.profileImage.filePath) {
        const profileRes = await UPLOADSINGLE("/upload/upload-user-image", state.profileImage.filePath);
        if (profileRes.status === 0) { notifyToast(profileRes.message, 'info', 'bottom'); stopLoader(); return };
        state.ProfilePic = profileRes.payload;
      };
      const { status, message } = await PATCH("/user/update-user", loggedUser._id, state);
      stopLoader();
      setOpen(false);
      if (status === 0) { return console.log(message); };
      loggedUser.ProfilePic = state.ProfilePic;
      loggedUser.Name = state.Name;
      loggedUser.email = state.email;
      loggedUser.dob = state.dob;
      loggedUser.city = state.livesIn;
      loggedUser.jobProfile = state.jobProfile;
      sessionStorage.setItem('LoggedUser', JSON.stringify(loggedUser));
      callBack();
      notifyToast(message, 'success', 'bottom');
      // }
    } catch (er) { console.log(er); };
  };

  const onHandleOpen = () => {
    setOpen(true)
    setState((pre) => ({
      ...pre,
      celebrity: { status: userDetials.userInfo?.celebrity },
      description: userDetials.userInfo?.description,
      dob: userDetials.userInfo?.dob,
      email: userDetials.userInfo?.email,
      Name: userDetials.userInfo?.firstName,
      gender: userDetials.userInfo?.gender,
      interest: userDetials.userInfo?.interest,
      jobProfile: userDetials.userInfo?.jobProfile,

      latitude: userDetials.userInfo?.latitude,
      longitude: userDetials.userInfo?.longitude,
      livesIn: userDetials.userInfo?.livesIn,
      msisdn: userDetials.userInfo?.mobileNumber,

      userCoverImgage: { src: userDetials.userInfo?.userCoverImgage, filePath: "" },
      profileImage: { src: userDetials.userInfo?.userProfile, filePath: "" },

      coverImage: userDetials.userInfo?.coverImage,
      ProfilePic: userDetials.userInfo?.profilePic,

      showDob: userDetials.userInfo?.showDob,
      showEmail: userDetials.userInfo?.showEmail,
      showMobile: userDetials.userInfo?.showMobile,
      TiktokName: userDetials.userInfo?.tiktokName,
      userName: userDetials.userInfo?.userName,
      usertype: userDetials.userInfo?.userType,
      website: userDetials.userInfo?.website,
    }));
  }

  // const comp2 = <FeedCardUserData />

  return (
    <>
      <Modal
        size='small'
        open={open}
        trigger={<Button className={btnStyle} circular compact primary title='Update Profile' icon="edit" />}
        onClose={() => setOpen(false)}
        onOpen={onHandleOpen}
      >
        <Header icon='address card outline' content='Edit Profile' />
        <Modal.Content scrolling style={{ padding: "1rem" }}>
          <Form>
            <Form.Field>
              <Segment className='modal-cover' raised >
                <Image style={{ objectFit: "cover", width: "100%" }} src={state.userCoverImgage?.src ?? Assets.defaultPlaceholders.landscape.img} centered />
                <Label title="Change Cover Image" color='blue' circular style={{ cursor: 'pointer', position: "absolute", top: "5px", right: "5px" }} onClick={() => {
                  document.getElementById("coverImage").click();
                }}>
                  <Icon name="camera" fitted />
                </Label>
                <input
                  className="input-file"
                  style={{ display: "none" }}
                  id="coverImage"
                  type="file"
                  accept="image/jpg,image/png,image/jpeg,image/jfif"
                  onChange={uploadImageHandle}
                />
              </Segment>

              <Segment textAlign="center" circular className='modal-profile' raised>
                <Image
                  circular
                  rounded
                  fluid
                  bordered
                  src={state.profileImage?.src ?? Assets.defaultPlaceholders.userProfile.img}
                  size="small"
                  className='modal-profile-img'
                />
                <Label circular color='blue' title="Change Profile Image" style={{ cursor: 'pointer', position: "absolute", bottom: "3px", right: "18px" }} onClick={() => {
                  document.getElementById("profileImage").click();
                }}>
                  <Icon name="camera" fitted />
                </Label>
                <input
                  className="input-file"
                  style={{ display: "none" }}
                  id="profileImage"
                  type="file"
                  accept="image/jpg,image/png,image/jpeg,image/jfif"
                  onChange={uploadImageHandle}
                />
              </Segment>

              <Segment clearing basic className="pickzon-id">
                <Menu compact secondary className="pickzon-id-inner">
                  <Menu.Item>
                    Private Account &nbsp;&nbsp;
                    <Radio slider value={state.usertype} checked={state.usertype === 1}
                      onChange={() => showPrivacyRadio('usertype', state.usertype === 1 ? 0 : 1, "Account")} />
                  </Menu.Item>
                  <Input labelPosition='right' className="pickzon-userName">
                    <Label color='blue' >Pickzon-Id</Label>
                    <Input iconPosition='left' placeholder={`@${state.userName}`} disabled />
                  </Input>
                </Menu>
              </Segment>
            </Form.Field>
            <Segment basic >
              <Form.Group widths='equal' style={{ padding: "0" }}>
                <Form.Field
                  required
                >
                  <label>
                    <Icon name='user ' />
                    Full Name</label>
                  <Input fluid placeholder='Full Name' name="Name" value={state?.Name} onChange={handleOnChange}
                    disabled={state.celebrity.status == 1 ? true : false}
                  // onBlur={(e, item) => validateUsername(e.target.value)}
                  />
                </Form.Field>
                <Form.Field required>
                  <label>
                    <Icon name='mail' />
                    E-mail
                    <Radio slider className='radio-slider'
                      title="Show Email on Profile"
                      value={state.showEmail} checked={state.showEmail === 1}
                      onChange={() => showPrivacyRadio('showEmail', state.showEmail === 1 ? 0 : 1, " E-mail")}
                    />
                  </label>
                  <Input fluid placeholder='E-mail' name="email" value={state?.email} onChange={handleOnChange}
                  // onBlur={(e, item) => validateEmail(e.target.value)}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field required>
                  <label>
                    <Icon name='mobile alternate' />
                    Phone No.
                    <Radio slider className='radio-slider' value={state.showMobile} checked={state.showMobile === 1}
                      onChange={() => showPrivacyRadio('showMobile', state.showMobile === 1 ? 0 : 1, " Phone No.")} />
                  </label>
                  <Input fluid placeholder='Mobile No.' readOnly={true} name="msisdn" value={state?.msisdn} onChange={handleOnChange} title="Mobile no. can't be change from web" />
                </Form.Field>

                <Form.Field required>
                  <label>
                    <Icon name='calendar alternate outline' />
                    Date-Of-Birth
                    <Radio slider className='radio-slider' value={state.showDob} checked={state.showDob === 1}
                      onChange={() => showPrivacyRadio('showDob', state.showDob === 1 ? 0 : 1, "Date-Of-Birth")} />
                  </label>
                  <input
                    disabled={state.celebrity.status == 1 ? true : false}
                    fluid
                    type='date'
                    placeholder='dd-mm-yyyy'
                    value={state.dob}
                    onChange={handleDobChange}
                    max={disablePostDate}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field required>
                  <label>
                    <Icon.Group >
                      <Icon name='user ' />
                      <Icon corner='bottom right' name='suitcase' />
                    </Icon.Group>
                    {" "}
                    Work</label>
                  <Form.Select
                    fluid
                    value={state.jobProfile}
                    options={professionOptions}
                    placeholder={professionOptions[0]?.text}
                    onChange={(e, data) => setState((pre) => ({ ...pre, jobProfile: data.value }))}
                  />
                </Form.Field>

                <Form.Field required>
                  <label>
                    <Icon name='heterosexual' />
                    Gender</label>
                  <Label basic style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem" }} >
                    <Form.Radio
                      label='Male'
                      value='Male'
                      name='Male'
                      checked={state?.gender === 'Male'}
                      onClick={() => handelChange('Male')}
                    />
                    <Form.Radio
                      label='Female'
                      value='Female'
                      name='Female'
                      checked={state?.gender === 'Female'}
                      onClick={() => handelChange('Female')}
                    />
                    <Form.Radio
                      label='Other'
                      value='Others'
                      name='Others'
                      checked={state?.gender === 'Others'}
                      onClick={() => handelChange('Others')}
                    />
                  </Label>
                </Form.Field>

              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field required>
                  <label>
                    <Icon name='map marker alternate' />
                    Lives In</label>
                  <LoadScript googleMapsApiKey={googleApiKey} libraries={googleLibrary} style={{ display: "hidden" }}>
                    <StandaloneSearchBox
                      onPlacesChanged={handleSearchBox}
                      onLoad={onSBLoad}
                    >
                      <Input
                        placeholder={state.livesIn}
                        fluid />
                    </StandaloneSearchBox>
                  </LoadScript>
                </Form.Field>
                <Form.Field>
                  <label>
                    <Icon name='linkify' />
                    Website</label>
                  <Input fluid placeholder='Website' name="website" value={state?.website} onChange={handleOnChange}
                  // onBlur={(e, item) => validateUrl(e.target.value)}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>
                    <Icon name='football ball' />
                    Intrested</label>
                  <TextArea fluid placeholder='Intrest...' rows={5} name="interest" value={state?.interest} onChange={handleOnChange} />
                </Form.Field>
                <Form.Field>
                  <label>
                    <Icon name='newspaper' />
                    Description</label>
                  <TextArea fluid placeholder='description...' min={3} rows={5} name="description" value={state?.description} onChange={handleOnChange} />
                </Form.Field>
              </Form.Group>
            </Segment>
          </Form>
        </Modal.Content >
        <Modal.Actions>
          <Button
            content="Close"
            icon='close'
            onClick={() => setOpen(false)}
            negative
            compact
            basic
          />
          <Button
            content="Update"
            icon='checkmark'
            onClick={() => updateProfileBtn()}
            primary
            compact
          />
        </Modal.Actions>
      </Modal >
    </>
  );
};

export default React.memo(EditUserProfile);