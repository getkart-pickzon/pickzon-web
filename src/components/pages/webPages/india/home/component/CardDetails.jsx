import React from "react";
import { Icon, Grid, Image, Feed, Button, Card } from "semantic-ui-react";
import { Link } from 'react-router-dom'
import ".././style.css"
const CardDetails = ({ arr }) => {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={7}>
                  <Card>
                    <Card.Content className="content-outer">
                      <Feed>
                        <Feed.Event>
                          <Feed.Label image={arr[0]?.media} alt={arr[0]?.alt} />
                          <Feed.Content className="content-inner">
                            <Feed.Summary className="custom-1">
                              Jean H. Faulkner
                            </Feed.Summary>
                            <Feed.Date className="mr-0 custom-2"> Las Vegas, Nevada</Feed.Date>
                            <Feed.Summary className="custom-3">
                              3 days ago
                            </Feed.Summary>
                            <Icon name="ellipsis vertical" />
                          </Feed.Content>
                        </Feed.Event>
                      </Feed>
                    </Card.Content>
                    <Feed.Summary className="custom-4">Live Happy, Live Long</Feed.Summary>
                    <Image src={arr[1]?.media} alt={arr[1]?.alt} wrapped ui={false} />
                    <Card.Content extra className="padd-out">
                      <div style={{ display: "Flex" }} className="social-home">
                        <a><Icon name='heart outline' /> 984k Likes</a>
                        <a><Icon name='comment outline' /> 94k comments</a>
                        <a><Icon name='share' /> 40k shares</a>
                      </div>
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Card>
                    <Card.Content className="content-outer">
                      <Feed>
                        <Feed.Event>
                          <Feed.Label image={arr[2]?.media} alt={arr[2]?.alt} />
                          <Feed.Content className="content-inner">
                            <Feed.Summary className="custom-1">
                              Kathy R. Herring:
                            </Feed.Summary>
                            <Feed.Date className="mr-0 custom-2">Austin, Texas</Feed.Date>
                            <Feed.Summary className="custom-3">
                              2 days ago
                            </Feed.Summary>
                            <Icon name="ellipsis vertical" />
                          </Feed.Content>
                        </Feed.Event>
                      </Feed>
                    </Card.Content>
                    <Feed.Summary className="custom-4">Let’s Go Crazy</Feed.Summary>
                    <Image src={arr[3]?.media} alt={arr[3]?.alt} wrapped ui={false} />
                    <Card.Content extra className="padd-out">
                      <div style={{ display: "Flex" }} className="social-home">
                        <a><Icon name='heart outline' /> 854k Likes</a>
                        <a><Icon name='comment outline' /> 74k comments</a>
                        <a><Icon name='share' /> 60k shares</a>
                      </div>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={7}>
                  <Card>
                    <Card.Content className="content-outer">
                      <Feed>
                        <Feed.Event>
                          <Feed.Label image={arr[4]?.media} alt={arr[4]?.alt} />
                          <Feed.Content className="content-inner">
                            <Feed.Summary className="custom-1">
                              Sharon D. Wagner
                            </Feed.Summary>
                            <Feed.Date className="mr-0 custom-2">Chicago, Illinois</Feed.Date>
                            <Feed.Summary className="custom-3">
                              5 days ago
                            </Feed.Summary>
                            <Icon name="ellipsis vertical" />
                          </Feed.Content>
                        </Feed.Event>
                      </Feed>
                    </Card.Content>
                    <Feed.Summary className="custom-4">See life through my eyes</Feed.Summary>
                    <Image src={arr[5]?.media} alt={arr[5]?.alt} wrapped ui={false} />
                    <Card.Content extra className="padd-out">
                      <div style={{ display: "Flex" }} className="social-home">
                        <a><Icon name='heart outline' /> 754k Likes</a>
                        <a><Icon name='comment outline' /> 78k comments</a>
                        <a><Icon name='share' /> 35k shares</a>
                      </div>
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Card>
                    <Card.Content className="content-outer">
                      <Feed>
                        <Feed.Event>
                          <Feed.Label image={arr[6]?.media} alt={arr[6]?.alt} />
                          <Feed.Content className="content-inner">
                            <Feed.Summary className="custom-1">
                              Victoriya Ellie
                            </Feed.Summary>
                            <Feed.Date className="mr-0 custom-2">London, England</Feed.Date>
                            <Feed.Summary className="custom-3">
                              3 days ago
                            </Feed.Summary>
                            <Icon name="ellipsis vertical" />
                          </Feed.Content>
                        </Feed.Event>
                      </Feed>
                    </Card.Content>
                    <Feed.Summary className="custom-4">Live with fun everyday!</Feed.Summary>
                    <Image src={arr[7]?.media} alt={arr[7]?.alt} wrapped ui={false} />
                    <Card.Content extra className="padd-out">
                      <div style={{ display: "Flex" }} className="social-home">
                        <a><Icon name='heart outline' /> 887k Likes</a>
                        <a><Icon name='comment outline' /> 72k comments</a>
                        <a><Icon name='share' /> 22k shares</a>
                      </div>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={8} className="text-middle block-top" style={{ display: "flex" }}>
            <div className="text-midil">
              <div className="product-text-out">
                <h2 className="product-text-2">Capture <span>Nostalgic</span> Moments</h2>
                <h2 className="product-text-2">in a SNAP</h2>
                <p className="font-80">Just Scroll your feed if you're feeling lonely and remind yourself that you have a wonderful collection of memories. The best memories need to be captured in the most beautiful way possible. One place to store and share your wonderful memories.</p>
                <Button primary right medium><Link to="/feed-content" className="color-white">Explore More</Link></Button>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>


  )
}
export default CardDetails;