import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { POST } from "../../../Services";
import { makeUserProfileImgURL, SkinTone, NoData, htmlData } from "../../../utils/common";
import { PUBLIC } from "../../../route/apiPath";
import PostCard from "./PostCard";

let fetchObj = { pageNumber: 0, pageLimit: 25, userId: "" }

let defaultStateObj = {
  userFeedRecord: [],
  totalPage: 0,
  totalRecord: 0,
  hashMore: true,
  isLoader: false
};

const PublicPostCard = ({ userID }) => {
  const [state, setState] = useState(defaultStateObj);
  fetchObj.userId = userID

  useEffect(() => {
    try {
      function callEffect() {
        fetchFeedData();
      }
      callEffect();
    } catch (err) { console.log(err); };
  }, []);

  const fetchFeedData = useCallback(async () => {
    try {
      setState((pre) => ({ ...pre, isLoader: true }));
      if (fetchObj.pageNumber === 0) {
        setState((pre) => ({ ...pre, userFeedRecord: [] }));
      };
      let { status, message, payload } = await POST(PUBLIC.FETCH_USER_FEED, fetchObj);
      setState((pre) => ({ ...pre, isLoader: false }))
      if (status == 0) {
        return setState((pre) => ({ ...pre, hashMore: false }));
      };
      let feedObjData = [];
      feedObjData.push(...payload);
      setState((pre) => ({ ...pre, userFeedRecord: feedObjData }));
    } catch (er) { console.log(er); };
  }, [fetchObj.pageNumber]);

  const nextPage = useCallback((i) => {
    try {
      fetchObj.pageNumber = fetchObj.pageNumber + 1;
      fetchFeedData();
    } catch (er) { console.log(er); };
  }, [fetchObj.pageNumber]);

  return (
    <>
      {state.userFeedRecord.length === 0 ?
        <>
          {state.isLoader == true ? <SkinTone /> : <NoData message="No post to show" />}
        </>
        :
        <InfiniteScroll
          dataLength={state.userFeedRecord.length}
          next={nextPage}
          style={{ padding: "1px" }}
          hasMore={state.hashMore}
          endMessage={<p style={{ textAlign: 'center' }}><b>No more data Available</b></p>}
          loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        >
          {(state.userFeedRecord || []).map((item, i) => {
            return (
              <PostCard
                key={i}
                avatar={makeUserProfileImgURL(item?.user_info?.profile_pic)}
                profileName={item?.user_info?.first_name ? item?.user_info?.first_name : item?.user_info?.Tiktokname}
                postLocation={item?.timeZone}
                postTime={item?.feedTime}
                activitiesData={item?.activitiesData}
                feelingData={item?.feelingData}
                tagList={item?.tag}
                postDescription={item.payload}
                hashTags={[]}
                mediaUrls={item?.mediaUrls}
                likeCount={item?.isLike}
                shareCount={item?.shareCount}
                commentCount={item?.commentCount}
              />)
          })}
        </InfiniteScroll>
      }
    </>
  );
};
export default React.memo(PublicPostCard);