import React from "react";
import { Image, Container, Card } from "semantic-ui-react";
import '../style.css';

const featurePart = ({ arr }) => {
  const factors = [
    {
      img: arr[0]?.media,
      imgWhite: arr[1]?.media,
      alt: "Feed Fun & Beneficial Factors",
      text: "Feed"
    },
    {
      img: arr[2]?.media,
      imgWhite: arr[3]?.media,
      alt: "Entertainment Fun & Beneficial Factors",
      text: "Entertainment"
    },
    {
      img: arr[4]?.media,
      imgWhite: arr[5]?.media,
      alt: "Interact Fun & Beneficial Factors",
      text: "Interact"
    },
    {
      img: arr[6]?.media,
      imgWhite: arr[7]?.media,
      alt: "Explore Fun & Beneficial Factors",
      text: "Explore"
    },
    {
      img: arr[8]?.media,
      imgWhite: arr[9]?.media,
      alt: "Promote Fun & Beneficial Factors",
      text: "Promote"
    },
    {
      img: arr[10]?.media,
      imgWhite: arr[11]?.media,
      alt: "Traffic Fun & Beneficial Factors",
      text: "Traffic"
    }
  ]

  return (
    <Container>
      <Card.Group itemsPerRow={6} className="custom-width">
        <>
          {factors.map((item, index) => {
            return (
              <Card
                key={index}
                className="onmouse"
              >
                <Card.Content style={{ padding: "0px" }}>
                  <div>
                    <Card.Description>
                      <Image src={item.imgWhite} alt={item.alt} size='small' className="on-mouse" />
                      <Image src={item.img} alt={item.alt} size='small' className="no-mouse" />
                    </Card.Description>
                    <Card.Header className="text-center">{item.text}</Card.Header>
                  </div>
                </Card.Content>
              </Card>
            );
          })}
        </>
      </Card.Group>
    </Container>
  )
}
export default featurePart;