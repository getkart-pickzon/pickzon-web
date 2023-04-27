import React, { useState, useEffect } from "react";
import { Table, Radio, Header, Image, Checkbox, Modal, Button, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import { POST } from "../../../../Services";
import CONFIG from "../../../../config/config.js"
import { getUser, NoData } from "../../../../utils/common";

const loggedUser = getUser();
// console.log(loggedUser);

const defaultObj = {
  "userId": loggedUser._id,
  "pageNumber": 0,
  "pageLimit": 10,
  "search": "",
  "sort": {}
};

const TagPeople = () => {
  const [open, setOpen] = useState(false)


  const [tagPeopleData, setTagPeopleData] = useState([]);
  const [value, setValue] = useState("");

  let dispatch = useDispatch();
  const tagPeopleReduxDetails = useSelector((state) => state.tagPeopleReducers);

  useEffect(() => {
    try {
      function callEffect() {
        fetchTagPeopleData();
        setValue(tagPeopleReduxDetails.taggedPeoples);
      }; callEffect();
    } catch (err) { console.log(err); };
  }, []);


  const fetchTagPeopleData = async () => {
    try {
      let { status, message, payload } = await POST("/user/fetch-all-followers-user", defaultObj);
      if (status == 0) { return console.log(message); }
      payload.forEach(element => { element.isSelectd = false });
      setTimeout(() => { setTagPeopleData(payload); }, 0);
    } catch (er) { console.log(er); };
  };

  const handleChange = (item, index) => {
    try {
      let tagP = tagPeopleData;
      let val = item.isSelectd == true ? false : true;
      tagP[index].isSelectd = val;
      setTagPeopleData([])
      setTagPeopleData(tagP);
      let filterTag = tagP.filter((ite) => { return ite.isSelectd === true }).map((iret) => { return iret.tiktokName });
      dispatch({ type: "tagPeople_data", payload: filterTag });
      setValue(item._id);
    } catch (er) { console.log(er); };
  };

  return (
    <>
      <Modal
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
        <Header icon='users' content='Tag ' />
        <Modal.Content scrolling>
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

      </Modal>

    </>
  );
};

export default React.memo(TagPeople);