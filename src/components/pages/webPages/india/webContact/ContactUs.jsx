import React, { useState, useEffect } from 'react'
import { Helmet } from "react-helmet";
import { Grid, Image, Container, Form, Select, Label, Icon, Segment, Header } from "semantic-ui-react";
import { FORMDATA, GET } from '../../../../../Services';
import { notifyToast } from '../../../../../utils/Toast';
import REGEX from '../../../../../helper/regex';
import { PUBLIC } from '../../../../../route/apiPath';
import { ContactUsMeta } from "../../../../../utils/meta";
import './style.css'

let defaultObj = {
  name: "",
  email: "",
  mobile: "",
  issue: "",
  category: "",
  files: {},
}

const ContactUs = () => {
  const [state, setState] = useState(defaultObj);
  const [option, setOption] = useState([]);
  const [img, setImg] = useState({})

  useEffect(() => {
    function callEffect() {
      fetchCategory();
    }; callEffect();
  }, [])

  const fetchCategory = async () => {
    try {
      let { status, message, payload } = await GET(PUBLIC.ADD_CONTACT_CATEGORY, {});
      if (status === 0) { console.log(message); }
      let arr = (payload || []).map((el, i) => ({
        key: i,
        text: el.value,
        value: el.value
      }));
      setOption(arr);
    } catch (error) {
      console.log(error)
    }
  }

  const onHandleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    if (name === 'mobile') {
      if (!value.match(REGEX.POSITIVE_INT)) {
        notifyToast("Enter correct Phone no.", "error", "bottom-right")
        return false
      }
      if (value.length > 15) {
        notifyToast("Enter upto 15 digits", "error", "bottom-right")
        return false
      }
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
        return notifyToast("Image Format Unsupported", "error", "bottom-right")
      } else {
        setImg(mediaObj)
        setState((pre) => ({
          ...pre,
          files: mediaObj.filePath
        }));
      };
    } catch (er) { console.log(er); };
  };

  const onHandleRemove = () => {
    setImg({});
    setState((pre) => ({
      ...pre,
      files: {}
    }));
  }

  const validateEmail = (value) => {
    try {
      if (!value.match(REGEX.EMAIL)) {
        notifyToast("Enter correct email address", "error", "bottom-right")
        return false
      } return true;
    } catch (er) { console.log(er); };
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault()
    if (!state.name || !state.email || !state.mobile || !state.issue || !state.category) {
      return notifyToast("Please fill mandatory fields", "error", "bottom-right");
    } else if (!validateEmail(state.email)) {
      return
    } else {
      let { status, message } = await FORMDATA(PUBLIC.ADD_CONTACT_US, state);
      if (status === 0) {
        return notifyToast(message, 'error', "bottom-right", 2500)
      }
      setState(defaultObj);
      setImg({});
      return notifyToast(message, 'success', "bottom-right", 2500)
    }
  }

  return (
    <>
      <Helmet>
        <title>{ContactUsMeta.title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="Featuredescription" content={ContactUsMeta.description} />
        <meta name="keyword" content={ContactUsMeta.keywords} />
      </Helmet>
      <Container fluid style={{ backgroundImage: `url(https://d3t5gz5ttp8loj.cloudfront.net/web-pages/contactus/Pickzon_contactus_bg.png)`, backgroundSize: "cover" }}>
        <Grid centered style={{ margin: "0", backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          <Grid.Row >
            <Grid.Column mobile={16} tablet={16} computer={10} widescreen={8} largeScreen={8}>
              <Header as='h1' icon className="contact-top-title">
                Contact us
                <Header.Subheader style={{ padding: "0 2rem" }} className="contact-top-title-2">
                  You can always count on us for assistance. If you have questions or concerns, please don't hesitate to reach out to us. Just fill out the form below and our team will get back to you shortly.
                </Header.Subheader>
              </Header>
              <Form onSubmit={onHandleSubmit} className="onmobileview">
                <Form.Group widths='equal'>
                  <Form.Input
                    fluid
                    name='name'
                    label='Name*'
                    placeholder='Type your full name'
                    value={state.name}
                    onChange={(e, data) => onHandleChange(e, data)}
                  />
                  <Form.Input
                    fluid
                    name='email'
                    label='E-mail*'
                    placeholder='Type your e-mail address'
                    value={state.email}
                    onChange={(e, data) => onHandleChange(e, data)}
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input
                    fluid
                    name='mobile'
                    label='Phone No.*'
                    placeholder='Type your Phone no.'
                    value={state.mobile}
                    onChange={(e, data) => onHandleChange(e, data)}
                  />
                  <Form.Field
                    control={Select}
                    options={option}
                    name='category'
                    label='Subject*'
                    placeholder='Select issue type'
                    onChange={(e, data) => { setState((prev) => ({ ...prev, ['category']: data.value })) }}
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.TextArea
                    label='Your Issue/Query*'
                    name="issue"
                    value={state.issue}
                    placeholder='Write your issue/query'
                    onChange={(e, data) => onHandleChange(e, data)}
                  />
                </Form.Group>
                <Form.Group style={{ padding: "0 0.5rem" }}>
                  <Segment
                    style={{ width: "100%", height: "300px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}
                    textAlign="center" >
                    {img.image ?
                      <>
                        <Segment style={{ width: "auto", height: "100%" }} onClick={onHandleRemove} >
                          <Label as="a" corner >
                            <Icon name="close" />
                          </Label>
                          <Image style={{ width: "auto", height: "100%" }} src={img.image} alt={img.alt} centered />
                        </Segment>
                      </>
                      : <Header
                        icon
                        color="grey"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          document.getElementById("Uploadbtn").click();
                        }}
                      >
                        <Icon name="images outline" />
                        Add Screenshot
                      </Header>
                    }
                  </Segment>
                  <input
                    style={{ display: "none" }}
                    id="Uploadbtn"
                    type="file"
                    accept="image/jpg,image/png,image/jpeg,image/jfif"
                    onChange={uploadImageHandle}
                  />
                </Form.Group>
                <Form.Button floated='right' primary type='submit' size='large'>Submit</Form.Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>)
}

export default ContactUs;