import React, { useCallback, useEffect, useState } from 'react'
import { Container, Card, Image, Button, Grid, List, Feed, Item } from 'semantic-ui-react'
import NormalSlider from '../../../../sub-component/sliders/normalSlider/NormalSlider'
import { Helmet } from 'react-helmet';
import { WhyPickzonMeta } from '../../../../../utils/meta';
// import Assets from '../../../../../assets/Assets';
import { Link } from 'react-router-dom';
import { installAppBtn } from '../../../../../utils/common';
import { GET } from '../../../../../Services';
import { WEB } from '../../../../../route/apiPath';
import NavigationPaths from '../../../../../route/navigationPath';
import "./style.css"

const WhyPickzon = () => {
  const [state, setState] = useState({});
  useEffect(() => {
    function callEff() {
      fetchMedia();
    }
    callEff();
  }, []);

  const fetchMedia = useCallback(async () => {
    try {
      let { status, message, payload } = await GET(`${WEB.WEB_NAME}${NavigationPaths.WHYPICKZONE}`);
      if (status === 0) {
        console.log(message);
      }
      setState(payload.mediaCdnUrl);
      // console.log(">>>>>>>>>>>",payload)
    } catch (error) {
      console.error(error);
    }
  }, [])

  const whyuserlist =
    [
      {
        key: '0',
        img: state[0]?.media,
        alt: state[0]?.alt
      },
      {
        key: '1',
        img: state[1]?.media,
        alt: state[1]?.alt
      },
      {
        key: '2',
        img: state[2]?.media,
        alt: state[2]?.alt
      }
    ];

  const whypickbox =
    [
      // {
      //   key: '0',
      //   img: state[4]?.media,
      //   heading: "Refer & Earn Money",
      //   discr: "Share your referral code with your contacts and earn up to 100 coins on each referral. Redeem coins as real Cash.",
      //   alt: state[4]?.alt
      // },
      {
        key: '1',
        img: state[5]?.media,
        heading: "Verified Users",
        discr: "Get your account verified and receive a green tick on your profile. Become a verified user that invigorates authenticity.",
        alt: state[5]?.alt
      },
      {
        key: '2',
        img: state[6]?.media,
        heading: "Chat",
        discr: "Chat with your friends & family across the globe and share updates with them without any messaging charges.",
        alt: state[6]?.alt
      },
      {
        key: '3',
        img: state[20]?.media,
        heading: "Spread Connections",
        discr: 'Stay connected and make new connections by sharing the app with your loved ones.',
        alt: state[20]?.alt
      },

    ];
  let servicesSection =
    [
      {
        img: state[8]?.media,
        alt: state[8]?.alt,
        heading: "Explore Feeds",
        text: "Upload your elegant Photos & Videos in the feed section, or create impressive stories and share them with your connections.",
        background: "linear-gradient(360deg, #3d2858 0%, #62369c 90%)",
        fontColor: " #fff",
        width: '70px',
        padd: '10px',
        path: NavigationPaths.HOME
      },
      {
        img: state[9]?.media,
        alt: state[9]?.alt,
        heading: "Create Profile",
        text: "Create your professional profile on pickzon and let others reach out to you by looking at your stunning profile.",
        background: "linear-gradient(360deg, #102cce 0%, #234bf2 90%)",
        fontColor: " #fff",
        width: '70px',
        padd: '10px',
        path: NavigationPaths.HOME
      },
      {
        img: state[10]?.media,
        alt: state[10]?.alt,
        heading: "Make Connections",
        text: "We have diverse users from across the globe. Find new friends and make professional connections.",
        background: "linear-gradient(360deg, #5b2ef8 0%, #a388ff 90%)",
        fontColor: " #fff",
        width: '70px',
        padd: '10px',
        path: NavigationPaths.HOME

      },
      {
        img: state[11]?.media,
        alt: state[11]?.alt,
        heading: "Create Pages",
        text: "Create Personalized pages & let others join your community. Post regular content, also promote your business.",
        background: "linear-gradient(360deg, #9d3e29 0%, #ff7c69 90%)",
        fontColor: " #fff",
        width: '70px',
        padd: '0px',
        path: NavigationPaths.HOME

      },
    ];

  const workflowlist = [
    {
      color: '#342ef9',
      title: "Create Profile",
      text: "Make an appealing profile to get followers",
    },
    {
      color: "#ffb937",
      title: "Stay Connected",
      text: "Keep in touch with your loved ones.",
    },
    {
      color: "#ed6567",
      title: "Become Verified User",
      text: "Get a green tick by verifying your Pickzon account.",
    },
    {
      color: "#fa2eec",
      title: "Create page",
      text: "Promote your business by creating page.",
    },

  ]
  let moneySlide = whypickbox.map((item) => {
    return (

      <div key={item.heading} className="whypickzon-outer">
        <div className='why-left-text-first' style={{ margin: "0 1rem", display: "flex", padding: "1rem 0" }}>
          <Card centered>
            <div className='why-cardimg'>
              <Image src={item.img} style={{ width: "60px" }} alt={item.alt} />
            </div>
            <Card.Content>
              <Card.Description>
                <div className='whybox-title'><h3>{item.heading}</h3></div>
                <div className='whybox-text'><p>{item.discr}</p></div>
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
      </div>
    )
  })

  let bootSlide = servicesSection.map((item) => {
    return (
      <div key={item.heading} style={{ display: "flex", margin: "0 8px", background: item.background, color: item.fontColor, borderRadius: "10px" }} className="whypickzon-outer">
        <div className='why-left-text'>
          <div>
            <Image src={item.img} style={{ width: `${item.width}`, padding: `${item.padd}` }} alt={item.alt} />
            <h3>{item.heading}</h3>
            <p className='height-fix'>{item.text}</p>
            <div className='mini-button'> <Button inverted style={{ borderRadius: "30px" }} as={Link} to={item.path}>Read More</Button></div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <>
      <Helmet>
        <title>{WhyPickzonMeta.title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={WhyPickzonMeta.description} />
        <meta name="keywords" content={WhyPickzonMeta.keywords} />
      </Helmet>
      <section className='whysec1' style={{ backgroundImage: `url(${state[19]?.media})` }}>
        <Container>
          <Grid>
            <Grid.Row >
              <Grid.Column className='whysec1-outer' mobile={16} tablet={8} computer={8} largeScreen={8} widescreen={8}>
                <div>
                  <h1 className='whysec1-title'>Get Connected with the<span> Social Engagement</span> App</h1>
                  <p className='whysec1-text'>PickZon has a collection of amazing features that makes it a must-to-have app. Connect with family & friends, share memories with PickZon feeds,engage Audience with commendations( Like, Share, Comment). You get all the interesting features, that you need to be an influencer or a Creator.</p>
                  <div className='whypickbutton'>
                    <Button content='Get Started' primary onClick={() => installAppBtn()} />
                    <Button content='News & Feed' basic color='purple' as={Link} to={NavigationPaths.FEEDCONTENT} />
                  </div>
                  <Item.Group>
                    <Item>
                      <div className="Trusted-whypickzon">Trusted By</div>
                      <Item.Content className='whypickzonuser-list'>
                        <Item.Description>
                          <List>
                            {whyuserlist.map((item, i) => {
                              return (
                                <List.Item key={i}>
                                  <Image src={item.img} alt={item.alt} />
                                </List.Item>
                              )
                            })}
                            <List.Item className='custom-user'>1.2M+ Users</List.Item>
                          </List>
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={8} largeScreen={8} widescreen={8} className='whysec1right'>
                <Image src={state[3]?.media} alt={state[3]?.alt} size='big' />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
      <section className='whysec2 whysecgap'>
        <Container>
          <NormalSlider
            centerMode={false}
            centerPadding={"0px"}
            element={moneySlide}
            slidesShow={3}
            scrollShow={1}
            autoplay={true}
            slideShow1024={3}
            slideShow768={2}
            slideShow520={1}
            slideShow480={1}
            btnClr="white"
            dots={false}
          />
        </Container>
      </section>
      <section className='whypickzon-service outservices' >
        <Container>
          <div className='whypickzon-service-inner'>
            <h2 className='service-inner-title1'>Our Features</h2>
            <h2 className='service-inner-title2'>We offer the Best Features</h2>
            <p className='service-inner-text'>Pickzon provides its users with a multitude of Features and lets them connect easier with the professional world.</p>
          </div>
        </Container>
        <Container>
          <NormalSlider
            centerMode={false}
            centerPadding={"0px"}
            element={bootSlide}
            slidesShow={4}
            scrollShow={1}
            autoplay={true}
            slideShow1024={3}
            slideShow768={2}
            slideShow520={1}
            slideShow480={1}
            btnClr="white"
            dots={false}
          />
        </Container>
      </section>
      <section className='middel-section whysecgap'>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4} className='middle-left-full'>
                <div className='why-left-outer'>
                  <div className='why-left1'>
                    <Image src={state[12]?.media} alt={state[12]?.alt} size='small' />
                  </div>
                  <div className='why-left2'>
                    <Image src={state[14]?.media} alt={state[14]?.alt} size='small' />
                  </div>
                  <div className='why-left3'>
                    <Image src={state[16]?.media} alt={state[16]?.alt} size='tiny' />
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column width={8} className='middle-center-full'>
                <p className='top-text'>It’s The Long Lasting Connection!</p>
                <h2 className='top-title'>Become famous with PickZon</h2>
                <p className='bottom-text'>Want to be a star or an Influencer? Use PickZon, the best social Engagement app to create Posts & get likes, followers and Comments to your account. Become an influencer & make a strong connection between you & your followers.</p>
                <div className='middle-content'>
                  <div>
                    <Link to={NavigationPaths.HOME}>
                      <Button content='Be the PickZon Star' primary />
                    </Link>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column width={4} className='middle-right-full'>
                <div className='why-right-outer'>
                  <div className='why-right1'>
                    <Image src={state[13]?.media} alt={state[13]?.alt} size='tiny' />
                  </div>
                  <div className='right-center'>
                    <Image src={state[15]?.media} alt={state[15]?.alt} size='small' />
                  </div>
                  <div><Image src={state[17]?.media} alt={state[17]?.alt} size='tiny' /></div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
      <section className='pickzonworkflow whysecgap'>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={7} computer={7} largeScreen={7} widescreen={7} className="imagecenter">
                <Image src={state[18]?.media} alt={state[18]?.alt} size='big' />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={9} computer={9} largeScreen={9} widescreen={9}>
                <div className='text-middle'><div>
                  <h3 className='pickzonworkflow-title'>PickZon Benefits</h3>
                  <Grid columns={2}>
                    {workflowlist.map((item, i) => {
                      return (<Grid.Column key={item.title} className='full-feed-mobile'>
                        <Feed>
                          <Feed.Event>
                            <Feed.Label>
                              <div className='num-left' style={{ backgroundColor: `${item.color}` }}>
                                {i + 1}
                              </div>
                            </Feed.Label>
                            <Feed.Content>
                              <Feed.Summary>
                                {item.title}
                              </Feed.Summary>
                              <Feed.Date>{item.text}</Feed.Date>
                            </Feed.Content>
                          </Feed.Event>
                        </Feed>
                      </Grid.Column>)
                    })}
                  </Grid>
                </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
    </>
  )
}
export default WhyPickzon;