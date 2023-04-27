import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Container, Grid, Loader, Segment } from 'semantic-ui-react';
import { GET } from '../../../../Services';
import { SHAREDMEDIA } from '../../../../route/apiPath';
import { Helmet } from 'react-helmet';
import { HomeMeta } from '../../../../utils/meta';
import { NoData, openAppUrl } from '../../../../utils/common';
import PostCard from '../../../sub-component/postCard/PostCard';
import ProfilePage from '../../../sub-component/profilePage/ProfilePage';

let reqObject = {
  mediaId: "",
  postType: ""
}

const SharingPost = () => {
  const [state, setState] = useState({});
  const [loader, setLoader] = useState(0)
  let location = useLocation();
  reqObject.postType = location.pathname.split("/")[1]
  reqObject.mediaId = location.pathname.split("/")[2]

  useEffect(() => {
    fetchSharedData();
    // return () => {
    //   setState({});
    // };
  }, [])

  const fetchSharedData = async () => {
    try {
      setLoader(0)
      const { status, message, payload } = await GET(SHAREDMEDIA.FETCH_MEDIA, reqObject);
      if (status === 0) {
        return console.error(message);
      }
      setLoader(status)
      setState(payload);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(state)

  return (
    <>
      {
        loader == 0 && Object.keys(state).length === 0 ?
          <NoData message={`No ${reqObject.postType.charAt(0).toUpperCase()}${reqObject.postType.slice(1)} Available`} />
          :
          <>
            <Helmet>
              <title>{`@ ${state?.tiktokName ? state?.tiktokName : state?.userInfo?.tiktokName}`}</title>
              <link rel="canonical" href={window.location.href} />
              <meta name="description" content={state?.description ? state?.description : state?.userInfo?.description} data-react-helmet="true" />
              <meta name="keywords" content={state?.hashTags ? state?.hashTags : HomeMeta.keywords} data-react-helmet="true" />
            </Helmet>
            <>
              {reqObject.postType === 'profile' ?
                <ProfilePage
                  loader={loader}
                  profileType="0"
                  state={state}
                  userID={reqObject.mediaId}
                  profileDetail={[
                    { label: "Post", value: state?.feedCount },
                    { label: "Followers", value: state?.followersCount },
                    { label: "Following", value: state.followingCount }
                  ]}
                  profileList={[
                    { icon: "user", label: state.userInfo?.jobProfile ? state.userInfo?.jobProfile : null, link: null },
                    { icon: "linkify", label: state.userInfo?.website ? state.userInfo?.website : null, link: state.userInfo?.website, },
                    { icon: "map marker alternate", label: state.userInfo?.livesIn ? state.userInfo?.livesIn : null, link: null },
                  ]}
                  followStatus={state.followStatus = "Follow"}
                />
                :
                <Container>
                  <Grid centered style={{ margin: "auto" }} verticalAlign='middle'>
                    <Grid.Column mobile={16} tablet={12} computer={12} largeScreen={8} widescreen={8} style={{ padding: "1em 0em" }}>
                      <PostCard
                        avatar={state?.ProfilePic}
                        profileName={state?.profileName ? state?.profileName : state?.tiktokName}
                        postLocation={state?.postLocation}
                        postTime={state?.postTime}
                        activitiesData={state?.activitiesData}
                        feelingData={state?.feelingData}
                        tagList={state?.tagList}
                        postDescription={state?.description}
                        hashTags={state?.hashTags}
                        mediaUrls={state?.mediaUrls}
                        likeCount={state?.likeCount}
                        shareCount={state?.sharedCount}
                        commentCount={state?.commentCount}
                      />
                    </Grid.Column>
                  </Grid>
                </Container>}
            </>
          </>
      }
      <Segment basic style={{ position: "fixed", bottom: "0rem", zIndex: "999", left: "50%", transform: "translate(-50%, 0)", width: "40rem", padding: "0" }}>
        <Button
          fluid
          content="Download the App Now"
          positive
          onClick={() => openAppUrl()}
        />
      </Segment>
    </>
  );
}

export default SharingPost;