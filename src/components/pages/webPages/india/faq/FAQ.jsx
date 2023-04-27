import React, { useEffect, useState, useCallback } from "react";
import { Container, Image, Grid, Accordion, List } from 'semantic-ui-react'
import NormalSlider from "../../../../sub-component/sliders/normalSlider/NormalSlider";
import { FAQMeta } from "../../../../../utils/meta";
import { Helmet } from "react-helmet";
import { FaqCom } from "./common";
import { GET } from "../../../../../Services";
import { WEB } from "../../../../../route/apiPath";
import NavigationPaths from "../../../../../route/navigationPath";
import "./style.css"

const FAQ = () => {
  const [state, setState] = useState({});
  useEffect(() => {
    function callEff() {
      fetchMedia();
    }
    callEff();
  }, []);

  const fetchMedia = useCallback(async () => {
    try {
      let { status, message, payload } = await GET(`${WEB.WEB_NAME}${NavigationPaths.FAQ}`);
      if (status === 0) {
        console.log(message);
      }
      setState(payload.mediaCdnUrl);
    } catch (error) {
      console.error(error);
    }
  }, [])

  const faqAccordion =
    [
      {
        title: FaqCom.head1,
        content: {
          content: (
            <>
              <p>{FaqCom.pra1}</p>
              {Object.keys(FaqCom?.content).map((keyName, i) => (
                <List bulleted style={{ paddingLeft: "15px" }} key={i}>
                  <List.Item>{FaqCom?.content[keyName]}</List.Item>
                </List>
              ))}
              <p>{FaqCom.pra1_1}</p>

            </>
          ),
        }
      },
      {
        title: FaqCom.head2,
        content: {
          content: (
            <p>{FaqCom?.pra2}</p>
          )
        }
      },
      {
        title: FaqCom.head3,
        content: {
          content: (
            <p>{FaqCom?.pra3}</p>
          ),
        }
      },
      {
        title: FaqCom.head4,
        content: {
          content: (
            <>
              <p>{FaqCom?.pra4}</p>
            </>
          ),
        }
      },
      // {
      //   title: FaqCom.head5,
      //   content: {
      //     content: (
      //       <>
      //         <p>{FaqCom?.pra5}</p>
      //         <List bulleted>
      //           <List.Item>
      //             {FaqCom?.content5?.list1}
      //             <strong>{FaqCom?.content5?.list1_b}</strong>
      //             {FaqCom?.content5?.list1_2}
      //           </List.Item>
      //           <List.Item>
      //             {FaqCom?.content5?.list2}
      //             <strong> {FaqCom?.content5?.list2_b}</strong>
      //           </List.Item>
      //           <List.Item>{FaqCom?.content5?.list3}</List.Item>
      //           <List.Item>
      //             {FaqCom?.content5?.list4}
      //             <strong>{FaqCom?.content5?.list4_b}</strong>
      //             {FaqCom?.content5?.list4_2}
      //           </List.Item>
      //           <List.Item>{FaqCom?.content5?.list5}</List.Item>
      //         </List>
      //       </>
      //     ),
      //   }
      // },

      // {
      //   title: FaqCom.head6,
      //   content: {
      //     content: (
      //       <p><strong>{FaqCom?.pra6}</strong>{FaqCom?.pra6_1}</p>
      //     ),
      //   }
      // },
    ]
  let servicesSection =
    [
      {
        key: '0',
        img: state[1]?.media,
        alt: state[1]?.alt,
        heading: "Grow your Network",
        text: "Make connections with your Friends & Family.",
        background: "#fff",
        fontColor: " #333"
      },
      {
        key: '1',
        img: state[2]?.media,
        alt: state[2]?.alt,
        heading: "Career Growth",
        text: "Build your Professional community and grow in your Career.",
        background: "#fff",
        fontColor: " #333"
      },
      {
        key: '2',
        img: state[9]?.media,
        alt: state[9]?.alt,
        heading: "Verified Users",
        text: "Get your account verified & receive a growth tick on your profile",
        background: "#fff",
        fontColor: "#333"
      }
    ];


  let faqSlide = servicesSection.map((item, i) => {
    return (
      <div key={i} style={{ display: "flex", margin: "1rem 2rem", background: item.background, color: item.fontColor }} className="faq-pickzon-outer">
        <div className='faq-left-text'>
          <>
            <Image src={item.img} alt={item.alt} />
            <h3>{item.heading}</h3>
            <p>{item.text}</p>
          </>
        </div>
      </div>
    )
  })

  return (
    <>
      <Helmet>
        <title>{FAQMeta.title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={FAQMeta.description} />
        <meta name="keyword" content={FAQMeta.keywords} />
      </Helmet>
      <section className="section-top1">
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={8} computer={8} largeScreen={8} widescreen={8} className="faqsec1 sec1left">
                <h1 className="faqpagetitle">How can we help?</h1>
                <div className="inpit-outer">
                </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={8} largeScreen={8} widescreen={8} className="faqsec1 sec1right">
                <div className="topright-image">
                  <Image src={state[0]?.media} alt={state[0]?.alt} size='big' />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
      <section className="Faq-slider">
        <Container>
          <NormalSlider
            centerMode={false}
            centerPadding={"0px"}
            element={faqSlide}
            slidesShow={3}
            scrollShow={1}
            autoplay={true}
            slideShow1024={2}
            slideShow768={2}
            slideShow520={1}
            slideShow480={1}
            btnClr="white"
          />
        </Container>
      </section>
      <section className="faq-Frequently-outer" style={{ background: `#007bff url(${state[11]?.media})` }}>
        <Container>
          <Grid>
            <Grid.Column mobile={16} tablet={2} computer={2} largeScreen={2} widescreen={2} className="faq-Frequently-inner">
              <Image src={state[10]?.media} alt={state[10]?.alt} size='tiny' />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={14} computer={14} largeScreen={14} widescreen={14} className="faq-Frequently-inner-right">
              <div className="faq-Frequently">
                <h3>{FaqCom?.Frequently}</h3>
                <p>{FaqCom?.Frequently2}</p>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </section>
      <section className="faqAccordion">
        <Container>
          <Accordion defaultActiveIndex={0} panels={faqAccordion} />
        </Container>
      </section>
      <section className="section-last">
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={8} computer={8} largeScreen={8} widescreen={8} className="faqsec1 sec3left">
                <div className="download-link-outer">
                  <h2 className="download-link">Download the PickZon app, & manage your account!</h2>
                  <div className="flexarea">
                    <Image src={state[5]?.media} alt={state[5]?.alt} size='small' href="https://play.google.com/store/apps/details?id=com.chat.pickzon" target="blank" />
                    <Image src={state[6]?.media} alt={state[6]?.alt} size='small' href="https://apps.apple.com/in/app/pickzon/id1560097730" target="_blank" />
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={8} largeScreen={8} widescreen={8} style={{ display: "flex", justifyContent: "center" }}>
                <div className="topright-image">
                  <Image src={state[7]?.media} alt={state[7]?.alt} size='medium' style={{ marginLeft: "2rem" }} />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
    </>
  )
}
export default React.memo(FAQ);