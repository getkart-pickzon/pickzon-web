import React from 'react'
import {
  Image,
  Icon,
  Button,
  Card,
  List,
} from "semantic-ui-react"; import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player';

import './style.css'

const mediaUrls = [
  "https://react.semantic-ui.com/images/avatar/large/elliot.jpg",
  "https://pickzonclips.s3.ap-south-1.amazonaws.com/2021/1645536679858.mp4",
  "https://react.semantic-ui.com/images/avatar/large/elliot.jpg",
  "https://pickzonclips.s3.ap-south-1.amazonaws.com/2021/1645535752707.mp4"]

const FeedAd = () => {

  return (
    <Card fluid >

      {
        mediaUrls.length ?
          <Carousel
            infiniteLoop
            useKeyboardArrows
            autoPlay
            showThumbs={false}
            showIndicators={false}
          >
            {
              (mediaUrls || []).map((item, index) => {
                let src = item.src ? item.src : item
                let isVideo = false;
                if (item.src) {
                  isVideo = item.ext === "image" ? false : true;
                } else {
                  let mp4 = item.search(".mp4");
                  let mov = item.search(".mov");
                  let avi = item.search(".avi");
                  if (mp4 > 0 || mov > 0 || avi > 0) {
                    isVideo = true
                  }
                }
                return <>
                  {isVideo === false ?
                    <div className="content-media">
                      <Image src={src} centered />
                    </div>
                    :
                    <div className="content-media">
                      <ReactPlayer
                        width={300}
                        height={300}
                        style={{ margin: "auto" }}
                        // playing={true}
                        url={src}
                        controls={true}
                        loop
                      />
                    </div>
                  }
                </>
              })
            }
          </Carousel>
          : <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" centered />
      }

      <List verticalAlign='middle' selection className='ad-profile'>
        <List.Item>
          <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
          <List.Content>
            <List.Header>Getkart</List.Header>
            Sponsored
            <Icon name="globe" />
          </List.Content>
          <Button compact content="Learn More" color='black' floated='right' />
        </List.Item>
      </List>

    </Card >
  )
}
export default FeedAd;
