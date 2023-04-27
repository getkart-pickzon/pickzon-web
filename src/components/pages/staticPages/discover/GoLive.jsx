import React from "react";
import { Icon } from "semantic-ui-react";

import { GoLiveCom } from "./common";
import '../static.css'

const GoLive = ({ label }) => {
  return (
    <section className="content-test-padding">
      <div className="container">
        <div className="row">
          <div className="features-section">
            <div className="features-inner">
              <div className="under-bottom"><h1>{GoLiveCom.header}</h1></div>
              <div className="pl-25">
                <p>{GoLiveCom.section1}</p>
              </div>
              <h3 className="mb-0"> <Icon name="angle right" className="arrow-right-color" />{GoLiveCom.header2}</h3>
              <div className="pl-25">
                <p>{GoLiveCom.section2}</p>
                <ul>
                  <li>{GoLiveCom.section2_1}</li>
                  <li>{GoLiveCom.section2_2}</li>
                  <li>{GoLiveCom.section2_3}</li>
                  <li>{GoLiveCom.section2_4}</li>
                  <li>{GoLiveCom.section2_5}</li>
                </ul>
              </div>
              <h3 className="mb-0"> <Icon name="angle right" className="arrow-right-color" />{GoLiveCom.header3}</h3>
              <div className="pl-25">
                <p>{GoLiveCom.section3_1}</p>
                <p>{GoLiveCom.section3_2}</p>

              </div>
              <h3 className="mb-0"> <Icon name="angle right" className="arrow-right-color" />{GoLiveCom.header4}</h3>
              <div className="pl-25">
                <p>{GoLiveCom.section4}</p>
                <ul>
                  <li>{GoLiveCom.section4_1}</li>
                  <li>{GoLiveCom.section4_2}</li>
                  <li>{GoLiveCom.section4_3}</li>
                  <li>{GoLiveCom.section4_4}</li>
                  <li>{GoLiveCom.section4_5}</li>
                </ul>
              </div>
              <h3 className="mb-0"> <Icon name="angle right" className="arrow-right-color" />{GoLiveCom.section4}</h3>
              <div className="pl-25">
                <p>{GoLiveCom.section5_1}</p>
                <p>{GoLiveCom.section5_2}</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoLive;