import React from 'react'
import { Grid, Button, Image, Container, Header, Segment, List, Icon, Placeholder, Popup } from "semantic-ui-react";
import { copyTextBtn, getUser, htmlData, makeUserProfileImgURL, openAppUrl, openLink, SkinTone, trimUserName } from "../../../utils/common";

import verifyImage from "../../../assets/images/verify.png";
import CenterItem from "../../../components/pages/dynamicPages/userInfo/component/CenterContent"
import EditUserProfile from "../../../components/pages/dynamicPages/userInfo/component/EditUserProfile";
import FriendSuggestionList from '../../pages/dynamicPages/WallPostFeed/leftSideFeed/FriendSuggestionList';
import Assets from "../../../assets/Assets";
import "./style.css";
import UserListing from '../../pages/dynamicPages/userInfo/component/UserListing';
import PublicPostCard from '../postCard/PublicPostCard';
import RightSideFeed from '../../pages/dynamicPages/WallPostFeed/rightSideFeed/RightSideFeed';

const ProfilePage = (
  { profileType,
    state,
    loader,
    followUnFollowModal,
    userID,
    profileList,
    profileDetail,
    followUnFollowBtn,
    followUnFollowBtn1,
    followUserBtn,
    fetchUserDetails,
    followStatus
  }) => {
  return (
    <Container className="user-profile-container">
      <Grid centered stackable style={{ margin: "7px" }}>
        <Segment className="cover-img-wrapper boderless">
          {loader === 0 ?
            <Segment style={{ width: "100%", padding: "0" }}>
              <Placeholder fluid>
                <Placeholder.Image rectangular />
              </Placeholder>
            </Segment>
            :
            <>
              <Image
                style={{ objectFit: "cover", width: "100%" }}
                centered
                src={state.userInfo?.coverImage ?? Assets.defaultPlaceholders.landscape.img}
              />
              {state.loggedUserProfile ?
                <EditUserProfile btnStyle="cover-upload-btn" callBack={fetchUserDetails} />
                : null}
            </>}
        </Segment>
        <Grid.Column mobile={16} tablet={8} computer={4} widescreen={3} className="grid-container">
          <div style={{ position: "sticky", top: "-7rem" }}>
            <Segment className="profile-img-wrapper boderless" title={state.userInfo?.firstName}>
              <div className="profile-box">
                {loader === 0 ?
                  <Placeholder style={{ width: "220px", height: "220px", borderRadius: "50%", margin: "-40px auto 0 auto" }}>
                    <Placeholder.Image square />
                  </Placeholder>
                  :
                  <>
                    <Image
                      className="profile-circle"
                      size="medium"
                      circular
                      centered
                      bordered
                      src={makeUserProfileImgURL(state.userInfo?.profilePic)}
                    />
                    {state.loggedUserProfile ?
                      <EditUserProfile btnStyle="profile-upload-btn" callBack={fetchUserDetails} />
                      : null}
                  </>}
              </div>
              <Segment textAlign="center" basic style={{ width: "50%", margin: "2em auto 0 auto", paddingBottom: "0", width: "100%" }}>
                {loader === 0 ?
                  <Placeholder  >
                    <Placeholder.Header >
                      <Placeholder.Line length='full' />
                      <Placeholder.Line length='medium' />
                    </Placeholder.Header>
                  </Placeholder>
                  :
                  <Header as='h2' icon>
                    <>
                      {trimUserName(state.userInfo?.firstName, 25)}
                      {state.userInfo?.celebrity === 1 ?
                        <img src={verifyImage}
                          style={{ height: "25px", width: '25px', position: 'absolute', marginLeft: '3px' }} />
                        : null}
                    </>
                    <Header.Subheader as="i" title={state.userInfo?.userName}>
                      @{trimUserName(state.userInfo?.userName, 20)}
                    </Header.Subheader>
                  </Header>}
              </Segment>
              {loader === 0 ?
                <Button.Group basic style={{ width: "100%", border: "none" }}>
                  {Array(3).fill(<Button>
                    <Placeholder style={{ height: "25px", width: "80%", margin: "0 auto" }}>
                      <Placeholder.Image square />
                    </Placeholder>
                  </Button>).map(item => item)}
                </Button.Group>
                :
                <Button.Group basic widths={3} fluid style={{ border: "none" }}                  >
                  {profileDetail.map((item, index) => {
                    return (<Button key={index}
                      onClick={profileType == 0 ? (() => openAppUrl()) : (() => followUnFollowBtn(item))}                    >
                      <Header as='h4' icon>
                        {item.value}
                        <Header.Subheader  >
                          {item.label}
                        </Header.Subheader>
                      </Header>
                    </Button>)
                  })}
                </Button.Group>}
              {followUnFollowModal == true && <UserListing loading={followUnFollowModal} item={{ id: userID }}
                callback={followUnFollowBtn1}
              />}
              {loader === 0 ?
                <Segment basic style={{ width: "100%", padding: "0", }}>
                  <Placeholder fluid style={{ height: "30px", borderRadius: "20px" }}>
                    <Placeholder.Image rectangular />
                  </Placeholder>
                </Segment>
                :
                <>
                  {!state.loggedUserProfile ?
                    <Segment basic style={{ display: "flex", padding: "0px", width: "100%   " }}>
                      <Button color="blue" primary fluid circular
                        onClick={profileType == 0 ? (() => openAppUrl()) : (() => followUserBtn())}                      >
                        <Icon name={followStatus === "Follow" ? "add user" : "user delete"} />
                        {followStatus}
                      </Button>
                      {/* <Popup
                        trigger={
                          <Button icon basic size="mini" onClick={() => copyTextBtn(state.userInfo?.userName)}>
                            <Icon name={"copy outline"} />
                          </Button>
                        }
                        content={`Click for copy Pickzon id :@ ${state.userInfo?.userName}`}
                        on='hover'
                        position='top'
                        size="mini"
                      /> */}
                    </Segment>
                    : null}
                </>}
            </Segment>
            {state.loggedUserProfile || state.userInfo?.userType === 0 ?
              <Segment className="boderless">
                <List>
                  <List.Header as="h3" style={{ margin: "0px" }}>About</List.Header>
                  <List.Description>{htmlData(state?.userInfo?.description)}</List.Description>
                  {profileList.map((item, index) => {
                    if (item.label === null) { return }
                    return <List.Item key={index}>
                      <List.Icon name={item.icon} />
                      <List.Content>
                        {item.link ?
                          <List.Item as="a" onClick={() => openLink(item.link)}>{item.label}</List.Item>
                          : item.label}
                      </List.Content>
                    </List.Item>
                  })}
                </List>
              </Segment>
              : null}
          </div>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8} widescreen={6} className="grid-container">
          <Segment className="boderless" padded>
            {state.loggedUserProfile || state.userInfo?.userType === 0 ?
              <>
                {profileType == 1 ?
                  <CenterItem userID={userID} loading={loader} profileType={profileType} />
                  :
                  <PublicPostCard userID={userID} />
                }
              </>
              :
              <>
                {loader === 0 ? <SkinTone /> :
                  <Segment padded textAlign="center" basic placeholder>
                    <Header as='h1' icon>
                      <Icon name='lock' circular color="grey" />
                      This Account is Private.
                      <Header.Subheader>
                        Follow this account to see their posts.
                      </Header.Subheader>
                    </Header>
                  </Segment>}
              </>}
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={4} widescreen={3} className="grid-container">
          {profileType == 1 ?
            <div style={{ position: "sticky", top: "4.4rem" }}>
              <FriendSuggestionList className="boderless" />
            </div>
            :
            <div style={{ position: "sticky", top: "4.4rem" }}>
              <RightSideFeed />
            </div>
          }
        </Grid.Column>
      </Grid>
    </Container >
  )
}

export default React.memo(ProfilePage);