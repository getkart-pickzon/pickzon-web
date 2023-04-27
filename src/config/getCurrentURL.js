import CONFIG from "./config.js"

const checkCurrentUrl = () => {
  try {
    let _url = window.location.href;
    const localDevUrl = _url.search(CONFIG.localDev.WEB_URL);
    const developmentUrl = _url.search(CONFIG.development.WEB_URL);
    const stageUrl = _url.search(CONFIG.stage.WEB_URL);
    const productionUrl = _url.search(CONFIG.production.WEB_URL);
    return { localDevUrl, developmentUrl, stageUrl, productionUrl };
  } catch (err) {
    console.log(err);
    return { developmentUrl: 5, stageUrl: -1, productionUrl: -1 };
  };
};

const CURRENT_API_URL = () => {
  try {
    const { localDevUrl, developmentUrl, stageUrl, productionUrl } = checkCurrentUrl();
    const localDevAPIUrl = CONFIG.localDev.API_URL;
    const developmentAPIUrl = CONFIG.development.API_URL;
    const stageAPIUrl = CONFIG.stage.API_URL;
    const productionAPIUrl = CONFIG.production.API_URL;
    if (localDevUrl > 0) {
      return localDevAPIUrl;
    } else if (developmentUrl > 0) {
      return developmentAPIUrl;
    } else if (stageUrl > 0) {
      return stageAPIUrl;
    } else if (productionUrl > 0) {
      return productionAPIUrl;
    } else return productionAPIUrl;

  } catch (err) {
    console.log("GET CURRENT API_BASE ", err);
    return "http://localhost:8000/user";
  }
};

const CURRENT_SIO_URL = () => {
  try {
    const { localDevUrl, developmentUrl, stageUrl, productionUrl } = checkCurrentUrl();
    const localDevSIO = CONFIG.localDev.SIO_ENDPOINT;
    const developmentSIO = CONFIG.development.SIO_ENDPOINT;
    const stageSIO = CONFIG.stage.SIO_ENDPOINT;
    const productionSIO = CONFIG.production.SIO_ENDPOINT;
    if (localDevUrl > 0) {
      return localDevSIO;
    } else if (developmentUrl > 0) {
      return developmentSIO;
    } else if (stageUrl > 0) {
      return stageSIO;
    } else if (productionUrl > 0) {
      return productionSIO;
    } else return productionSIO;

  } catch (err) {
    console.log("GET CURRENT SOCKET ENDPOINT ", err);
    return "http://localhost:8000/";
  }
};

export { CURRENT_API_URL, CURRENT_SIO_URL };