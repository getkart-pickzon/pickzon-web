import React, { useEffect, useState } from "react";
import { Image, Icon, Select, TextArea, Button, Card, Modal, Form, Label, Menu, Feed } from "semantic-ui-react";

import './style.css'
import { GET, PUT, UPLOAD } from "../../../Services";
import { notifyToast } from "../../../utils/Toast";
import { getUser } from "../../../utils/common";

const defaultADSFormObj = {
  buttonLabel: "",
  buttonLabelURL: "",
  description: "",
  images: []
};

const CreateCard = ({ _id, item, actionBtn }) => {
  const [ADSModal, setADSModal] = useState(false);
  const [buttonLabel, setbuttonLabel] = useState([]);

  const [state, setState] = useState(defaultADSFormObj);
  const loggedUser = getUser();

  useEffect(() => {
    try {
      function callFetch() {
        console.clear();
        getButtonLabel();
      }; callFetch();
    } catch (err) { console.log(err); };
  }, []);

  const getButtonLabel = async () => {
    try {
      let respo = await GET("/get-button-label", {});
      if (respo.status === 0) {
        return console.log(respo.message);
      };
      setbuttonLabel(respo.payload);
    } catch (err) { console.log(err); };
  };

  const handleButtonLabel = (data) => {
    try {
      setState((prevState) => ({
        ...prevState,
        buttonLabel: data,
      }));
    } catch (er) { console.log(er); };
  };

  const handleChange = (event) => {
    try {
      const { name, value } = event.target;
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } catch (er) { console.log(er); };
  };

  const updateAdsBtn = async () => {
    try {
      if (!state.description || !state.buttonLabel || !state.buttonLabelURL) {
        return notifyToast('All Field are mandatory', "error", "bottom-right", 1);
      };

      let urlRegEx = state.buttonLabelURL.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      );

      if (urlRegEx === null)
        return notifyToast(`Invalid Button URL`, "error", "bottom-right", 1);
      state.userId = loggedUser._id;
      state.images = await uploadImageProcess();
      let { status, message } = await PUT("/ads/update-ads", _id, state);
      if (status === 0) return notifyToast(message, "error", "bottom-right", 1);
      notifyToast(message, "success", "bottom-right", 1);
      setTimeout(() => { setADSModal(false); }, 300);
      actionBtn();
    } catch (err) { console.log(err); };
  };

  const editButton = async () => {
    try {
      setADSModal(true);
      let { status, message, payload } = await GET('/ads/fetch-ads-details', { _id: _id });
      if (status === 0) { return console.log(message); };
      setState((prevState) => ({
        ...prevState,
        buttonLabel: payload.buttonLabel ? payload.buttonLabel : "",
        buttonLabelURL: payload.buttonLabelURL ? payload.buttonLabelURL : "",
        description: payload.description ? payload.description : "",
        images: payload.createPage ? payload.createPage.images : "",
      }));
    } catch (err) { console.log(err); };
  };

  const uploadImageProcess = async () => {
    try {
      let imageUpload = [], forUpload = [];
      for (let u = 0; u < state.images.length; u++) {
        if (state.images[u].imagesFiles) {
          forUpload.push(state.images[u].imagesFiles);
        } else {
          imageUpload.push(state.images[u]);
        };
      };

      if (forUpload.length > 0) {
        let res = await UPLOAD("/upload/upload-image", forUpload);
        if (res.status === 0) { return notifyToast(res.message, "error", "bottom-right", 1); };
        imageUpload.push(...res.payload);
      };
      return imageUpload;
    } catch (err) { console.log(err) };
  };

  return (
    <>
      <Card className="card-box" raised>
        <Card.Content className="card-content-above">
          <Menu className="card-box-menu" secondary >
            <Menu.Item position="left">
              <Label>
                {item.createPageName}
              </Label>
            </Menu.Item >
            <Menu.Item position="right">
              <Label>
                <Icon name={item.actionBtn}
                  onClick={editButton}
                  color="black" link />
              </Label>
            </Menu.Item>
          </Menu>
          <Image
            className="card-cover-img"
            src={item?.coverImage}
            bordered
            style={{ opacity: '0.9' }}
          />
          <Feed className="profile-box">
            <Feed.Event>
              <Feed.Label image={item.profileImage} className="profile-img" />
              <Feed.Content className="profile-content">
                <Feed.Summary>
                  <h4 title={item.title}>
                    {item.title.length > 15 ? item.title.substr(0, 15) + "..." : item.title}
                  </h4>
                </Feed.Summary>
                <Feed.Date>{item.startDate} to {item.endDate}</Feed.Date>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
        <Card.Content className="card-content-below" >
          <Card.Description>{item.description} </Card.Description>
          <Button.Group fluid compact widths={1} className="button-wrapper"  >
            <Button circular>
              {/* <Icon name='target' /> */}
              {item.goalsTitle}
            </Button>
          </Button.Group>
        </Card.Content>
      </Card>



      {/*  Description, Button and Image then need to be editable  */}
      <Modal
        size={'small'}
        open={ADSModal}
        onClose={() => setADSModal(false)}
      >
        <Modal.Header>Update ADS</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field
                control={Select}
                label='Button Label'
                placeholder='Button Label'
                value={state.buttonLabel}
                options={buttonLabel}
                onChange={(e, data) => handleButtonLabel(data.value)}
              />
            </Form.Group>

            <Form.Group widths='equal'>
              <Form.Input
                fluid
                label='Paste here your URL...'
                placeholder='Paste here your URL...'
                name="buttonLabelURL"
                value={state.buttonLabelURL}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group widths='equal'>
              <Form.Field
                control={TextArea}
                label='Description'
                placeholder='Tell us more about you ADS...'
                name="description"
                value={state.description}
                onChange={handleChange}
              />
            </Form.Group>

            {/* <Form.Group widths="equal">
              <Form.Field>
                <label>Image</label>
                <Segment
                  placeholder
                  size="small"
                  className="image-upload-box"
                  padded
                  textAlign="center"
                >
                  <Image
                    rounded
                    centered
                    alt={"item.name"}
                    fluid
                    bordered
                    src={state.createPageImages}
                    size="small"
                    label={{
                      onClick: () => removeUploadeImage(state.createPageImages),
                      corner: "right",
                      icon: "close",
                    }}
                  />

                  {state.images.length ?
                    <>
                      {(state.images || []).map((item, index) => {
                        return (
                          <Image
                            rounded
                            centered
                            alt={item.name}
                            key={index}
                            fluid
                            bordered
                            src={item.image}
                            size="small"
                            label={{
                              onClick: () => removeUploadeImage(item.image),
                              corner: "right",
                              icon: "close",
                            }}
                          />
                        );
                      })}
                    </>
                    :
                    <>
                      <Header
                        icon
                        color="grey"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          document.getElementById("my-file").click();
                        }}
                      >
                        <Icon name="cloud upload" />
                        Select Image for Update
                      </Header>
                      <input
                        className="input-file"
                        style={{ display: "none" }}
                        id="my-file"
                        type="file"
                        accept="image/png,image/jpeg"
                        onChange={fileHandler}
                      />
                    </>
                  }
                </Segment>
              </Form.Field>
            </Form.Group> */}

          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button color="green" onClick={() => updateAdsBtn()}>Update</Button>
          <Button color="red" onClick={() => setADSModal(false)}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default React.memo(CreateCard);