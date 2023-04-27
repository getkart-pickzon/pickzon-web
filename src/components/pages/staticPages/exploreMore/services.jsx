import React from "react";
import { Icon } from "semantic-ui-react";
import { Helmet } from "react-helmet";

import { ServicesMeta } from "../../../../utils/meta";
import { ServicesCom } from "./common"
import '../static.css'

const Services = () => {
  return (
    <section className="content-test-padding">
      <Helmet>
        <title>{ServicesMeta.title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={ServicesMeta.description} />
        <meta name="keywords" content={ServicesMeta.keywords} />
      </Helmet>

      <div className="container">
        <div className="row">
          <div className="about-section">
            <div className="about-inner">
              <div class="under-bottom"><h1>{ServicesCom.header}</h1></div>
              <h3 className="mb-0"> <Icon name="angle right" className="arrow-right-color" />{ServicesCom.header1}</h3>
              <div className="pl-25">
                <p>{ServicesCom.section1}</p>
                <p><strong>{ServicesCom.header1_1}</strong> {ServicesCom.section1_1}</p>
                <p><strong>{ServicesCom.header1_2}</strong> {ServicesCom.section1_2}</p>
                <p><strong>{ServicesCom.header1_3}</strong> {ServicesCom.section1_3}</p>
                <p><strong>{ServicesCom.header1_4}</strong> {ServicesCom.section1_4}</p>
              </div>

              <h3 className="mb-0"> <Icon name="angle right" className="arrow-right-color" />{ServicesCom.header2}</h3>
              <div className="pl-25">
                <ul className="services-custom">
                  <li><strong>{ServicesCom.header1_1}</strong> {ServicesCom.section1_1}</li>
                  <li><strong>{ServicesCom.header1_2}</strong> {ServicesCom.section1_2}</li>
                </ul>
              </div>
              <h3 className="mb-0"> <Icon name="angle right" className="arrow-right-color" />{ServicesCom.header3}</h3>
              <div className="pl-25">
                <p>{ServicesCom.section3}</p>
                <p><strong>{ServicesCom.header3_1}</strong> {ServicesCom.section3_1}</p>
                <ul className="services-custom">
                  <li>{ServicesCom.section3_1_1}</li>
                  <li>{ServicesCom.section3_1_2}</li>
                  <li>{ServicesCom.section3_1_3}</li>
                  <li>{ServicesCom.section3_1_4}</li>
                  <li>{ServicesCom.section3_1_5}</li>
                </ul>

              </div>
              <h3 className="mb-0"> <Icon name="angle right" className="arrow-right-color" />{ServicesCom.header4}</h3>
              <div className="pl-25">
                <p>{ServicesCom.section4}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Services;