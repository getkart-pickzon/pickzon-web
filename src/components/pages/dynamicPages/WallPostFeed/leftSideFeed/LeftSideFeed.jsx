import React, { useEffect, useState } from "react";
import { getUser } from "../../../../../utils/common";
import FriendSuggestionList from "./FriendSuggestionList";
// import SidePromo from "./SidePromo"
import "../style.css";

let fetchObj = {
  "userId": "",
  "pageNumber": 0,
  "pageLimit": 10,
  "statusValue": "",
  "filterValue": "",
  "search": "",
  "sort": {},
  "timeZone": ""
};

let defaultStateObj = {
  feedRecord: [],
  totalPage: 0,
  totalRecord: 0,
  hashMore: true,
  isLoader: false
};

const LeftSideFeed = () => {
  const [state, setState] = useState(defaultStateObj);
  let loggedUser = getUser();
  fetchObj.userId = loggedUser._id;

  useEffect(() => {
    try {
      function callEffect() {

      }; callEffect();
    } catch (err) { console.log(err); };
  }, []);

  return (
    <>
      <FriendSuggestionList />
      {/* <SidePromo /> */}
    </>
  );
};
export default React.memo(LeftSideFeed);