import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { Container, Placeholder } from 'semantic-ui-react';
import { CMS } from '../../../../route/apiPath';
import { GET } from "../../../../Services";
import { ServicesMeta } from "../../../../utils/meta";
import '../static.css'

const Services = () => {
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
      let { status, message, payload } = await GET(`${CMS.SERVICE}${path}`);
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
    <section className="content-test-padding">
      <Helmet>
        <title>{ServicesMeta.title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={ServicesMeta.description} />
        <meta name="keywords" content={ServicesMeta.keywords} />
      </Helmet>
      {
        loader === 0 ?
          <Container>
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
          :
          <Container>
            <div className="row">
              <div className="refer-outer" style={{ margin: "1rem 0 0 0" }}>
                <h1 className="refer_title">{state.name}</h1></div>
              <div className="inner-row">
                <div className="mt-15" dangerouslySetInnerHTML={{ __html: state.description }} style={{ fontSize: "20px" }} />
              </div>
            </div>
          </Container>
      }
    </section>
  );
};
export default React.memo(Services);