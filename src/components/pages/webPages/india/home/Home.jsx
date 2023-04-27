import React, { useState, useEffect, useCallback } from "react";
import { Icon, Grid, Container, Progress } from "semantic-ui-react";
import CardDetails from "./component/CardDetails";
import MarketAnaliysis from "./component/MarketAnaliysis";
import { Helmet } from "react-helmet";
import { HomeMeta } from "../../../../../utils/meta";
import { GET } from "../../../../../Services"
import { WEB } from '../../../../../route/apiPath';
import { useLocation } from "react-router-dom";
import NavigationPaths from "../../../../../route/navigationPath";



import "./style.css"

const NewHome = () => {
  let location = useLocation()
  const [state, setState] = useState({});
  useEffect(() => {
    function callEff() {
      fetchMedia();
    }
    callEff();
  }, []);

  const fetchMedia = useCallback(async () => {
    try {
      let { status, message, payload } = await GET(`${WEB.WEB_NAME}${location.pathname === NavigationPaths.HOME ? "/home" : null}`);
      if (status === 0) {
        console.log(message);
      }
      setState(payload.mediaCdnUrl);
      // console.log(">>>>>>", payload)
    } catch (error) {
      console.error(error);
    }
  }, [])
  return (
    <>
      <Helmet>
        <title>{HomeMeta.title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={HomeMeta.description} />
        <meta name="keywords" content={HomeMeta.keywords} />
      </Helmet>
      <div>
        <section id="top-home1" className="sec-1">
          <Container>
            <Grid divided='vertically'>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <div className="top-left-slider">
                    <div className="top-left-slider-inner">
                      <div className="slide-1 hover-effect">
                        <h1 title="Social Space">
                          <span id="dribble"></span>
                        </h1>
                      </div>
                      <div className="slide-1-1 leftslide"><p>A great tool to build powerful communities across the globe and interact with your audience.  Influencers and creators can increase their community, engage with their audience, Share beautiful moments with Fans.</p></div>
                      <div className="app-link slideleft1">
                        <div className="app-store-1">
                          <a href="https://apps.apple.com/in/app/pickzon/id1560097730" target="_blank" rel="noreferrer noopener">
                            <img src={state[1]?.media} alt={state[1]?.alt} />
                          </a></div>
                        <div className="app-store-2">
                          <a href="https://play.google.com/store/apps/details?id=com.chat.pickzon" target="_blank" rel="noreferrer noopener">
                            <img src={state[2]?.media} alt={state[2]?.alt} />
                          </a></div>
                      </div>
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column className="slidetop">
                  {/* <img src={state[0]?.media} alt={state[0]?.alt} /> */}
                  <img src={state[0]?.media} alt={state[0]?.alt} />
                  {/* <img src={topbanner1} alt={state[0]?.alt} /> */}

                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </section>
        <Container id="counter" className="m-40">
          <Grid>
            <Grid.Row columns={4}>
              <Grid.Column className="user-counter leftslide">
                <h1>Users</h1>
                <h4>Engagement</h4>
              </Grid.Column>
              <Grid.Column>
                <div className="home-user slideRight">
                  <h4>Active</h4>
                  <h3>350k+</h3>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="homeclips slideRight">
                  <h4>Downloads</h4>
                  <h3>1M+</h3>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="post slideRight">
                  <h4>Posts</h4>
                  <h3>5M+</h3>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <section className="newhome processbar">
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column className="mobile-center">
                {/* <img src={Assets.home.socialTopLeft.img} alt={Assets.home.socialTopLeft.alt} className="desktop-left-none" /> */}
                {/* <img src={state[13]?.media} alt={state[13]?.alt} className="desktop-left-none" /> */}
                <img src={state[16]?.media} alt={state[13]?.alt} className="desktop-left-none" />

              </Grid.Column>
              <Grid.Column className="label-left text-middle" style={{ display: "flex" }}>
                <div className="middle-part">
                  <h2 className="font-40">Know the Absolute Worth!</h2>
                  <Grid.Row columns={1} className="m-top-40 blue">
                    <Progress percent={91} progress>
                      Digital Marketplace
                    </Progress>
                  </Grid.Row>
                  <Grid.Row columns={1} className="m-top-40 narngi">
                    <Progress percent={92} progress>
                      Engagements
                    </Progress>
                  </Grid.Row>
                  <Grid.Row columns={1} className="m-top-40 bluedark">
                    <Progress percent={90} progress>
                      Digital Earners
                    </Progress>
                  </Grid.Row>
                  <h3 className="font-40 mt-70">
                    <Icon name='quote left' size='small' color="blue" />
                    Build your strong Digital & Social presence.
                    <Icon name='quote right' size='small' color="blue" />
                  </h3>
                </div>
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </section>
        <section className="newhome pickzon-homepost">
          <CardDetails
            arr={[
              state[4],
              state[8],
              state[5],
              state[9],
              state[6],
              state[10],
              state[7],
              state[11],
            ]}
          />
        </section>
        <section className="newhome market-analysis">
          <MarketAnaliysis
            item={state[14]}
          />
        </section>
      </div>
    </>
  )
}
export default NewHome;