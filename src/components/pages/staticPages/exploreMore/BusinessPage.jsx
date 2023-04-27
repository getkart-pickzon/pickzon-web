import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { Container, Placeholder } from 'semantic-ui-react';
import { BusinessMeta } from "../../../../utils/meta";
import { CMS } from '../../../../route/apiPath';
import { GET } from "../../../../Services";
import Assets from '../../../../assets/Assets';
import './style.css'

const BusinessPage = () => {
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
      let { status, message, payload } = await GET(`${CMS.BUSINESS_PAGE}${path}`);
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
      <section>
        <Helmet>
          <title>{state.seo?.title}</title>
          <link rel="canonical" href={window.location.href} />
          <meta name="description" content={state.seo?.description} />
          <meta name="keywords" content={state.seo?.keywords} />
        </Helmet>
        {
          loader === 0 ?
            <div>
              <Placeholder fluid>
                <img src={Assets.defaultPlaceholders.landscape.img} style={{ width: "100%" }} alt={state?.bannerImage?.alt ?? "Make Endless Contacts on Social Media! banner"} />
              </Placeholder>
              <Container style={{ margin: "0 0 3rem 0" }}>
                <Placeholder style={{ margin: "1rem 0 0 0" }} >
                  <Placeholder.Line />
                </Placeholder>
                {Array(6).fill(
                  <Placeholder fluid>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line length='full' />
                    <Placeholder.Line />
                  </Placeholder>
                ).map((item) => {
                  return item
                })}
              </Container>
            </div>
            :
            <div>
              <img src={state?.bannerImage?.image ?? Assets.defaultPlaceholders.landscape.img} style={{ width: "100%" }} alt={state?.bannerImage?.alt ?? "Make Endless Contacts on Social Media! banner"} />
              <Container >
                <div className="row">
                  <div className="refer-outer" style={{ margin: "1rem 0 0 0" }}>
                    <h1 className="refer_title">{state.name}</h1></div>
                  <div className="inner-row">
                    <div className="mt-15" dangerouslySetInnerHTML={{ __html: state.description }} style={{ fontSize: "20px" }} />
                  </div>
                </div>
              </Container>
            </div>
        }
      </section>
    </>
  );
};
export default React.memo(BusinessPage);