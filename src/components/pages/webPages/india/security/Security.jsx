import React, { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { SecurityMeta } from '../../../../../utils/meta';
import { Container, Grid, Image, Button, Card } from 'semantic-ui-react';
// import Assets from '../../../../../assets/Assets';
import { installAppBtn } from '../../../../../utils/common';
import { GET } from '../../../../../Services';
import { WEB } from '../../../../../route/apiPath';
import NavigationPaths from '../../../../../route/navigationPath';
import "./style.css";

const Security = () => {
  const [state, setState] = useState({});
  useEffect(() => {
    function callEff() {
      fetchMedia();
    }
    callEff();
  }, []);

  const fetchMedia = useCallback(async () => {
    try {
      let { status, message, payload } = await GET(`${WEB.WEB_NAME}${NavigationPaths.SECURITY}`);
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
        <title>{SecurityMeta.title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={SecurityMeta.description} />
        <meta name="keywords" content={SecurityMeta.keywords} />
      </Helmet>
      <section className='protect-data' style={{ backgroundImage: `url(${state[20]?.media})` }} >
        <Container>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column className='width-full'>
                <div className="security-outer">
                  <div className="security-inner">
                    <h1 className='security-title'>Secure your data with powerful access</h1>
                    <p>We appreciate your confidence in entrusting us with your personal information, so we assemble every effort to protect it through legally permissible measures.
                    </p>
                    <div className='securityapp'>
                      <a href='https://play.google.com/store/apps/details?id=com.chat.pickzon' target="_blank">
                        <Image src={state[8]?.media} alt={state[8]?.alt} /></a>
                      <a href='https://apps.apple.com/in/app/pickzon/id1560097730' target="_blank">
                        <Image src={state[9]?.media} alt={state[9]?.alt} /></a>
                    </div>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column className='width-full-2 '>
                <Image src={state[7]?.media} alt={state[7]?.alt} size='big' />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
      <section className='safer' style={{ backgroundImage: `url(${state[21]?.media})` }}>
        <Container>
          <div className='safer-title'>
            <h3>Community Safety</h3>
            <p>
              <span className='desktop-show'>If you choose to use our Service,  you agree to the collection & use of information about this policy. The Personal Information of the user that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</span>
              <span className='mobile-show'>The Personal Information of the user that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</span>
            </p>
          </div>
        </Container>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={1} className='emptyarea'></Grid.Column>
              <Grid.Column width={7} className='security-left'>
                <Image src={state[10]?.media} alt={state[10]?.alt} size='large' />
              </Grid.Column>
              <Grid.Column width={7} className='security-right'>
                <Image src={state[11]?.media} alt={state[11]?.alt} size='large' verticalAlign='middle' />
              </Grid.Column>
              <Grid.Column width={1} className='emptyarea'></Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
      <section className='chating-area' style={{ backgroundImage: `url(${state[22]?.media})` }}>
        <Container>
          <div className='reach-top-outer'>
            <Image src={state[12]?.media} alt={state[12]?.alt} />
          </div>
        </Container>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4} className='reachLeft'>
                <Image src={state[13]?.media} alt={state[13]?.alt} size='large' />
              </Grid.Column>
              <Grid.Column width={7} className='Protect-area-out'>
                <div className='Protect-area'>
                  <h3>Users Satisfaction is Our Priority</h3>
                </div>
                <p className='Protect-area-text'>Our safety and security teams are always on alert. We're committed to protecting your privacy, so feel free to contact us if you have any questions or concerns about your personal information.</p>

                <div className='button-area'>
                  <Button primary onClick={() => installAppBtn()}>Get Started</Button>
                </div>
              </Grid.Column>
              <Grid.Column width={5} className='reachRight'>
                <div className='Protect-area-3'>
                  <Image src={state[14]?.media} alt={state[14]?.alt} size='large' />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
      <section className='three-section'>
        <Container>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column>
                <div className='Authentication'>
                  <Card className='card-bg-1'>
                    <div className='imgarea'>
                      <Image src={state[15]?.media} alt={state[15]?.alt} />
                    </div>
                    <Card.Content>
                      <Card.Header>Secure User Authentication</Card.Header>
                      <Card.Description>
                        <span className='desktop-show'>Secure user authentication is your barrier to entry and helps establish accountability for users.</span>
                        <span className='mobile-show'>Secure user authentication is your barrier to entry and helps establish accountability.</span>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className='Authentication'>
                  <Card className='card-bg-2'>
                    <div className='imgarea'>
                      <Image src={state[16]?.media} alt={state[16]?.alt} />
                    </div>
                    <Card.Content>
                      <Card.Header>Safeguard user sessions</Card.Header>
                      <Card.Description>
                        <span className='desktop-show'>
                          Protect the privacy of your users with our advanced security features that ensure a secure and safe browsing experience.</span>
                        <span className='mobile-show'>
                          Protect the privacy of users with our advanced security features.</span>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className='Authentication'>
                  <Card className='card-bg-3'>
                    <div className='imgarea'>
                      <Image src={state[17]?.media} alt={state[17]?.alt} /></div>
                    <Card.Content>
                      <Card.Header>Data Encryption</Card.Header>
                      <Card.Description><span className='desktop-show'>
                        It is the process of scrambling data in an attempt to prevent it from being accessed or altered without authorization.</span>
                        <span className='mobile-show'>
                          It is the process of scrambling data to prevent access or alteration without authorization.</span>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
      <section className='usertalk-outer' style={{ backgroundImage: `url(${state[18]?.media})` }}>
        <Container style={{ padding: "50px 0px" }}>
          <div className='spinny-set' style={{ position: "relative" }}>
            <Image src={state[19]?.media} alt={state[19]?.alt} />
            <div className='spinny-set' style={{ position: "absolute", top: "0px" }}>
              <div>
                <Image src={state[3]?.media} alt={state[3]?.alt} className="spinny-set_img" />
              </div>
              <div className='spin-item_1' style={{ animationDelay: "-2.5s" }}>
                <Image src={state[0]?.media} alt={state[0]?.alt} className="spin-item_1_img" />
              </div>
              <div className='spin-item_1' style={{ animationDelay: "-9s" }}>
                <Image src={state[6]?.media} alt={state[6]?.alt} className="spin-item_1_img" />
              </div>
              <div className='spin-item_1' style={{ animationDelay: "-16s" }}>
                <Image src={state[2]?.media} alt={state[2]?.alt} className="spin-item_1_img" />
              </div>
              <div className='spin-item_2' style={{ animationDelay: "-4.5s" }} >
                <Image src={state[1]?.media} alt={state[1]?.alt} className="spin-item_2_img" />
              </div>
              <div className='spin-item_2' style={{ animationDelay: "-11s" }} >
                <Image src={state[4]?.media} alt={state[4]?.alt} className="spin-item_2_img" />
              </div>
              <div className='spin-item_2' style={{ animationDelay: "-18s" }} >
                <Image src={state[5]?.media} alt={state[5]?.alt} className="spin-item_2_img" />
              </div>
            </div>
          </div>
        </Container>
      </section>

    </>

  )

}

export default Security