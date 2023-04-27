import React, { useEffect } from "react";
import { openAppUrl } from "../../../utils/common";

const OpenShortAppUrl = () => {
  useEffect(() => {
    async function callEffect() {
      try {
        return openAppUrl();
      } catch (err) {
        console.log(err);
      };
    }
    callEffect();
  }, []);

  return (
    <>
    </>
  )
};
export default OpenShortAppUrl;