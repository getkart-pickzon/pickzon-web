import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Placeholder, Image, Card } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from 'lodash';

import { POST } from "../../../../Services";
import { getUser, makeUserProfileImgURL, SkinTone, NoData } from "../../../../utils/common";
import FeedCard from "../../../pages/dynamicPages/WallPostFeed/component/FeedCard";
// import NoData from "../../../pages/staticPages/NoData";

let fetchObj = {
  "userId": "",
  "pageNumber": 0,
  "pageLimit": 10,
  "search": "",
  "sort": {},
};

let defaultStateObj = {
  userTagFeedRecord: [],
  totalPage: 0,
  totalRecord: 0,
  hashMore: true,
  isLoader: false
};

const TagFeedListCard = ({ userId = "" }) => {
  const [state, setState] = useState(defaultStateObj);

  let router = useHistory();
  let loggedUser = getUser();
  fetchObj.userId = loggedUser._id;
  fetchObj.followingId = userId;

  useEffect(() => {
    try {
      function callEffect() {
        window.scrollTo(0, 0);
        router.listen(() => {
          try {
            setState((pre) => ({ ...pre, userTagFeedRecord: [] }));
            window.scrollTo(0, 0);
          } catch (er) { console.log(er); };
        });
        setState((pre) => ({ ...pre, userTagFeedRecord: [] }));
        fetchTaggedFeedData();
      }; callEffect();
    } catch (err) { console.log(err); };
  }, []);

  const fetchTaggedFeedData = useCallback(async (type) => {
    try {
      setState((pre) => ({ ...pre, isLoader: true }));
      if (fetchObj.pageNumber === 0) {
        setState((pre) => ({ ...pre, userTagFeedRecord: [] }));
      }
      let { status, message, payload } = await POST('/feed/fetch-tagged-feed', fetchObj);
      setState((pre) => ({ ...pre, isLoader: false }))
      if (status == 0) {
        console.log("fetchUserData ", message);
        return setState((pre) => ({ ...pre, hashMore: false }));
      };
      let feedObjData = [];
      if (type != 1) { feedObjData = state.userTagFeedRecord };
      feedObjData.push(...payload);
      setState((pre) => ({ ...pre, userTagFeedRecord: feedObjData }));
    } catch (er) { console.log(er); };
  }, [fetchObj.pageNumber]);

  const nextPage = useCallback((i) => {
    try {
      fetchObj.pageNumber = fetchObj.pageNumber + 1;
      fetchTaggedFeedData();
    } catch (er) { console.log(er); };
  }, [fetchObj.pageNumber]);

  return (
    <>
      {state.userTagFeedRecord.length === 0 ?
        <>
          {state.isLoader == true ? <SkinTone listCount={fetchObj.pageLimit} /> : <NoData message="You have no tagged post" />}
        </>
        :
        <InfiniteScroll
          dataLength={state.userTagFeedRecord.length}
          next={nextPage}
          style={{ padding: "1px" }}
          hasMore={state.hashMore}
          endMessage={<p style={{ textAlign: 'center' }}><b>No More Data Available</b></p>}
          loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        >
          {(state.userTagFeedRecord || []).map((item, index) => {
            item.profileImg = makeUserProfileImgURL(item.user_info.profile_pic);
            try {
              item.payloadData = item.payload.replace(/\n/g, "<br />")
            } catch (er) { console.log(er); };
            return (
              <FeedCard
                feedType="tag"
                key={index}
                item={item}
                user={item.user_info ? item.user_info : {}}
              />
            )
          })}
        </InfiniteScroll>
      }
    </>
  );
};
export default React.memo(TagFeedListCard);
