import { CURRENT_API_URL as API_BASE } from "./config/getCurrentURL";
import { getToken as token } from "./utils/common";
import CONFIG from "./config/config.js";

const axios = require("axios");
const beforeTokenString = CONFIG.beforeTokenString;

const POST = async (url, data) => {
  const headers = {
    "Content-Type": "application/json",
    authToken: beforeTokenString + token(),
  };
  try {
    url = API_BASE() + url;
    let reqOption = new Object();
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

const POSTWITHTOKEN = async (url, authToken, data) => {
  if (!authToken) {
    return;
  }
  const headers = {
    "Content-Type": "application/json",
    authToken: beforeTokenString + authToken,
  };

  try {
    url = API_BASE() + url;
    let reqOption = new Object();
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
  const headers = {
    "Content-Type": "application/json",
    authToken: beforeTokenString + token(),
  };
  try {
    url = API_BASE() + url;
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
  const config = {
    headers: {
      "Content-Type": "application/json",
      authToken: beforeTokenString + token(),
    },
  };
  try {
    url = API_BASE() + url + "/" + id;
    const getResponse = await axios.put(url, content, config);
    return getResponse.data;
  } catch (err) {
    return tryCatch(err);
  }
};

/*  When we're doing a partial update, then can use PATCH. */
const PATCH = async function (url, id, content) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authToken: beforeTokenString + token(),
    },
  };
  try {
    url = API_BASE() + url + "/" + id;
    const getResponse = await axios.patch(url, content, config);
    return getResponse.data;
  } catch (err) {
    return tryCatch(err);
  }
};

const DELETE = async function (url, id) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authToken: beforeTokenString + token(),
    },
    // , data: {}
  };
  try {
    url = API_BASE() + url + "/" + id;
    const getResponse = await axios.delete(url, config);
    return getResponse.data;
  } catch (err) {
    return tryCatch(err);
  }
};

const UPLOAD = async function (url, fileData) {
  var formData = new FormData();
  for (let i = 0; i < fileData.length; i++) {
    formData.append("files", fileData[i]);
  }
  const headers = {
    "Content-Type": "multipart/form-data",
    authToken: beforeTokenString + token(),
  };
  try {
    let baseURL = API_BASE()
    const postApiRes = await axios({
      method: "POST",
      url: baseURL + url,
      data: formData,
      headers: headers,
    });
    let res = postApiRes.data
    if (res.status === 1) {
      let payload = res.payload
      let urlImg = []
      for (let u = 0; u < payload.length; u++) {
        urlImg.push({ image: baseURL + "/" + payload[u], alt: u })
      }
      res.payload = urlImg
    }
    return res;
  } catch (err) {
    return tryCatch(err);
  };
};

const UPLOADSINGLE = async function (url, fileData) {
  var formData = new FormData();
  formData.append("files", fileData);
  const headers = {
    "Content-Type": "multipart/form-data",
    authToken: beforeTokenString + token(),
  };
  try {
    let baseURL = API_BASE()
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

const UPLOADMEDIA = async function (url, fileData) {
  var formData = new FormData();
  for (let i = 0; i < fileData.length; i++) {
    formData.append("files", fileData[i]);
  };
  const headers = {
    "Content-Type": "multipart/form-data",
    authToken: beforeTokenString + token(),
  };
  try {
    let baseURL = API_BASE()
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
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  try {
    let baseURL = API_BASE()
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
function createBase64(fileData) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = function () {
      resolve(reader.result);
    };
  });
}

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

export { POST, GET, PUT, PATCH, UPLOAD, UPLOADSINGLE, UPLOADMEDIA, DELETE, POSTWITHTOKEN, FORMDATA };

// const { status, message, payload } = await POST('/test-post', { emailId: 'vish@gmail.com', password: '12345' })
// const { status, message, payload } = await GET('/test-get', { pageNumber: 0, pageLimit: 2 })
// const { status, message, payload } = await PUT('/test-put', "123", { emailId: 'vish@gmail.com', password: '12345' })
// const { status, message, payload } = await PATCH('/test-patch', 123123, { emailId: 'vish@gmail.com', password: '12345' })
// const { status, message, payload } = await DELETE('/test-delete', "oaidf123kjh23")
