import React from "react";
import { Icon, Grid, Image } from "semantic-ui-react";
import ".././style.css";
import Assets from "../../../../../../assets/Assets";
// import bottomhome from "../../../../../../assets/images/homepage/pickzon-bottom-home-2.png";
const MarketAnaliysis = ({ item }) => {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={6} className="market-left">
            <div>
              {/* <div className="market-out">
                <div className="market-inner text-right">
                  <h2>Save Your Time</h2>
                  <p>You can use PickZon to list your New/Old products and reach all the nearby potential users within seconds.</p>
                </div>
                <div className="icon-part mt-10 ml-15"> <Icon name='check circle outline' size='big' /></div>
              </div> */}
              <div className="market-out">
                <div className="market-inner text-right">
                  <h2>Attract the viewers</h2>
                  <p>
                    You can increase interaction by making clips or uploading
                    them regularly.
                  </p>
                </div>
                <div className="icon-part mt-10 ml-15">
                  {" "}
                  <Icon name="check circle outline" size="big" />
                </div>
              </div>

              <div className="market-out">
                <div className="market-inner text-right">
                  <h2>Create Memories</h2>
                  <p>
                    The best option to save your memories is to share them with
                    others on the app.
                  </p>
                </div>
                <div className="icon-part mt-10 ml-15">
                  {" "}
                  <Icon name="check circle outline" size="big" />
                </div>
              </div>
              <div className="market-out">
                <div className="market-inner text-right">
                  <h2>Create Pages</h2>
                  <p>
                    Creating a page for promoting your brand or business can be
                    an incredibly effective way to reach your target audience
                    and build your online presence.
                  </p>
                </div>
                <div className="icon-part mt-10 ml-15">
                  {" "}
                  <Icon name="check circle outline" size="big" />
                </div>
              </div>

              {/* <div className="market-out">
                <div className="market-inner text-right">
                  <h2>Thrift Store</h2>
                  <p>The app is not just for selling instead it’s one of the best short video-making app as well. It is the best choice for influencers to run their digital stores.</p>
                </div>
                <div className="icon-part mt-10 ml-15"> <Icon name='check circle outline' size='big' /></div>
              </div> */}
            </div>
          </Grid.Column>
          <Grid.Column width={10} className="item-center">
            <Image src={item?.media} alt={item?.alt} size='big'/> 
            {/* <Image src={bottomhome} alt={item?.alt} size='big' /> */}
          </Grid.Column>
          {/* <Grid.Column width={2} className="market-right"> */}
          <div>
            {/* <div className="market-out">
                <div className="icon-part mt-10 ml-15"> <Icon name='check circle outline' size='big' /></div>
                <div className="market-inner text-left">
                  <h2>Attract the viewers</h2>
                  <p>You can increase interaction by making clips or uploading them regularly.</p>
                </div>
              </div> */}

            {/* <div className="market-out">
                <div className="icon-part mt-10 ml-15"> <Icon name='check circle outline' size='big' /></div>
                <div className="market-inner text-left">
                  <h2>Make Extra Income</h2>
                  <p>Refer to your friends & family and earn additional income just by using the app. The more you refer the more you earn. Start earning money today.</p>
                </div>
              </div> */}

            {/* <div className="market-out">
                <div className="icon-part mt-10 ml-15"> <Icon name='check circle outline' size='big' /></div>
                <div className="market-inner text-left">
                  <h2>Create offers</h2>
                  <p>Attractive offers are something through which you can attract more potential buyers.</p>
                </div>
              </div> */}
          </div>
          {/* </Grid.Column> */}
        </Grid.Row>
      </Grid>
    </div>
  );
};
export default MarketAnaliysis;
