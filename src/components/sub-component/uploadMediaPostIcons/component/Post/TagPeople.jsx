import React, { useState, useEffect, useCallback } from "react";
import { Table, Label, Header, Image, Checkbox, Modal, Button, List, Input, Popup } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import { POST } from "../../../../../Services";
import CONFIG from "../../../../../config/config.js"
import { getUser, makeUserProfileImgURL, NoData, trimUserName } from "../../../../../utils/common";

const loggedUser = getUser();

const defaultObj = {
  "userId": "",
  "followedUserId": "",
  "pageNumber": 0,
  "pageLimit": 10,
  "search": "",
  "sort": {}
};

const tagPeopleArr = [];

const TagPeople = () => {
  // const [open, setOpen] = useState(false);
  const [fetchData, setFetchData] = useState(defaultObj);
  const [tagPeopleData, setTagPeopleData] = useState([]);

  const [status, setStatus] = useState("");


  let dispatch = useDispatch();
  const createFeedPost = useSelector((state) => state.createFeedPostReducers);

  // useEffect(() => {
  //   try {
  //     function callEffect() {
  //       fetchTagPeopleData();

  //     }; callEffect();
  //   } catch (err) { console.log(err); };
  // }, [fetchData]);

  // const fetchTagPeopleData = useCallback(async (search = "") => {
  //   try {
  //     // debugger
  //     fetchData.userId = loggedUser._id;
  //     fetchData.followedUserId = loggedUser._id;
  //     fetchData.pageNumber = 0;
  //     fetchData.search = search;
  //     let { status, message, payload } = await POST("/user/fetch-all-followers-user", fetchData);
  //     if (status == 0) { return console.log(message); }

  //     let payloadLength = payload.length;
  //     for (let ti = 0; ti < payloadLength; ti++) {
  //       let element = payload[ti];
  //       let filterVl = createFeedPost.taggedPeoples.filter((it => {
  //         return it === element.tiktokName
  //       }));
  //       if (!filterVl.length) {
  //         payload[ti].isSelectd = false
  //       } else {
  //         payload[ti].isSelectd = true
  //       };
  //     };
  //     setTagPeopleData(payload);
  //   } catch (er) { console.log(er); };
  // }, [fetchData]);

  // const handleChange = (item, index) => {
  //   try {
  //     let tagP = tagPeopleData;
  //     let val = item.isSelectd == true ? false : true;
  //     tagP[index].isSelectd = val;
  //     setTagPeopleData([])
  //     setTagPeopleData(tagP);
  //     let filterTag = tagP.filter((ite) => { return ite.isSelectd === true }).map((iret) => { return iret.tiktokName });
  //     if (createFeedPost.taggedPeoples.length)
  //       filterTag.push(...createFeedPost.taggedPeoples);
  //     filterTag = [...new Set(filterTag)];
  //     dispatch({ type: "tagPeople_data", payload: filterTag });
  //   } catch (er) { console.log(er); };
  // };
  const fetchTagPeopleData = async (val) => {
    try {
      fetchData.search = val;
      fetchData.userId = loggedUser._id;
      fetchData.followedUserId = loggedUser._id;
      fetchData.pageNumber = 0;
      let { status, message, payload } = await POST("/user/fetch-all-followers-user", fetchData);
      if (status == 0) {
        setStatus(false)
        return console.log(message);
      }
      setTagPeopleData(payload);
    } catch (er) { console.log(er); };
  };

  const onSearch = (e) => {
    let value = e.target.value;
    if (value.length > 3) {
      fetchTagPeopleData(value);
    } else if (value.length == 0) {
      setFetchData((pre) => ({
        ...pre,
        search: ""
      }))
      setTagPeopleData([])
      setStatus(true)
    }
  };

  const handleClick = (item) => {
    let person = item.tiktokName
    tagPeopleArr.push(person)
    let uniqueArr = [...new Set(tagPeopleArr)];
    // let uniqueArr = tagPeopleArr.filter((c, index) => { return tagPeopleArr.indexOf(c) === index })
    dispatch({ type: "tagPeople_data", payload: uniqueArr });
  };

  return (
    <>
      <Popup
        trigger={
          <Input
            action={{ icon: 'users' }}
            actionPosition="left"
            placeholder="Tag Friend"
            // title={state.placePlaceHolder}
            className="width-100 width-80"
            style={{
              height: `auto`,
            }}
            onChange={(e) => onSearch(e)}
          />
        }
        on='focus?focus:click'
      >
        <Popup.Content>
          {tagPeopleData.length == 0 ?
            <>
              {status === false ? "Friend not found" : "Tag Friend by searching "}
            </>
            :
            <>
              {(tagPeopleData || []).map((person, i) => {
                console.log(tagPeopleData)
                return (
                  (
                    <List selection verticalAlign='middle' key={i} >
                      <List.Item onClick={() => handleClick(person)}>
                        <Image circular src={makeUserProfileImgURL(person.profilePic)} size="mini" style={{ width: "30px", height: "30px" }} />
                        <List.Content >
                          <List.Header as="h5" >{trimUserName(person.firstName, 20)}</List.Header>
                          <i>@{trimUserName(person.tiktokName, 14)}</i>
                        </List.Content>
                      </List.Item>
                    </List>
                  )
                )
              })}
            </>
          }


        </Popup.Content>
      </Popup>
      <>
        {/* <Modal
          size="mini"
          closeIcon
          open={open}
          trigger={
            <Button icon labelPosition="left" fluid basic>
              <Icon name='users' /> Tag People
            </Button>}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          <Modal.Header>
            <Icon name="users" />
            Tag Peoples
            <Label compact basic style={{ float: "right" }}>
              <Input size='mini' icon='search' placeholder='Search Peoples...' transparent onChange={onSearch} />
            </Label>
          </Modal.Header>        <Modal.Content scrolling>
            <Table basic='very'>
              <Table.Body>
                {tagPeopleData.length == 0 ? <NoData message="No friends to tag" /> :
                  <>
                    {(tagPeopleData || []).map((item, index) => {
                      return <Table.Row key={index}>
                        <Table.Cell>
                          <Header as='h4' image>
                            <Image src={CONFIG.imageURL + item.profilePic} circular />
                            <Header.Content>
                              {item.firstName}
                              <Header.Subheader>{item.tiktokName}</Header.Subheader>
                            </Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>
                          <Checkbox
                            value={item.isSelectd === true}
                            checked={item.isSelectd === true}
                            onChange={() => handleChange(item, index)}
                          />
                        </Table.Cell>
                      </Table.Row>
                    })}
                  </>
                }
              </Table.Body>
            </Table>
          </Modal.Content>
          <Button fluid onClick={() => setOpen(false)} primary>Done</Button>

        </Modal> */}
      </>
    </>
  );
};

export default React.memo(TagPeople);