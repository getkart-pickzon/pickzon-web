import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AboutUsMeta } from "../../../../../utils/meta";
import { Grid, Icon, Image, List, Divider } from "semantic-ui-react";
import { GET } from "../../../../../Services"
import { WEB } from '../../../../../route/apiPath';
import NavigationPaths from "../../../../../route/navigationPath";
import './style.css';

const AboutUs = () => {
  const [state, setState] = useState({});
  useEffect(() => {
    function callEff() {
      fetchMedia();
    }
    callEff();
  }, []);

  const fetchMedia = useCallback(async () => {
    try {
      let { status, message, payload } = await GET(`${WEB.WEB_NAME}${NavigationPaths.ABOUTUS}`);
      if (status === 0) {
        console.log(message);
      }
      setState(payload.mediaCdnUrl);
    } catch (error) {
      console.error(error);
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>{AboutUsMeta.title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={AboutUsMeta.description} />
        <meta name="keywords" content={AboutUsMeta.keywords} />
      </Helmet>
      <section className="pickzon-aboutus about-gap">
        <h1 className="title">About Us</h1>
        <p className="sub-title">Discover Content and creators based on your Interest, Bring the world together with your engaging content, express your thoughts in the Feed and let the world know how you feel.</p>
        <Grid>
          <Grid.Row>
            <Grid.Column className="about-left" width={4}>
              <h2 className="worship-count font-3rem">1.2 M</h2>
              <h6>People have joined us,</h6>
              <h6>What about you?</h6>
              <div className="angle-image">
                <Image src={state[4]?.media} alt={state[4]?.alt} size='small' />
              </div>
              <h3 className="text-2">Get the vibes & Upload your memories</h3>
            </Grid.Column>
            <Grid.Column className="about-middle" width={8}>
              <Image src={state[12]?.media} alt={state[12]?.alt} size='large' />
            </Grid.Column>
            <Grid.Column className="about-right" width={4}>
              <div className="right-one">
                <Image src={state[2]?.media} alt={state[2]?.alt} size='small' />
              </div>
              <div className="right-sec">
                <h3>Participants</h3>
                <List>
                  {
                    [state[5]?.media,
                    state[6]?.media,
                    state[7]?.media,
                    state[8]?.media,
                    state[9]?.media].map((item, i) => {
                      return (
                        <List.Item key={i}>
                          <Image src={item} alt={item} />
                        </List.Item>
                      )
                    })}
                  <List.Item><Link to="#"><strong>280k+ More</strong></Link></List.Item>
                </List>
              </div>
              <Divider inverted className="margin-custom" />
              <p className="about-rightlast">"Don't Use Social Media To Impress People; Use It To Impact People."</p>
              <h4 className="bloger-name usercenter">Dave Willis</h4>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
      <section className="teamwear-full-width" style={{ backgroundImage: `url(${state[11]?.media})` }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16} className="teamwear-full-inner">
              <div className="teamwear-full-inner1">
                <h2 className="teamwear-full-title">What makes us PickZoner's</h2>
                <p className="teamwear-full-text">Build a better tomorrow to make people successful</p>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8} className="teamwork-left1">
              <div className="teamwork-left1-inner">
                <Image src={state[14]?.media} alt={state[14]?.alt} size='small' />
                <h3>Teamwork</h3>
              </div>

            </Grid.Column>
            <Grid.Column width={8} className="teamwork-right1">
              <div className="teamwork-right1-inner">
                <Image src={state[0]?.media} alt={state[0]?.alt} size='small' />
                <h3>Succeed</h3>
              </div>

            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8} className="teamwork-left2">
              <div className="teamwork-left2-inner">
                <Image src={state[10]?.media} alt={state[10]?.alt} size='small' />
                <h3>Fulfilling Environment</h3>
              </div>
            </Grid.Column>
            <Grid.Column width={8} className="teamwork-right3">
              <div className="teamwork-right3-inner">
                <Image src={state[3]?.media} alt={state[3]?.alt} size='small' />
                <h3>Fun Environment</h3>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
      <section className="user-mailing about-gap">
        <Grid>
          <Grid.Row>
            <Grid.Column width={1} className="no-mobile-view"></Grid.Column>
            <Grid.Column width={7} className="Fantastic-posts-left">
              <div className="usermailing-inner">
                <h2 className="top-section-left">Fantastic posts are always the first choice</h2>
                <p>Don't miss out on your chance to be featured. Upload your amazing photos or videos on the app & be the first choice of everyone.</p>
                <div className="text-mail">
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={8} className="Fantastic-posts-right">
              <div className="assignearning">
                <Image src={state[1]?.media} alt={state[1]?.alt} size='large' />
                <div className="assignearning-inner">
                  <div><Image src={state[5]?.media} alt={state[5]?.alt} /></div>
                  <div><h5>Romeo liked your post</h5></div>
                  <div className="about-calender"><Icon name="bell" size='large' /></div>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
      <section className="about-clips-lastbg">
        <Grid style={{ margin: "0px" }}>
          <Grid.Row style={{ padding: "0px" }}>
            <Grid.Column>
              <Image src={state[13]?.media} alt={state[13]?.alt} className="about-clips-lastbg-inner" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
    </>
  )
}

export default AboutUs;