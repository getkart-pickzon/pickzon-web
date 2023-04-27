import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Grid, Icon, Image, Button, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FeatureMeta } from "../../../../../utils/meta";
import NavigationPaths from "../../../../../route/navigationPath";
import './style.css';
import { WEB } from "../../../../../route/apiPath";
import { GET } from "../../../../../Services";
const Features = () => {
  const [state, setState] = useState({});
  useEffect(() => {
    function callEff() {
      fetchMedia();
    }
    callEff();
  }, []);

  const fetchMedia = useCallback(async () => {
    try {
      let { status, message, payload } = await GET(`${WEB.WEB_NAME}${NavigationPaths.FEATURE}`);
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
        <title>{FeatureMeta.title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={FeatureMeta.description} />
        <meta name="keyword" content={FeatureMeta.keywords} />
      </Helmet>
      <section className="features features-gap">
        <h1 className="pagetitle"><span>One Click.</span> Many Features.</h1>
        <div className="torychat"><p className="torychat-inner">Make friends from around the world. Build new connections every day and share your memories.<span className="nomobile"> Easy Interaction and full of exciting features. Best social media app for all purposes.</span></p></div>
        <div className="torychat-pic"><Image src={state[0]?.media} alt={state[0]?.alt} size='huge' /></div>
      </section>
      <section className="connect features-gap-no" style={{ backgroundImage: `url(${state[1]?.media})` }}>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8} className="full-width">
                <div className="vector-part">
                  <Image src={state[2]?.media} alt={state[2]?.alt} size='massive' />
                </div>
              </Grid.Column>
              <Grid.Column width={8} className="text-center text-middle full-width">
                <div>
                  <h2 className="connect-title feature-font-3rem">Connect without limits with your loved ones!</h2>
                  <p className="connect-text feature-font-1rem">Show your hidden talent & Enjoy while watching other's Feeds!</p>
                  {/* <div className="button-bg" style={{ backgroundImage: `url(${state[4]?.media})` }}>
                    <Link to={NavigationPaths.EARNMONEYPAGE}>
                      <Button color="yellow" size='large' alt="Refer and Earn money" >
                        Refer and Earn</Button>
                    </Link>
                  </div> */}
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
      {/* <section className="onboard features-gapno-2">
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4} className="section-flex">
                <div className="hereto-help-outer">
                  <p className="orepass feature-font-1rem">Easy Onboarding</p>
                  <h2 className="hereto-help feature-font-4rem">Be a Smart Seller!</h2>
                  <p className="orepass feature-font-1rem">Attract the potential buyers from everywhere & sell your products without any commissions!</p>
                  <div className="button-link">
                    <Button color="yellow" size='large' ><Link to="/" style={{ color: "#fff" }}>Business Profile</Link></Button>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column width={12} className="mobile-full">
                <Image src={Assets.features.middleRight.img} size='huge' alt={Assets.features.middleRight.alt} />
              </Grid.Column>
            </Grid.Row>
          </Grid></Container>
      </section> */}
      <section className="easy-deals-feature features-gap" style={{ backgroundImage: `url(${state[3]?.media})` }}>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <div className="easy-out">
                  <div className="easy-text">
                    <h2 className="easy-deals-feature-2 feature-font-3rem">Explore Your Feeds</h2>
                    <p className="talkfreely feature-font-1rem">Pickzon provides you the ability to express yourself by sharing photos and videos on your feeds. Connect with more professionals like you and share your creative stuff with the people that add value to your life. <span className="nomobile"> and achieve all their desired goals with complete freedom to manage or modify the campaign as you like with the best results.</span></p>
                    <Link to={NavigationPaths.FEEDCONTENT} style={{ color: "#fff" }}><Button color="yellow" size='large' >Explore Feeds</Button></Link>
                    <p className="wehelp feature-font-1rem font-w7">
                      <Icon name='quote left' size='small' color="blue" />
                      Getting Bored! Just Scroll Your Feeds on Pickzon App
                      <Icon name='quote right' size='small' color="blue" />
                    </p>
                  </div>
                  <div className="easy-image"><Image src={state[6]?.media} size='huge' alt={state[6]?.alt} />
                  </div>
                  <div className="feature-last-bg"> <Image src={state[5]?.media} size='medium' alt={state[5]?.alt} /></div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
    </>
  )

}


export default Features;