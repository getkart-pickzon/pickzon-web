import React from "react";
import { Helmet } from "react-helmet";
import { Grid, Button, Container, Image, Icon, Card } from "semantic-ui-react";
import { EarnMoneyMeta } from "../../../../../utils/meta";
import Assets from "../../../../../assets/Assets";
import './style.css'

const EarnMoney = () => {
  return (
    <>
      <section className='earnMoney-outer'
        style={{ backgroundImage: `url(${Assets.EarnMoney.bgfirst.img})` }}
      >
        <Helmet>
          <title>{EarnMoneyMeta.title}</title>
          <link rel="canonical" href={window.location.href} />
          <meta name="description" content={EarnMoneyMeta.description} />
          <meta name="keywords" content={EarnMoneyMeta.keywords} />
        </Helmet>
        <Grid style={{ marginLeft: "0", marginRight: "0" }}>
          <Grid.Row>
            <Grid.Column width={6} className='earnLeftSide'>
              <div className="earnMoney-left">
                <div>
                  <h1 className="EarnMoney-title">Refer <span>& Earn</span></h1>
                  <p>Earn money by referring your loved ones to the app!</p>
                  <Button primary>Know More <Icon name='angle right' /></Button>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={10} className='earnRightSide'>
              <Image src={Assets.EarnMoney.referRight.img} alt={Assets.EarnMoney.referRight.alt} size='huge' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
      <section className="InviteEarn" style={{ backgroundImage: `url(${Assets.EarnMoney.bgsec.img})` }}>
        <Container>
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column>
                <div className="invite-outer">
                  <h2 className="invite-1">Invite & Win</h2>
                  <p className="invite-text-1">Send the invitation to your friends or family and</p>
                  <h2 className="invite-2">Earn up to 1000 points <span>on each referral</span></h2>
                  <p className="invite-text-2">Enjoy earning with your loved ones!</p>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
      <section className="card-earnmoeny" style={{ backgroundImage: `url(${Assets.EarnMoney.bgthird.img})` }}>
        <Container>
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column> <Card.Group itemsPerRow={3}>
                <Card
                  image={Assets.EarnMoney.friend1.img}
                  alt={Assets.EarnMoney.friend1.alt}
                  link='#'
                  header='Invite Friends'
                  description={[
                    'Select Refer & Earn and click the “Share” button',
                  ].join('')}
                />
                <Card
                  image={Assets.EarnMoney.friend2.img}
                  alt={Assets.EarnMoney.friend2.alt}
                  link='#'
                  header='Signup'
                  description={[
                    'Tell your friends to use the code to sign up & get Rs. 50 instantly.',
                  ].join('')}
                />
                <Card
                  image={Assets.EarnMoney.friend3.img}
                  alt={Assets.EarnMoney.friend3.alt}
                  link='#'
                  header='Earn More'
                  description={[
                    "You'll receive the money after successfully signing up",
                  ].join('')}
                />
              </Card.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
      <section className="refer-win" style={{ backgroundImage: `url(${Assets.EarnMoney.lastbg.img})` }}>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={3} className="earnmoney-left-part">
                <div className="refer-win-left">
                  <div>
                    <Image src={Assets.EarnMoney.sectionleft.img} alt={Assets.EarnMoney.sectionleft.alt} size='small' />
                    <h2 className="refer-win-title">Refer more</h2>
                    <p className="refer-win-text">More users you refer will lead you to earn more money.</p>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column width={10} className="earnmoney-center-part">
                <Image src={Assets.EarnMoney.centerImage.img} alt={Assets.EarnMoney.centerImage.alt} size='massive' />
                <div className="morebutton">
                  <Button primary>Terms & Conditions<Icon name='angle right' /></Button>
                </div>
              </Grid.Column>
              <Grid.Column width={3} className="earnmoney-right-part">
                <div className="refer-win-right">
                  <div>
                    <Image src={Assets.EarnMoney.sectionright.img} alt={Assets.EarnMoney.sectionright.alt} size='small' />
                    <h2 className="refer-win-title-right">No limit to referral</h2>
                    <p className="refer-win-text-right">The more you refer, the more you earn. The Referral has no limit.</p>
                  </div>

                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
    </>
  );
}
export default EarnMoney;
