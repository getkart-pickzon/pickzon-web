import React, { useCallback, useEffect, useState } from "react";
import { Placeholder, Segment } from "semantic-ui-react";
import ReactPlayer from 'react-player';
import { WEB } from "../../../../../route/apiPath";
import { GET } from "../../../../../Services";

const vidWidth = "100%";
const vidHeight = "100%";

const RightSideFeed = () => {
  const [state, setState] = useState({});
  const [loader, setLoader] = useState(0)

  useEffect(() => {
    try {
      function callEffect() {
        fetchMedia();
      }; callEffect();
    } catch (err) { console.log(err); };
  }, []);

  const fetchMedia = useCallback(async () => {
    try {
      setLoader(0)
      let { status, message, payload } = await GET(`${WEB.WEB_NAME}/blog_video`);
      if (status === 0) {
        console.log(message);
      }
      setLoader(status)
      setState(payload);
    } catch (error) {
      console.error(error);
    }
  }, [])

  return (
    <>
      {state.mediaCdnUrl?.map((item, i) => {
        return (<Segment textAlign="center" basic style={{ padding: "0" }}>
          {loader == 0 ?
            <Placeholder style={{ height: "100%" }}>
              <Placeholder.Image rectangular />
            </Placeholder>
            :
            <ReactPlayer
              playing={true}
              muted={true}
              width={vidWidth}
              height={vidHeight}
              url={item.media}
              controls={false}
              loop
            />
          }
        </Segment>)
      })}
    </>
  );
};
export default React.memo(RightSideFeed);