import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from 'lodash';
import { POST } from "../../../../../Services";
import { getUser, makeUserProfileImgURL, SkinTone, NoData } from "../../../../../utils/common";
import FeedCard from "./FeedCard";
import { FEED } from "../../../../../route/apiPath";
import "./style.css";
import { Loader } from "semantic-ui-react";

let fetchObj = {
  "userId": "",
  "followingId": "",
  "pageNumber": 0,
  "pageLimit": 10,
  "search": "",
  "sort": {},
};

let defaultStateObj = {
  userFeedRecord: [],
  totalPage: 0,
  totalRecord: 0,
  hashMore: true,
  isLoader: false,
  message: ""
};

let feedObjData = [];

let loader = (<div style={{ overflow: "hidden", display: "flex", justifyContent: "center" }}>
  <Loader active inline content='Loading' />
</div>)

const FeedCardUserData = ({ userId = null }) => {
  const [state, setState] = useState(defaultStateObj);
  // let dispatch = useDispatch();
  // const createFeedPost = useSelector((state) => state.createFeedPostReducers);
  // const userDetials = useSelector((state) => state.userDetials);
  let router = useHistory();
  let loggedUser = getUser();
  fetchObj.userId = loggedUser._id;
  fetchObj.followingId = userId;

  useEffect(() => {
    try {
      console.clear()
      function callEffect() {
        window.scrollTo(0, 0);
        router.listen((result) => {
          try {
            fetchObj.pageNumber = 0
            fetchObj.followingId = result.state?.id;
            setState((pre) => ({ ...pre, userFeedRecord: [] }));
            // feedObjData = [];
            window.scrollTo(0, 0);
            fetchFeedData();
          } catch (er) { console.log(er); };
        });
      }; callEffect();
      fetchFeedData();

    } catch (err) { console.log(err); };
  }, []);

  const fetchFeedData = useCallback(async (type) => {
    try {
      // dispatch({ type: "wallPostCallback", payload: 0 });
      // setState((pre) => ({ ...pre, isLoader: true }));
      // if (fetchObj.pageNumber === 0) {
      //   setState((pre) => ({ ...pre, userFeedRecord: [] }));
      // };
      setState((pre) => ({ ...pre, isLoader: true }));
      let { status, message, payload } = await POST(FEED.FETCH_ALL_USER_FEED, fetchObj);
      if (status == 0) {
        console.log(message)
        return setState((pre) => ({ ...pre, hashMore: false, isLoader: true, message: message }));
      };
      setState((pre) => ({ ...pre, isLoader: false, message: message }));
      if (fetchObj.pageNumber == 0) {
        setState((pre) => ({ ...pre, userFeedRecord: payload }));
        feedObjData = payload;
      } else {
        feedObjData.push(...payload);
        setState((pre) => ({ ...pre, userFeedRecord: feedObjData }));
      }
      // let feedObjData = [];
      // if (type != 1) { feedObjData = state.userFeedRecord };
      // feedObjData.push(...payload);
      // setState((pre) => ({ ...pre, userFeedRecord: feedObjData }));
    } catch (er) { console.log(er); };
  }, []);

  // if (createFeedPost.wallPostCallback === 3) {
  //   fetchFeedData(1);
  // };

  const nextPage = (i) => {
    try {
      fetchObj.pageNumber = fetchObj.pageNumber + 1;
      fetchFeedData();
    } catch (er) { console.log(er); };
  };

  return (
    <>
      {state.userFeedRecord.length === 0 ?
        <>
          {state.isLoader == true ? <SkinTone listCount={fetchObj.pageLimit} /> : <NoData message={state.message} />}
        </>
        :
        <InfiniteScroll
          dataLength={state.userFeedRecord.length}
          next={() => nextPage()}
          style={{ padding: "1px" }}
          hasMore={state.hashMore}
          endMessage={<p style={{ textAlign: 'center' }}><b>No Data Available</b></p>}
          loader={loader}
        >
          {(state.userFeedRecord || []).map((item, index) => {
            item.profileImg = makeUserProfileImgURL(item.user_info.profile_pic)
            try {
              item.payloadData = item.payload.replace(/\n/g, "<br />")
            } catch (er) { console.log(er); };
            return (
              <FeedCard
                feedType="userFeed"
                key={index}
                item={item}
                user={item.user_info ? item.user_info : {}}
                feed="fCUD-profile"
              />
            )
          })}
        </InfiniteScroll>
      }
    </>
  );
};
export default React.memo(FeedCardUserData);