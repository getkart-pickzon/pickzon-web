import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { Placeholder, Segment } from 'semantic-ui-react';
import Assets from '../../../../../assets/Assets';
import { CMS } from '../../../../../route/apiPath';
import { GET } from "../../../../../Services";
import "../../../staticPages/exploreMore/style.css"

const AppReferAndEarn = () => {
  const location = useLocation()
  let path = location.pathname.split("/")[1]
  const [state, setState] = useState({})
  const [loader, setLoader] = useState(0)

  useEffect(() => {
    function callEff() {
      fetchCmsData();
    }
    callEff();
  }, []);

  const fetchCmsData = async () => {
    try {
      setLoader(0);
      let { status, message, payload } = await GET(`${CMS.APP_REFER}${path}`);
      if (status === 0) {
        console.log(message);
      }
      setLoader(status);
      setState(payload);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Helmet>
        <title>{state.seo?.title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={state.seo?.description} />
        <meta name="keywords" content={state.seo?.keywords} />
      </Helmet>

      <section className="mobile-top">
        <div className="container">
          <div className="row">
            {
              loader === 0 ?
                <Segment basic textAlign='center' style={{ margin: "0", width: "100%" }}>
                  <Placeholder fluid>
                    <img src={Assets.defaultPlaceholders.landscape.img} style={{ width: "100%" }} alt={state?.bannerImage?.alt ?? "Make Endless Contacts on Social Media! banner"} />
                  </Placeholder>
                  {Array(5).fill(
                    <Placeholder fluid>
                      <Placeholder.Line length='full' />
                      <Placeholder.Line />
                      <Placeholder.Line length='full' />
                      <Placeholder.Line />
                    </Placeholder>
                  ).map((item) => {
                    return item
                  })}
                </Segment>
                :
                <>
                  <img src={state?.bannerImage?.image ?? Assets.defaultPlaceholders.landscape.img} style={{ width: "100%" }} alt={state?.bannerImage?.alt ?? "Make Endless Contacts on Social Media! banner"} />
                  <div className="refer-outer"><h1 className="refer_title">{state.name}</h1></div>
                  <div className="inner-row">
                    <div className="mt-15" dangerouslySetInnerHTML={{ __html: state.description }} style={{ fontSize: "20px" }} />
                  </div>
                </>
            }
          </div>
        </div>
      </section>
    </>
  );
}
export default React.memo(AppReferAndEarn);
