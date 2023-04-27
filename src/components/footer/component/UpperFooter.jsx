import React from "react";
import { Icon, Grid, Image, List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import footerlast from "../../../assets/images/WebFooter.svg";
import NavigationPaths from "../../../route/navigationPath";
import "./style.css";
import Assets from "../../../assets/Assets";

const UpperFooter = () => {
  return (
    <div className="footer-outer">
      <div className="newhome footer-plr-0">
        <Grid divided="vertically">
          <Grid.Row>
            <Grid.Column width={11} className="pdleft-100">
              <Grid>
                <Grid.Row>
                  <Grid.Column width={6}>
                    <h3>Engage with the world</h3>
                    <p className="foot-cus-width">The most creative and feature rich social engagement App, that lets you share your thoughts, engage with the Audience and have fun.</p>
                    <div className="footer-1">
                      <a href="mailto:help@pickzon.com">
                        <div className="footer-2-inner">
                          <Icon
                            name="mail outline"
                            inverted
                            fitted
                            size="large"
                          />{" "}
                          help@pickzon.com
                        </div>
                      </a>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <h3>Company</h3>
                    <List className="second-part">
                      <List.Item>
                        <Link to={NavigationPaths.PRIVACYPOLICY} target="_blank" rel="noreferrer noopener">Privacy Policy</Link>
                      </List.Item>
                      <List.Item>
                        <Link to={NavigationPaths.TERM} target="_blank" rel="noreferrer noopener">Terms of Service</Link>
                      </List.Item>
                      <List.Item>
                        <Link to={NavigationPaths.SECURITY} target="_blank" rel="noreferrer noopener">Security</Link>
                      </List.Item>
                      <List.Item>
                        <Link to={NavigationPaths.CONTACT} >Contact Us</Link>
                      </List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <h3>Features</h3>
                    <List className="second-part">
                      {/* <List.Item>
                        <Link to={NavigationPaths.CLIPCONTENT} target="_blank" rel="noreferrer noopener"> Clips</Link>
                      </List.Item>
                      <List.Item>
                        <Link to={NavigationPaths.MALLCONTENT} target="_blank" rel="noreferrer noopener"> Mall</Link>
                      </List.Item> */}
                      <List.Item>
                        <Link to={NavigationPaths.FEEDCONTENT} target="_blank" rel="noreferrer noopener"> Feed</Link>
                      </List.Item>
                      {/* <List.Item>
                        <Link to={NavigationPaths.EARNMONEYPAGE} target="_blank" rel="noreferrer noopener">
                          Earn Money
                        </Link>
                      </List.Item> */}
                      <List.Item>
                        <Link to={NavigationPaths.BUSINESSPAGE} target="_blank" rel="noreferrer noopener">
                          Business Promotion
                        </Link>
                      </List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <h3>Discover</h3>
                    <List className="second-part">
                      <List.Item>
                        <Link to={NavigationPaths.SEARCHEXPLORE} target="_blank" rel="noreferrer noopener">Search & Explore</Link>
                      </List.Item>
                      <List.Item>
                        <Link to={NavigationPaths.SOCIALCREATOR} target="_blank" rel="noreferrer noopener">Social Creator</Link>
                      </List.Item>
                    </List>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column width={5} className="bg-image">
              <Image
                centered
                src={Assets.defaultPlaceholders.tradeMark.img}
                style={{ width: "200px" }}
                alt="Best short video maker app"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div >
  );
};

export default UpperFooter;
