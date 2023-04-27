import React from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";
import { Image, Icon, Header, Card, Segment, List, Button } from "semantic-ui-react"; import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import emptyImage from "../../../../../assets/images/pickzonWaterMark.svg"
import shoe_1 from "../../../../../assets/images/shoeAd_1.png"
import shoe_2 from "../../../../../assets/images/shoeAd_2.png"
import shoe_3 from "../../../../../assets/images/shoeAd_3.png"


const mediaUrls = [
  {
    key: 0,
    name: "Shoes",
    image: [shoe_1, shoe_2, shoe_3],
    price: 350,
    symbol: "rupee",
    location: "Delhi,India"
  },

]

const SidePromo = () => {
  const [promo, setPromo] = useState(mediaUrls)

  return (
    <>
      {(mediaUrls || []).map((product, index) => {
        return (
          <Card fluid style={{ width: "85%" }}>
            {
              product.image ?
                (
                  <Carousel
                    infiniteLoop
                    autoPlay
                    useKeyboardArrows
                    showThumbs={false}
                    showStatus={true}
                    showIndicators={false}
                    showArrows={false}
                  >
                    {(product.image || []).map((item, index) => {
                      return (
                        <Segment basic key={index} style={{ padding: "0px", height: "200px" }} >
                          <Image
                            // label={{ as: 'a', corner: 'left', icon: 'heart' }}
                            rounded
                            centered
                            fluid

                            src={item}
                            // size="big"
                            style={{ height: "100%", width: "auto" }}
                          />
                        </Segment>
                      )
                    })}
                  </Carousel>
                ) : (
                  <Segment basic style={{ padding: "0px" }}>
                    <Image src={emptyImage} centered />
                  </Segment>
                )
            }
            <Card.Content extra style={{ padding: "0px" }} >
              <List verticalAlign='middle' selection className='ad-profile'>
                <List.Item >
                  <Button
                    compact
                    // icon="linkify"
                    // color='black'
                    floated='right'
                    content="View"
                    style={{ marginTop: "4px" }}
                    as={Link}
                    to="/mall"
                  />
                  {/* <MallFeed /> */}
                  <List.Content>
                    <Header as="a">
                      <Icon.Group>
                        <Icon name={product.symbol} fitted />
                        {product.price}
                      </Icon.Group>
                      {" "} {product.name}
                    </Header>
                    <List.Description>
                      <Icon name="map marker alternate" />
                      {product.location}
                    </List.Description>
                  </List.Content>
                </List.Item>
              </List>
            </Card.Content>
          </Card >
        )
      })}

    </>
  )
}
export default React.memo(SidePromo);