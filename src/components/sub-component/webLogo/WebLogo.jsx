import React, { useEffect, useState } from "react";
import { Image } from 'semantic-ui-react'
import Assets from "../../../assets/Assets";
import { PUBLIC } from "../../../route/apiPath";
import { GET } from '../../../Services'

const WebLogo = () => {
  const [state, setState] = useState({});
  useEffect(() => {
    fetchLogo();
  }, [])

  const fetchLogo = async () => {
    try {
      let { status, message, payload } = await GET(PUBLIC.FETCH_LOGO, {});
      if (status === 0) {
        return console.error(message);
      }
      setState(payload);
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
      {
        !state.length ?
          <Image src={Assets.defaultPlaceholders.headerLogo.img} alt={Assets.defaultPlaceholders.headerLogo.alt} style={{ maxHeight: "40px", padding: "0" }} size="small" />
          :
          <Image src={state.length === 0 ? Assets.defaultPlaceholders.headerLogo.img : state[0]?.media} alt={state.length === 0 ? Assets.defaultPlaceholders.headerLogo.alt : state[0]?.alt} style={{ maxHeight: "40px", padding: "0" }} size="small" />
      }
    </>
  )
}

export default React.memo(WebLogo);