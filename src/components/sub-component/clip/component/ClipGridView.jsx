import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Grid,
  Placeholder,
  Segment,
  Image,
  Icon,
  Loader
} from "semantic-ui-react";
import _ from 'lodash';
import InfiniteScroll from "react-infinite-scroll-component";

import { POST } from "../../../../Services";
import { ComingSoon, getUser, NoData } from "../../../../utils/common";

import ClipModal from "./clipModal/ClipModal"

import "./style.css"

let fetchObj = {
  userId: "",
  followedUserId: "",
  pageNumber: 0,
  pageLimit: 10,
  statusValue: "",
  search: "",
  sort: {},
  timeZone: "",
};

let defaultStateObj = {
  clipRecord: [],
  hashMore: true,
};

let _isVideoId = ""

const ClipGridView = ({ userId = "" }) => {
  let loggedUser = getUser();

  userId = userId ? userId : loggedUser._id;
  fetchObj.userId = loggedUser._id;
  fetchObj.followedUserId = userId;

  const [state, setState] = useState(defaultStateObj);
  const [loader, setLoader] = useState("")
  const [clipData, setClipData] = useState("")
  const [viewClipModal, setViewClipModal] = useState(false);


  useEffect(() => {
    try {
      function callEffect() {
        fetchClipFeed();
      }; callEffect();
    } catch (er) {
      console.log(er);
    };
  }, []);

  const fetchClipFeed = async () => {
    try {
      let { status, message, payload } = await POST("/clip/fetch-all-user-clips", fetchObj);
      if (status === 0) {
        console.log("fetchClipCardDataMessage ", message);
        return setState((pre) => ({ ...pre, hashMore: false }));
      };

      (payload || []).forEach(element => { element.isPlay = false; });

      let clipData = state.clipRecord;
      clipData.push(...payload);

      setLoader(status);
      setState((pre) => ({ ...pre, clipRecord: clipData }));

    } catch (err) { console.log(err); };
  };

  const viewClip = (item) => {
    try {
      setClipData(item);
      setViewClipModal(true);
    } catch (er) { console.log(er); };
  };

  const parentCallback = (value) => {
    setViewClipModal(value)
  };

  const nextPage = useCallback((i) => {
    try {
      fetchObj.pageNumber = fetchObj.pageNumber + 1;
      fetchClipFeed();
    } catch (er) { console.log(er); };
  }, [fetchObj.pageNumber]);


  const clipList = (state.clipRecord || []).map((item, index) => {
    return (
      <Grid.Column
        computer={5}
        tablet={8}
        mobile={16}
        className="clip-grid-wrapper"
      >
        <Card
          key={index}
          onClick={() => viewClip(item)}
          className="clip-grid-card-view"
        >
          <Image
            src={item.thumUrl}
            ui={false}
            className="clip-grid-card-img"
          />
          <Button.Group
            vertical
            basic
            className="clip-grid-card-status"
          >
            <Button className="clip-grid-card-status-btn"  >
              <Icon name="eye" size="large" />
              <a>{item.totalView}</a>
            </Button>
            <Button className="clip-grid-card-status-btn">
              <Icon name="like" size="large" />
              <a>{item.totalLike}</a>
            </Button>
            <Button className="clip-grid-card-status-btn">
              <Icon name="comment outline" size="large" />
              <a>{item.totalComment}</a>
            </Button>
          </Button.Group>
        </Card>
      </Grid.Column >
    );
  });

  return (
    <>
      {state.length === 0 ?
        <>
          {loader == 1 ? <NoData message="You have no clips for view" /> :
            <Segment basic style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
              {Array(9).fill(
                <Card style={{ width: "200px", marginTop: "0px" }}>
                  <Card.Content>
                    <Placeholder>
                      <Placeholder style={{ height: 280 }}>
                        <Placeholder.Image />
                      </Placeholder>
                      <Placeholder.Header image >
                        <Placeholder.Line length='medium' />
                        <Placeholder.Line length='full' />
                      </Placeholder.Header>
                    </Placeholder>
                  </Card.Content>
                </Card>
              ).map((item) => {
                return item
              })}
            </Segment>
          }
        </>
        :
        <InfiniteScroll
          dataLength={state.clipRecord.length}
          next={nextPage}
          style={{ padding: "1px", overflow: "hidden" }}
          hasMore={state.hashMore}
          endMessage={<p style={{ textAlign: 'center' }}><b>No Data Available</b></p>}
          loader={<h4 style={{ textAlign: 'center' }}>
            <Loader active inline='centered' >Loading...</Loader>
          </h4>}
        >
          <Grid className="clip-grid">
            {clipList}
            {/* <ComingSoon /> */}
            <ClipModal clipData={clipData} viewClipModal={viewClipModal} parentCallback={parentCallback} />
          </Grid>
        </InfiniteScroll>
      }
    </>
  );
};
export default React.memo(ClipGridView);
