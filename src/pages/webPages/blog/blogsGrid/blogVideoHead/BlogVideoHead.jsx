import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const BlogVideoHead = () => {
  useEffect(() => {
    const api_FetchWebMedia = async () => {
      try {
        let { status, message, payload } = await GET(
          `${WEB.WEB_NAME}${location.pathname}`
        );
        if (status === 0) {
          console.log(message);
        }
        setState((prev) => ({
          ...prev,
          mediaArray: payload.mediaCdnUrl || [],
        }));
        console.log(">>>>", payload);
      } catch (error) {
        console.error(error);
      }
    };
    api_FetchWebMedia();
  }, [location.pathname]);

  return;
  <>
    <div>BlogVideoHead</div>;<div>BlogVideoHead</div>;
  </>;
};

export default BlogVideoHead;
