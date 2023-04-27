import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { Feed, Modal, Button, Icon, Image } from 'semantic-ui-react';
import { COMMON } from '../../../route/apiPath';
import { POST } from '../../../Services';
import { getUser, ListPlaceholder, makeUserProfileImgURL, NoData, trimUserName } from "../../../utils/common";
import "./style.css"

const defaultObj = {
  userId: "",
  pageNumber: 0,
  pageLimit: 10,
  search: "",
  sort: {}
}

const Notification = ({ call, parent }) => {
  const loggedUser = getUser();
  let router = useHistory();
  const [loader, setLoader] = useState(0)
  const [state, setState] = useState({
    userCount: 0,
    fetchArr: [],
  });
  let preArrState = [];

  useEffect(() => {
    try {
      function callEffect() {
        fetchNotification();
      }; callEffect();
    } catch (err) { console.log(err); };
  }, []);

  const fetchNotification = useCallback(async (type) => {
    try {
      setLoader(0)
      defaultObj.userId = loggedUser?._id;
      defaultObj.pageNumber = type ? defaultObj.pageNumber + 1 : 0;
      let { status, message, payload } = await POST(COMMON.NOTIFICATION, defaultObj);
      if (status === 0) {
        return console.log(message);
      }
      if (defaultObj.pageNumber === 0) {
        setLoader(status)
        setState((pre) => ({
          ...pre,
          fetchArr: payload,
        }));
        preArrState = payload;
      } else {
        setLoader(status)
        preArrState.push(...payload);
        setState((pre) => ({
          ...pre,
          fetchArr: preArrState,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  }, [])

  const userProfile = (item) => {
    let name = (item.name || item.Name);
    let tik = (item.Tiktokname || item.tiktokName);
    try {
      let user = (tik ? tik : name)
      let id = (item.userId ? item.userId : item._id)
      router.push({
        pathname: "/user-profile/" + user,
        state: { id: id },
      });
      return window.location.reload();
    } catch (er) { console.log(er); };
  };

  return (
    <>
      {/* <Popup
        trigger={
          <Dropdown icon="bell" as="h2" basic onClick={() => fetchNotification()}>
            <Dropdown.Menu className="notifictaion-dropdown" >
              <Dropdown.Item >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                  <b>Notifications</b>
                  <a onClick={() => setOpen(true)}><b>See All</b></a>
                </div>
              </Dropdown.Item>
              {(state.fetchArr || []).map((person, i) => (
                <Feed className="notification-feed" key={i}>
                  <Feed.Event>
                    <Feed.Label image={makeUserProfileImgURL(person.ProfilePic)} className="notifcation-feed-img" />
                    <Feed.Content>
                      <Feed.Summary>
                        <a onClick={() => userProfile(person)}>{trimUserName(person.tiktokName, 15)}</a> {person?.content}
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        }
        position='bottom center'
        basic
        inverted
        className="navlinks-popup-right"
      >
        <Popup.Content>
          Notification
        </Popup.Content>
      </Popup> */}

      <Modal
        onClose={useCallback(() => { parent(false) }, [call])}
        open={call}
        size="tiny"
        closeIcon
      >
        <Modal.Header icon>
          <Icon name="bell outline" />
          Notifications
        </Modal.Header>
        <Modal.Content scrolling style={{ paddingTop: "0px", paddingBottom: "0px" }}>
          <Modal.Description>
            {
              loader === 0 ?
                <>
                  {
                    state.fetchArr.length !== 0 ?
                      <ListPlaceholder listCount={defaultObj.pageLimit} /> : <NoData message={"No notification to show"} />
                  }
                </>
                :
                <>
                  {(state?.fetchArr || []).map((person) => {
                    return (
                      <Feed className="notification-feed" key={person._id}>
                        <Feed.Event>
                          <Feed.Label image={makeUserProfileImgURL(person?.profilePic)} className="notifcation-feed-img" />
                          <Feed.Content>
                            <Feed.Summary>
                              <Feed.User onClick={() => userProfile(person)}>{trimUserName(person?.tiktokName, 20)}</Feed.User> {person?.content}
                            </Feed.Summary>
                          </Feed.Content>
                        </Feed.Event>
                      </Feed>
                    )
                  })}
                </>
            }
          </Modal.Description>
        </Modal.Content>
        {
          state.fetchArr.length > 9 &&
          <Modal.Actions>
            <Button compact disabled={loader === 0 ? true : false} onClick={() => fetchNotification(true)} >
              View More
            </Button>
          </Modal.Actions>
        }
      </Modal >
    </>
  );
}
export default React.memo(Notification);
