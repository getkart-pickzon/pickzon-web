// https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/

import React, { useRef, useEffect } from "react";
import useYoutubeScript from "./useYoutubeScript";
import useIntersectionObserver from "./useIntersectionObeserver";

export default function ClipVideos() {
  const [loaded, error] = useYoutubeScript("sample-youtube");
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.8
  });
  const isPlayerReady = useRef(false);
  const player = useRef(null);
  const isPlayerAlreadySet = player && player.current;
  const hasYoutubeInWindow = typeof window.YT === "object" && window.YT.Player;

  useEffect(() => {
    const playerObject = player.current;
    return () => playerObject && playerObject.destroy && playerObject.destroy();
  }, []);

  useEffect(() => {
    if (loaded) {
      if (!isPlayerAlreadySet && hasYoutubeInWindow) {
        player.current = new window.YT.Player("youtube-iframe-id", {
          videoId: "cdsnzfJUqm0",
          width: 400,
          height: 350,
          playerVars: getPlayerParameters(),
          events: {
            onReady: onPlayerReady
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  if (isPlayerAlreadySet) {
    if (entry.isIntersecting) {
      player.current.playVideo && player.current.playVideo();
    } else {
      player.current.pauseVideo && player.current.pauseVideo();
    }
  }

  if (!loaded || error) {
    return <div>Loading...</div>;
  }

  const getPlayerParameters = () => {
    return {
      enablejsapi: 1,
      playsinline: 1, //default smallscreen
      fs: 1, // fullscreen
      controls: 1, // show controls
      rel: 0,
      modestbranding: 0,
      iv_load_policy: 3,
      showinfo: 1,
      widget_referrer: window.location.href,
      origin: window.location.href
    };
  };

  const onPlayerReady = () => {
    if (isPlayerReady && !!isPlayerReady.current) { return; }
    // its important to mute the video before playing since browser does not allow autoplay
    player.current.mute && player.current.mute();
    player.current.playVideo && player.current.playVideo();
    isPlayerReady.current = true;
  };

  return (
    <div className="App" style={{ height: "1200px" }}>
      <center ref={ref}>
        <div id="youtube-iframe-id" />
      </center>
    </div>
  );
}

