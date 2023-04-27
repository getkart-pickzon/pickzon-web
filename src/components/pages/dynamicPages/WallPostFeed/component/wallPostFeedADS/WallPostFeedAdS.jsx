import React, { useState, useEffect } from 'react'
import { Image, Icon, Button, Card, List, Segment } from "semantic-ui-react"; import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player';
import { getUser } from '../../../../../../utils/common';
import { POST } from '../../../../../../Services';
import Assets from '../../../../../../assets/Assets';
import './style.css'

// import ad_1 from "../../../../../../assets/images/AD_1.jpg"
// import ad_2 from "../../../../../../assets/images/AD_2.jpg"
// import ad_4 from "../../../../../../assets/images/AD_4.jpg"
// import ad_5 from "../../../../../../assets/images/AD_5.jpg"
// import ad_6 from "../../../../../../assets/images/AD_6.jpg"
// import ad_7 from "../../../../../../assets/images/AD_7.jpg"

// import defaultImage from "../../../../../../assets/images/pickzonBlueLogo.png"
// const mediaUrls = [ad_1, ad_2, ad_4, ad_5, ad_6, ad_7];
let fetchObj = {
  "userId": "",
  "pageNumber": 0,
  "pageLimit": 10,
  "statusValue": "",
  "filterValue": "",
  "search": "",
  "sort": {},
  "timeZone": ""
};

let defaultStateObj = {
  fetchAdsData: [],
  fetchAdsObj: {},
  isLoader: false,
  payloadIndex: 0,
  // meidaData: [
  //   "https://react.semantic-ui.com/images/avatar/large/elliot.jpg",
  //   "https://pickzonclips.s3.ap-south-1.amazonaws.com/2021/1645536679858.mp4",
  //   "https://react.semantic-ui.com/images/avatar/large/elliot.jpg",
  //   "https://pickzonclips.s3.ap-south-1.amazonaws.com/2021/1645535752707.mp4"
  // ],
};
const WallPostFeedADS = () => {
  const [state, setState] = useState(defaultStateObj);
  const [placementUrls, setPlacementUrl] = useState([]);
  let loggedUser = getUser();
  fetchObj.userId = loggedUser._id;
  let payloadIndex = 1;

  useEffect(() => {
    try {
      function callEffect() {
        fetchAllAds();
      }; callEffect();
    } catch (err) { console.log(err); };
  }, []);


  const fetchAllAds = async () => {
    try {
      let { status, payload } = await POST("/ads/fetch-all-feed-ads", fetchObj);
      if (status === 0) { return };
      setState((pre) => ({
        ...pre,
        fetchAdsData: payload,
        fetchAdsObj: {
          buttonLabel: payload[0].buttonLabel,
          buttonLabelURL: payload[0].buttonLabelURL,
          image: payload[0].createPageImages,
          title: payload[0].title
        }
      }));
      setPlacementUrl(payload[0].placement);

      setInterval(() => {
        if (payload.length > 1)
          payloadIndex += 1;
        if (payload.length === payloadIndex) {
          payloadIndex = 0;
        };
        callChangeAds(payload ? payload : state.fetchAdsData, payloadIndex)
      }, 5000);
    } catch (err) { console.log(err) };
  };

  const callChangeAds = (payload, index = 0) => {
    try {
      setState((pre) => ({
        ...pre,
        fetchAdsObj: {
          buttonLabel: payload[index].buttonLabel,
          buttonLabelURL: payload[index].buttonLabelURL,
          image: payload[index].createPageImages,
          title: payload[index].title
        }
      }));
      setPlacementUrl(payload[index].placement);
    } catch (err) { console.log(err); };
  }

  return (
    <>
      <Card fluid >
        {
          placementUrls.length ?
            <Carousel
              infiniteLoop
              useKeyboardArrows
              autoPlay
              showThumbs={false}
              showIndicators={false}
              showArrows={false}
            >
              {
                (placementUrls || []).map((item, index) => {
                  let src = item.media ? item.media : item
                  let isVideo = false;

                  let mp4 = item.media.search(".mp4");
                  let mov = item.media.search(".mov");
                  let avi = item.media.search(".avi");
                  if (mp4 > 0 || mov > 0 || avi > 0) {
                    isVideo = true
                  }

                  return <>
                    {isVideo === false ?
                      <div className="content-media">
                        <Image src={src} centered style={{ height: "325px", width: "325px" }} />
                      </div>
                      :
                      <div className="content-media">
                        <ReactPlayer
                          width={300}
                          height={300}
                          style={{ margin: "auto" }}
                          playing={true}
                          muted={true}
                          url={src}
                          controls={false}
                          loop
                        />
                      </div>
                    }
                  </>
                })
              }
            </Carousel>
            :
            <Segment basic style={{ margin: 0 }}>
              <Image src={Assets.defaultPlaceholders.waterMarkSq.img} alt={Assets.defaultPlaceholders.waterMarkSq.alt} centered style={{ height: "325px", width: "325px" }} />
            </Segment>
        }
        <List verticalAlign='middle' selection className='ad-profile'>
          <List.Item>
            <Image avatar src={state.fetchAdsObj?.image} />
            <List.Content>
              <List.Header>{state.fetchAdsObj?.title}</List.Header>
              Sponsored
              <Icon name="globe" />
            </List.Content>
            <Button compact floated='right'>
              <a href={state.fetchAdsObj?.buttonLabelURL} target="_blank" rel="noopener">
                {state.fetchAdsObj?.buttonLabel}
              </a>
            </Button>
          </List.Item>
        </List>
      </Card >
    </>
  )
}
export default React.memo(WallPostFeedADS);