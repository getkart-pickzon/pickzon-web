import { getToken } from "../utils/common";
import axios from "axios";
import { io } from "socket.io-client";

const API_BASE = process.env.REACT_APP_URL;
const TOKEN_NAME = process.env.REACT_APP_TOKEN_NAME;
const SIO_BASE = process.env.REACT_APP_SIO;

const SOCKET = io(SIO_BASE);

const POST = async (url, data) => {
  const headerData = getToken(TOKEN_NAME);
  const headers = { "Content-Type": "application/json", ...JSON.parse(headerData) };
  try {
    url = API_BASE + url;
    let reqOption = {}
    reqOption.method = "POST";
    reqOption.url = url;
    reqOption.data = data;
    reqOption.headers = headers;
    const postApiRes = await axios(reqOption);
    return postApiRes.data;
  } catch (err) {
    return tryCatch(err);
  }
};

const GET = async (url, data) => {
  const headerData = getToken(TOKEN_NAME);
  const headers = { "Content-Type": "application/json", ...JSON.parse(headerData) };
  try {
    url = API_BASE + url;
    const getResponse = await axios.get(url, {
      headers: headers,
      params: data,
    });
    return getResponse.data;
  } catch (err) {
    return tryCatch(err);
  }
};

/* When a client needs to replace an existing Resource entirely, then can use PUT. */
const PUT = async function (url, id, content) {
  const headerData = getToken(TOKEN_NAME);
  const headers = { "Content-Type": "application/json", ...JSON.parse(headerData) };
  const config = {
    headers
  };
  try {
    url = API_BASE + url + "/" + id;
    const getResponse = await axios.put(url, content, config);
    return getResponse.data;
  } catch (err) {
    return tryCatch(err);
  }
};

/*  When we're doing a partial update, then can use PATCH. */
const PATCH = async function (url, id, content) {
  const headerData = getToken(TOKEN_NAME);
  const headers = { "Content-Type": "application/json", ...JSON.parse(headerData) };
  const config = {
    headers
  };
  try {
    url = API_BASE + url + "/" + id;
    const getResponse = await axios.patch(url, content, config);
    return getResponse.data;
  } catch (err) {
    return tryCatch(err);
  }
};

const DELETE = async function (url, id) {
  const headerData = getToken(TOKEN_NAME);
  const headers = { "Content-Type": "application/json", ...JSON.parse(headerData) };
  const config = {
    headers
  };
  try {
    url = API_BASE + url + "/" + id;
    const getResponse = await axios.delete(url, config);
    return getResponse.data;
  } catch (err) {
    return tryCatch(err);
  }
};

const UPLOADMEDIA = async function (url, fileData) {
  var formData = new FormData();
  for (let i = 0; i < fileData.length; i++) {
    formData.append("files", fileData[i]);
  };
  const headerData = getToken(TOKEN_NAME);
  const headers = { "Content-Type": "multipart/form-data", ...JSON.parse(headerData) };
  try {
    let baseURL = API_BASE;
    const postApiRes = await axios({
      method: "POST",
      url: baseURL + url,
      data: formData,
      headers: headers,
    });
    return postApiRes.data;
  } catch (err) { return tryCatch(err); };
};

const FORMDATA = async function (url, data) {
  var formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key])
  }
  const headerData = getToken(TOKEN_NAME);
  const headers = { "Content-Type": "multipart/form-data", ...JSON.parse(headerData) };
  try {
    debugger
    let baseURL = API_BASE;
    const postApiRes = await axios({
      method: "POST",
      url: baseURL + url,
      data: formData,
      headers: headers,
    });
    return postApiRes.data;
  } catch (err) {
    return tryCatch(err);
  };
};

// For base 64
// function createBase64(fileData) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(fileData);
//     reader.onload = function () {
//       resolve(reader.result);
//     };
//   });
// }

const tryCatch = (err) => {
  try {
    console.log(err.response.data)
    if (
      err.response.status === 400 ||
      err.response.status === 401 ||
      err.response.status === 500
    )
      return err.response.data;
    return { status: 0, message: `Server Down ${err.response.data.message}`, payload: [] };
  } catch (er) {
    return { status: 0, message: "Server Down", payload: [] };
  }
};

export { POST, GET, PUT, PATCH, UPLOADMEDIA, DELETE, FORMDATA, SOCKET };

// const { status, message, payload } = await POST('/test-post', { emailId: 'vish@gmail.com', password: '12345' })
// const { status, message, payload } = await GET('/test-get', { pageNumber: 0, pageLimit: 2 })
// const { status, message, payload } = await PUT('/test-put', "123", { emailId: 'vish@gmail.com', password: '12345' })
// const { status, message, payload } = await PATCH('/test-patch', 123123, { emailId: 'vish@gmail.com', password: '12345' })
// const { status, message, payload } = await DELETE('/test-delete', "oaidf123kjh23")