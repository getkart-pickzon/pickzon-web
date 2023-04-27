import React, { useState, useEffect, useCallback } from "react";
import { Card, Placeholder, Icon, Header, Divider, Container, Grid } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { POST } from "../../../../Services";
import { getUser, makeUserProfileImgURL, NoData } from "../../../../utils/common";
import _ from 'lodash'
import FeedCard from "../../../sub-component/postCard/FeedCard";

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

const defaultObj = {
  feedRecord: [],
  totalPage: 0,
  totalRecord: 0,
  hashMore: true,
  totalRecords: 0,
  isLoader: false
};

const SaveFeedPostPage = () => {
  const [state, setState] = useState(defaultObj);
  let loggedUser = getUser();
  fetchObj.userId = loggedUser._id;

  useEffect(() => {
    try {
      function callEffect() {
        fetchFeedData();
      }; callEffect();
    } catch (err) { console.log(err); };
  }, []);

  const fetchFeedData = useCallback(async () => {
    try {
      setState((pre) => ({ ...pre, isLoader: true }));
      let { status, message, totalRecords, payload } = await POST('/feed/fetch-all-save-feeds', fetchObj);
      setState((pre) => ({ ...pre, isLoader: false }))
      if (status == 0) {
        console.log("fetchUserData ", message);
        return setState((pre) => ({ ...pre, hashMore: false }));
      };
      let feedObjData = [];
      feedObjData = state.feedRecord;
      feedObjData.push(...payload);
      setState((pre) => ({
        ...pre,
        feedRecord: feedObjData,
        totalRecords: totalRecords
      }));
    } catch (er) { console.log(er); };
  });

  const nextPage = (i) => {
    fetchObj.pageNumber = fetchObj.pageNumber + 1;
    fetchFeedData();
  };

  return (
    <>
      <Container>
        <Grid centered stackable  >
          <Grid.Column mobile={16} tablet={8} computer={8} widescreen={6} className="">
            <Header style={{ paddingTop: '18px' }}>
              <Icon name="bookmark" color="pink" size="tinny" fitted />
              &nbsp; Saved Feed List &nbsp;
              {/* {state.totalRecords} */}
            </Header>
            <Divider />
            {state.feedRecord.length === 0 ?
              <>
                {state.hashMore === true ?
                  <>
                    {_.times(fetchObj.pageLimit, (i) => (
                      <Card key={i} fluid>
                        <Card.Content>
                          <Placeholder>
                            <Placeholder.Header image>
                              <Placeholder.Line length=" short" />
                              <Placeholder.Line length="very short" />
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Paragraph>
                          </Placeholder>
                          <Placeholder fluid style={{ height: "400px" }}>
                            <Placeholder.Image rectangular />
                            <Placeholder.Line length=" short" />
                          </Placeholder>
                        </Card.Content>
                      </Card>
                    ))}
                  </>
                  :
                  <NoData />
                }
              </> : null}

            <InfiniteScroll
              dataLength={state.feedRecord.length}
              next={nextPage}
              style={{ padding: "1px" }}
              hasMore={state.hashMore}
              endMessage={<p style={{ textAlign: 'center' }}><b>No more to show</b></p>}
              loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
            >
              {(state.feedRecord || []).map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <FeedCard
                      avatar={makeUserProfileImgURL(item.user_info.profile_pic)}
                      item={item}
                      user={item.user_info ? item.user_info : {}}
                      postTime={item.createdAt}
                      mediaUrls={item.mediaUrls}
                      likeCount={item.likeCount}
                      commentCount={item.commentCount}
                      shareCount={item.shareCount}
                    />
                  </React.Fragment>
                )
              })}
            </InfiniteScroll>

          </Grid.Column>
        </Grid>
      </Container>
    </>
  )
};
export default SaveFeedPostPage;