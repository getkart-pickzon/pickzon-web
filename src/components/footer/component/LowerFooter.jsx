import React from "react";
import { Link } from "react-router-dom";
import { Grid, Image, List } from "semantic-ui-react";
import footerlogo from "../../../assets/images/footer-logo.png";
import Assets from "../../../assets/Assets";
import "./style.css";
const LowerFooter = () => {

  return (
    <div className="last-footer-out">
      <div className="newhome">
        <Grid>
          <Grid.Row>
            <Grid.Column width={4} style={{ display: "flex" }} className="footer-logoleft">
              <Image src={footerlogo} style={{ maxHeight: "40px" }} alt="PickZon" />
            </Grid.Column>
            <Grid.Column width={5} className="white footer-centerpart" style={{ display: "flex" }} >
              <p>© 2023 PickZon Inc. <Link to="/intellectual-property-policy">All Rights Reserved.</Link></p>
            </Grid.Column>
            <Grid.Column width={7}>
              <List className="footer-social">
                <List.Item className="social-text">Follow Us:</List.Item>
                <List.Item className="hpickzon" as='a' href="https://www.pickzon.com/" target="_blank">
                  <Image src={Assets.footer.footerLogoPickzon.img} alt={Assets.footer.footerLogoPickzon.alt} />
                </List.Item>
                <List.Item className="hpickzon-facebook" as='a' href="https://www.facebook.com/pickzon.inc" target="_blank">
                  <Image src={Assets.footer.facebook.img} alt={Assets.footer.facebook.alt} />
                </List.Item>
                <List.Item className="hpickzon-youtube" as='a' href="https://www.youtube.com/channel/UCOBHbUldqArDDdUD0hZfsOQ" target="_blank">
                  <Image src={Assets.footer.youtube.img} alt={Assets.footer.youtube.alt} />
                </List.Item>
                <List.Item className="hpickzon-insta" as='a' href="https://www.instagram.com/pickzon_/" target="_blank">
                  <Image src={Assets.footer.insta.img} alt={Assets.footer.insta.alt} />
                </List.Item>
                <List.Item className="hpickzon-linkdin" as='a' href="https://www.linkedin.com/company/pickzon" target="_blank">
                  <Image src={Assets.footer.linkdin.img} alt={Assets.footer.linkdin.alt} />
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>

  )

}

export default LowerFooter;







