// import React from "react";
// import { Button, Dropdown, Icon, } from "semantic-ui-react";
// import { getUser } from "../../../../../../../../utils/common";

// import DotMenu from "./dotMenu/DotMenu";

// import "./style.css"

// const ClipMenu = ({ clipData }) => {
//   let loggedUser = getUser();

//   return (
//     <Button.Group icon basic style={{ border: "none", }}>
//       < DotMenu clipData={clipData} loggedUser={loggedUser} />
//     </Button.Group>
//   );
// }
// export default React.memo(ClipMenu);

import React, { useState } from "react";
import { Button, Dropdown, Icon, Modal, Form, TextArea } from "semantic-ui-react";

import { POST, GET } from "../../../../../../../../Services";
import { getUser } from "../../../../../../../../utils/common";
import { notifyToast } from "../../../../../../../../utils/Toast";


const feedActionDropOptions = [
  { key: "1", text: "Not intreseted", icon: "dont" },
  { key: "2", text: "Report", icon: "warning sign" },
];

const ClipMenu = ({ clipData, userID = "" }) => {
  let loggedUser = getUser();
  const [submitReport, setSubmitReport] = useState({
    userId: userID,
    clipId: "",
    reportId: "",
    description: ""
  });
  const [clipNo, setClipNo] = useState("")
  const [reportClipModal, setReportClipModal] = useState(false);
  const [reportClipLabel, setReportClipLabel] = useState([]);
  const [reportValue, setReportValue] = useState({ reportId: "5f5a21b57808b526b8958ce4", description: "Please do not show this type of video" });
  const [customText, setCustomText] = useState("");

  const clipActionBtn = async (clipId, option) => {
    try {
      if (option.text === "Not intreseted") {
        let blockObj = { userId: loggedUser._id, clipId: clipId };
        const { status, message } = await POST("/clip/not-interested-clip", blockObj);
        if (status === 0) {
          return notifyToast(message, "info", "top");
        }
        notifyToast(message, "success", "top");
      } else if (option.text === "Report") {
        const { payload } = await GET("/common/fetch-all-report", {
          pageNumber: 0,
          pageLimit: 50,
          search: "",
          sort: {}
        })
        setClipNo(clipId);
        setReportClipModal(true);
        setReportClipLabel(payload || []);
      }
    } catch (er) {
      console.log(er);
    }
  };

  const submitClipReportBtn = async () => {
    submitReport.userId = clipData._id
    submitReport.clipId = clipNo;
    submitReport.reportId = reportValue.reportId;
    submitReport.description = reportValue.description;
    try {
      let { status, message, payload } = await POST("/clip/report-clip", submitReport);
      if (status === 0) {
        return notifyToast(message, "info", "top")
      } else {
        notifyToast(message, "info", "top")
      }
      setSubmitReport(() => ({
        clipId: clipNo,
        reportId: reportValue.reportId,
        description: reportValue.description
      }))
      setReportClipModal(false);
    } catch (err) {
      console.log(err)
    }
  };

  const handleChange = (e) => {
    let val = e.target.value;
    setCustomText(val);
  }

  return (
    <Button.Group icon basic style={{ border: "none", }}>
      {loggedUser._id !== clipData.from &&
        <Button style={{ paddingRight: "0px" }}>
          <Dropdown
            icon="ellipsis horizontal"
            pointing="top right"
            direction="left"
            as="a"
          >
            <Dropdown.Menu>
              {(feedActionDropOptions || []).map((option) => {
                return <Dropdown.Item
                  key={option.value}
                  {...option}
                  onClick={() => clipActionBtn(clipData._id, option)}
                />
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Button>
      }
      <Modal
        closeIcon
        open={reportClipModal}
        onClose={() => setReportClipModal(false)}
        onOpen={() => setReportClipModal(true)}
        size="mini"
      >
        <Modal.Header>
          <Icon name="warning sign" />
          Report</Modal.Header>
        <Modal.Content>
          <Form>
            {(reportClipLabel || []).map((rItem, i) => {

              return (
                <Form.Radio
                  key={i}
                  label={rItem.name}
                  name={rItem.name}
                  value={reportValue.reportId}
                  checked={reportValue.reportId === rItem._id}
                  onClick={() =>
                    setReportValue((pre) => ({
                      ...pre,
                      reportId: rItem._id,
                      description: rItem.name
                    }))
                  }
                />
              )
            })}
            {reportValue.reportId === "5f5a22267808b526b8958ce7" &&
              <Form.TextArea placeholder='Enter report here' value={customText} onChange={(e) => handleChange(e)} />}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button compact positive onClick={() => submitClipReportBtn()} icon="check" content="Submit" />
        </Modal.Actions>
      </Modal>
    </Button.Group>
  );
}
export default React.memo(ClipMenu);
