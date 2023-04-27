import React, { useEffect, useRef } from 'react'
import Assets from '../../../assets/Assets';
import "./style.css"

const VideoPlayer = ({ url, poster }) => {
  const videoRef = useRef();

  useEffect(() => {
    function callEff() {
      onLoadClick();
    } callEff();
  }, []);

  function onLoadClick() {
    try {
      videoRef.current.muted = true;
      videoRef.current.play();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    try {
      let options = {
        rootMargin: "0px",
        threshold: [0.25, 0.75]
      };
      let handlePlay = (entries, observer) => {
        entries.map((entry, i) => {
          if (entry.isIntersecting) {
            videoRef.current.play();
          } else {
            if (videoRef.current !== null) {
              videoRef.current.pause();
            }
          }
        });
      };
      let observer = new IntersectionObserver(handlePlay, options);
      observer.observe(videoRef.current);
    } catch (error) {
      console.log(error)
    }
  }, []);

  return (
    <>
      <video
        controlsList="nofullscreen" //stop open video in fullscreen by dblClick
        autoPlay={true}
        width="100%"
        height="100%"
        controls="true"
        ref={videoRef}
        src={url}
        poster={poster ? poster : Assets.defaultPlaceholders.waterMarkSq.img}
        preload="auto"
        loop
      ></video>
    </>
  )
}

export default VideoPlayer