import React, { useState, useEffect } from "react";
import { Table, Radio } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import { POST } from "../../../../../Services";

const defaultObj = {
  "pageNumber": 0,
  "pageLimit": 50,
  "search": "",
  "sort": {}
};

const Feelings = () => {
  const [radioData, setRadioData] = useState([]);
  const [value, setValue] = useState("");

  let dispatch = useDispatch();
  const createFeedPostReduxDetails = useSelector((state) => state.createFeedPostReducers);

  useEffect(() => {
    try {
      function callEffect() {
        fetchFeelingsData();
        setValue(createFeedPostReduxDetails.expression?._id);
      }; callEffect();
    } catch (err) { console.log(err); };
  }, []);


  const fetchFeelingsData = async () => {
    try {
      let { status, message, payload } = await POST("/common/fetch-all-feeling", defaultObj);
      if (status == 0) { return console.log(message); };
      setTimeout(() => { setRadioData(payload); }, 0);
    } catch (er) { console.log(er); };
  };

  const handleChange = (item) => {
    try {
      item.type = "feeling";
      dispatch({ type: "expression_data", payload: item });
      setValue(item._id);
    } catch (er) { console.log(er); };
  };

  return (
    <>
      <Table basic='very'>
        <Table.Body>
          {(radioData || []).map((item, index) => {
            return <Table.Row key={index} >
              <Table.Cell>{item.image}{" "}{item.name}</Table.Cell>
              <Table.Cell textAlign="center">
                <Radio
                  value={item._id === value}
                  checked={item._id === value}
                  onChange={() => handleChange(item, index)}
                />
              </Table.Cell>
            </Table.Row>
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default React.memo(Feelings);