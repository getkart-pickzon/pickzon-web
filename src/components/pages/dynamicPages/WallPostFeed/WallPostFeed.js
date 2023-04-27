import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Container, Divider, } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { getUser } from "../../../../utils/common";
import UploadMediaPost from "../../../sub-component/uploadMediaPostIcons/uploadMediaPost";
import RightSideFeed from "./rightSideFeed/RightSideFeed";
import LeftSideFeed from "./leftSideFeed/LeftSideFeed";
import FeedCardData from "./component/FeedCardData";
// import StoryFeed from "./StoryFeed"
import "./style.css";

let fetchObj = {
  "userId": "",
  "pageNumber": 0,
  "pageLimit": 10,
  "statusValue": "",
  "filterValue": "",
  "search": "",
  "sort": {},
  "timeZone": ""
};

const WallPostFeed = () => {
  // const [state, setState] = useState({
  //   feedRecord: [],
  //   totalPage: 0,
  //   totalRecord: 0,
  //   hashMore: true,
  //   isLoader: false
  // });

  let router = useHistory();
  let loggedUser = getUser();
  fetchObj.userId = loggedUser._id;

  useEffect(() => {
    try {
      function callEffect() {
        router.listen((result) => {
          try {
            // setState((pre) => ({ ...pre, feedRecord: [] }));
            window.scrollTo(0, 0);
          } catch (er) { console.log(er); };
        });
      }; callEffect();
    } catch (err) { console.log(err); };
  }, []);

  return (
    <Container fluid style={{ padding: "1rem" }}>
      <Grid centered stackable className="grid-wrapper">
        <Grid.Column mobile={16} tablet={8} computer={4} widescreen={3} className="side-feed-left feed-overflow-hover" >
          <LeftSideFeed />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8} widescreen={6} largeScreen={8} className="middle-feed">
          <Grid.Row >
            {/* <StoryFeed /> */}
            <UploadMediaPost className={"main-menu"} />
            <Divider />
            <FeedCardData />
          </Grid.Row>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={4} widescreen={3} className="side-feed-right ">
          <RightSideFeed />
        </Grid.Column>
      </Grid>
    </Container >
  );
};
export default React.memo(WallPostFeed);