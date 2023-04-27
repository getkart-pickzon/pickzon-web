import React from 'react';
// import { Link } from 'react-router-dom';
import { Segment, Header, Feed, Image, Button, Icon } from 'semantic-ui-react';
import { ComingSoon } from '../../../../../utils/common';
import "../userProfilePage/style.css"
const SuggestedListing = ({ listingArray, classname, seeAllbtn, listHeading }) => {
  return (
    <>
      <Segment className={classname}>
        <Header.Subheader as="h3">
          {listHeading}
        </Header.Subheader>

        <ComingSoon message="Coming Soon" imgSize="small" />

        {/* {(listingArray || []).map((item, i) => {
          return (
            <Feed key={i}>
              <Feed.Event  >
                <Feed.Label style={{ margin: "auto" }}>
                  <Image avatar src={item.img} />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User>{item.label}</Feed.User>
                  </Feed.Summary>
                  <Feed.Date>
                    {item.subLabel}
                  </Feed.Date>
                </Feed.Content>
                <Feed.Date style={{ margin: "auto" }}>
                  <Icon name={item.icon} circular color='grey' fitted />
                </Feed.Date>
              </Feed.Event>
            </Feed>
          )
        })}
        <Button fluid compact as={Link} to={seeAllbtn}>
          See All
        </Button> */}

      </Segment>
    </>
  );
};

export default React.memo(SuggestedListing);
