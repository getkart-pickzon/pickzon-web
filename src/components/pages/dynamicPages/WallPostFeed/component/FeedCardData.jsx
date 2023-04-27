import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Placeholder, Loader } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from 'lodash';
import { POST } from "../../../../../Services";
import { getUser, makeUserProfileImgURL } from "../../../../../utils/common";
import FeedCard from "../component/FeedCard";
import "./style.css";
import { FEED } from "../../../../../route/apiPath";

let fetchObj = {
  "userId": "",
  "pageNumber": 0,
  "pageLimit": 25,
  "search": "",
  "sort": {},
};

let defaultStateObj = {
  feedRecord: [],
  totalPage: 0,
  totalRecord: 0,
  hashMore: true,
  isLoader: false
};

const FeedCardData = () => {
  const [state, setState] = useState(defaultStateObj);
  let dispatch = useDispatch();
  const createFeedPost = useSelector((state) => state.createFeedPostReducers);
  let router = useHistory();
  let loggedUser = getUser();
  fetchObj.userId = loggedUser._id;

  useEffect(() => {
    try {
      function callEffect() {
        router.listen((result) => {
          try {
            setState((pre) => ({ ...pre, feedRecord: [] }));
            window.scrollTo(0, 0);
            fetchFeedData();
          } catch (er) { console.log(er); };
        });
        fetchFeedData();
        setState((pre) => ({ ...pre, feedRecord: [] }));

      }; callEffect();
    } catch (err) { console.log(err); };
  }, []);

  const fetchFeedData = useCallback(async (type) => {
    try {
      dispatch({ type: "wallPostCallback", payload: 0 });
      setState((pre) => ({ ...pre, isLoader: true }));
      let { status, message, payload } = await POST(FEED.FETCH_ALL_FEED, fetchObj);
      setState((pre) => ({ ...pre, isLoader: false }))
      if (status == 0) {
        return setState((pre) => ({ ...pre, hashMore: false }));
      };
      let feedObjData = [];
      if (type != 1) { feedObjData = state.feedRecord }
      feedObjData.push(...payload);
      setState((pre) => ({ ...pre, feedRecord: feedObjData }));
    } catch (er) { console.log(er); };
  }, [fetchObj.pageNumber]);

  if (createFeedPost.wallPostCallback === 1) {
    fetchFeedData(1);
  };

  const nextPage = useCallback((i) => {
    try {
      fetchObj.pageNumber = fetchObj.pageNumber + 1;
      fetchFeedData();
    } catch (er) { console.log(er); };
  }, [fetchObj.pageNumber]);

  const handleRefreshListing = (id) => {
    const refreshList = state.feedRecord.filter((item => item.id !== id));
    setState((pre) => ({ ...pre, feedRecord: refreshList }));
  }

  return (
    <>
      {state.feedRecord.length === 0 ?
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
        <InfiniteScroll
          dataLength={state.feedRecord.length}
          next={nextPage}
          style={{ padding: "1px", overflow: "hidden" }}
          hasMore={state.hashMore}
          endMessage={<p style={{ textAlign: 'center' }}><b>No Data Available</b></p>}
          loader={<h4 style={{ textAlign: 'center' }}>
            <Loader active inline='centered' >Loading...</Loader>
          </h4>}
        >
          {(state.feedRecord || []).map((item, index) => {
            item.profileImg = makeUserProfileImgURL(item.user_info.profile_pic);
            try {
              item.payloadData = item.payload.replace(/\n/g, "<br/>")
            } catch (er) { console.log(er); };

            return (
              <FeedCard
                key={index}
                item={item}
                user={item.user_info ? item.user_info : {}}
                feed="fCD-feed"
                handleRefreshListing={handleRefreshListing}
              />
            )
          })}
        </InfiniteScroll>}
    </>
  );
};
export default React.memo(FeedCardData);