import React, { useEffect, useState } from 'react';
import { Image, List, Input, Popup, Icon } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import { makeUserProfileImgURL, trimUserName } from '../../../utils/common';
import { USER } from '../../../route/apiPath';
import { GET } from '../../../Services';
import "./style.css"

const Globalsearch = () => {
  let router = useHistory();
  const [searchResult, setSearchResult] = useState([]);
  const [defaultMessage, setDefaultMessage] = useState('');
  const [recentArr, setRecentArr] = useState([]);

  useEffect(() => {
    handleSelect();
  }, []);

  const searchHandler = async (e) => {
    let value = e.target.value
    setDefaultMessage(value);
    try {
      let { status, message, totalRecords, totalPages, payload } = await GET(USER.GLOBAL_SEARCH, { keyword: value });
      if (status === 0) { return console.log(message); }
      setSearchResult(payload || []);
    } catch (err) {
      console.log(err);
    }
  };

  const userProfile = (item) => {
    try {
      let _recentData = [];
      let recentData = JSON.parse(localStorage.getItem("recentSearch"));
      if (recentData == null) {
        _recentData.push(item)
      } else {
        _recentData.push(...recentData, item)
      };
      let ifUserExist = (recentData || []).filter((it) => {
        return it._id === item._id
      });
      if (!ifUserExist.length) {
        localStorage.setItem("recentSearch", JSON.stringify(_recentData));
      };

      let name = item.userName ? item.userName : item.name;
      router.push({
        pathname: "/user-profile/" + name,
        state: { id: item._id },
      });
      return window.location.reload()
    } catch (er) { console.log(er); };
  };

  const handleSelect = () => {
    try {
      let recentData = JSON.parse(localStorage.getItem("recentSearch"));
      let sortedArr = recentData.reverse();
      setRecentArr(sortedArr || []);
    } catch (err) {
      console.log(err);
    }
  }

  const handleClearAll = () => {
    try {
      localStorage.removeItem("recentSearch");
      setRecentArr([]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleRemove = (data, i) => {
    try {
      let removeItem = recentArr.filter((item, i) => {
        return item._id !== data._id;
      })
      localStorage.setItem("recentSearch", JSON.stringify(removeItem));
      setRecentArr(removeItem)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Popup
        className='search-result'
        position='bottom center'
        on='click'
        trigger={
          <Input placeholder='Search...' size='large' className='global-search-box' onChange={searchHandler} />
        }
      >
        <Popup.Content>
          {defaultMessage.length == 0 ?
            <>
              {recentArr.length == 0 ?
                <center>
                  <b> No Recent Search ...</b>
                  {/* <p>Search by name,pickzon-id & phone no.</p> */}
                </center>
                :
                <>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                    <b>Recent</b>
                    <a onClick={() => handleClearAll()}><b>Clear All</b></a>
                  </div>
                  {(recentArr || []).map((item, i) => {
                    return (
                      (
                        <List verticalAlign='middle' key={i} style={{ margin: "0.5em 0em" }} title={`${item.name}\n@${item.userName}`}>
                          <List.Item style={{ padding: "0" }} >
                            <Image bordered src={makeUserProfileImgURL(item.profilePic)} circular size="mini" style={{ width: "30px", height: "30px" }} />
                            <List.Content onClick={() => userProfile(item)} >
                              <List.Header as="a">{trimUserName(item.name, 20)}</List.Header>
                              <i>@{trimUserName(item.userName, 20)}</i>
                            </List.Content>
                            <List.Content as="a" floated='right' verticalAlign='middle' style={{ marginTop: "10px" }}>
                              <Icon name='delete' onClick={() => handleRemove(item, i)} color="grey" />
                            </List.Content>
                          </List.Item>
                        </List>
                      )
                    )
                  })}
                </>
              }
            </>
            :
            <>
              {(searchResult || []).map((person, i) => {
                return (
                  (
                    <List selection verticalAlign='middle' key={i} title={`${person.name}\n@${person.userName}`}>
                      <List.Item onClick={() => userProfile(person)} >
                        <Image circular src={makeUserProfileImgURL(person.profilePic)} size="mini" style={{ width: "30px", height: "30px" }} />
                        <List.Content >
                          <List.Header as="h5" >{trimUserName(person.name, 20)}</List.Header>
                          <i>@{trimUserName(person.userName, 20)}</i>
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
    </>
  );
}


export default Globalsearch;
