import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Grid, Icon, Image, List, Divider, Button, Input, Container, Feed, Card, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import FeaturePart from "./component/featurePart";
import { FeedMeta } from "../../../../../utils/meta";
import './style.css';
import NavigationPaths from "../../../../../route/navigationPath";
import { WEB } from "../../../../../route/apiPath";
import { GET } from "../../../../../Services";

const FeedContent = () => {
  const [state, setState] = useState({ item: [], arr: [], bg: "" })
  useEffect(() => {
    function callEff() {
      fetchMedia();
    }
    callEff();
  }, []);

  const fetchMedia = useCallback(async () => {
    try {
      let { status, message, payload } = await GET(`${WEB.WEB_NAME}${NavigationPaths.FEEDCONTENT}`);
      if (status === 0) {
        console.log(message);
      }
      setState((pre) => ({
        ...pre,
        item: payload.mediaCdnUrl,
        arr: payload.mediaCdnUrl.slice(1, 6),
        bg: payload.mediaCdnUrl[0].media
      }))
    } catch (error) {
      console.error(error);
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>{FeedMeta.title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={FeedMeta.description} />
        <meta name="keyword" content={FeedMeta.keywords} />
      </Helmet>
      <section className="Feeds-1 inmedia Feeds-gap" style={{ backgroundImage: `url(${state?.bg})` }}>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={7} className="feed-secleft" >
                <div className="feed-secleft-inner">
                  <h1 className="feed-title feed-font-4rem weight-700">Make Endless Contacts on Social Media!</h1>
                  <p className="feed-font-2rem mb-2rem">Make thousands of friends on Pickzon. The Best Social Networking Platform that lets you connect with people around the world.</p>
                  <Link to="/" target="_blank">
                    <button className="ui right labeled icon button violet">
                      <i className="right arrow icon"></i>
                      Get Started
                    </button>
                  </Link>
                  <List className="feeduserlist">

                    {state?.arr.map((item, i) => {
                      return (
                        <List.Item key={i}>
                          <Image src={item.media} alt={item.alt} />
                        </List.Item>
                      )
                    })}
                    <List.Item>20k+</List.Item>
                  </List>
                  <p className="width-80 feed-font-2rem pr-5 mb-2rem">1.2M+ People have joined the PickZon App. Don’t Wait. Join us Today!</p>
                </div>
              </Grid.Column>
              <Grid.Column width={9} className="feed-secright">
                <Image src={state.item[6]?.media} alt={state.item[6]?.alt} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
      <section className="what-matters Feeds-gap-no">
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8} className="what-matters-left">
                {/* <Image src={Assets.feeds.sectionLeft.img} alt={Assets.feeds.rightFeed1.alt} size='big' /> */}
                <Image src={state.item[7]?.media} alt={state.item[7]?.alt} size='big' />
              </Grid.Column>
              <Grid.Column width={8} className="what-matters-right">
                <div className="text-mobile-center">
                  <h2 className="matters-title feed-font-5rem">Focus On</h2>
                  <h3 className="matters-title2 feed-font-5rem weight-500">What Matters</h3>
                  <p className="kara mt-3rem mb-3rem">PickZon is a social networking app that helps influencers & creators to create an engaging community.</p>
                  <div className="emailsection">
                    {/* <Link to={NavigationPaths.HOME} target="_blank">
                      <button className="ui right labeled icon button violet">
                        <i className="right arrow icon"></i>
                        Get started
                      </button>
                    </Link> */}
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
      <section className="custom-divider">
        <Container> <Divider /></Container>
      </section>
      <section className="social-media-section">
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={6} className="leftfeedarea">
                <div className="benefits-outer">
                  <h2 className="benefits feed-font-3rem weight-7 m-0">Social Media</h2>
                  <h3 className="feed-font-2_5rem weight-5 m-0">Engagement</h3>
                  <div className="consectetur feed-font-1_2rem">
                    <p>Pickzon allows you to socialize with friends.</p>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column width={10} className="rightfeedarea">
                <Feed>
                  <Feed.Event>
                    <Feed.Label>
                      <Image src={state.item[8]?.media} alt={state.item[8]?.alt} />
                    </Feed.Label>
                    <Feed.Content>
                      <Feed.Summary>
                        <div className="feed-title">Share Interests</div>
                        <Feed.Date>Pickzon is for people who love to share interests with friends. Similarly, for brands.</Feed.Date>
                        <div>
                          <Button className="radius-50 buttonbg1">Family & Friends</Button>
                          <Button className="radius-50 buttonbg2">Neighbours</Button>
                        </div>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
                <Feed>
                  <Feed.Event>
                    <Feed.Label >
                      <Image src={state.item[9]?.media} alt={state.item[9]?.alt} />
                    </Feed.Label>
                    <Feed.Content>
                      <Feed.Summary>
                        <div className="feed-title">Commendations</div>
                        <Feed.Date>Social media engagement tool that allows users to interact on their social media accounts.</Feed.Date>
                        <div>
                          <Button className="radius-50 buttonbg3">Like</Button>
                          <Button color='yellow' className="radius-50 buttonbg4">Comment</Button>
                          <Button className="radius-50 buttonbg5">Share</Button>
                        </div>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
                <Feed>
                  <Feed.Event>
                    <Feed.Label>
                      <Image src={state.item[10]?.media} alt={state.item[10]?.alt} />
                    </Feed.Label>
                    <Feed.Content>
                      <Feed.Summary>
                        <div className="feed-title">Tag People</div>
                        <Feed.Date>Share moments with friends, family, and friends by tagging them on the social media app.</Feed.Date>
                        <div>
                          <Button color='orange' className="radius-50 buttonbg6">Capture & Edit</Button>
                          <Button className="radius-50 buttonbg7">Tag</Button>
                        </div>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>

              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
      <section className="our-services Feeds-gap">
        <Container className="section-title">
          <p className="title1">Our Features</p>
          <h3 className="title2">Fun & Beneficial Factors</h3>
        </Container>
        <FeaturePart
          arr={[
            state.item[11],
            state.item[12],
            state.item[13],
            state.item[14],
            state.item[15],
            state.item[16],
            state.item[17],
            state.item[18],
            state.item[19],
            state.item[20],
            state.item[21],
            state.item[22]
          ]}
        />
      </section>
      <section className="BestShort-left-outer">
        <Grid>
          <Grid.Row>
            <Grid.Column width={7} className="BestShort-left">
              <div className="inner">
                <h2 className="BestShort-left-title feed-font-3rem">Increase Engagement</h2>
                <h2 className="BestShort-left-title2 feed-font-3rem m0 weight-50">& Commendations</h2>
                <div className="add-submit">
                </div>
                <div className="Pickzon-allows-outer">
                  <h2 className="feed-font-10rem x10">10x</h2>
                  <p className="Pickzon-allows feed-font-1_5rem">Pickzon allows you to engage with your community with 10x better experience with Pickzon Feeds, get commendations from the audience.</p>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={9} className="BestShort-right">
              <Image src={state.item[23]?.media} size='big' alt={state.item[23]?.alt} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
    </>
  )
}
export default FeedContent;