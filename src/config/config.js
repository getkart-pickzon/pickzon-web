require('dotenv').config()
module.exports = {
  localDev: {
    WEB_URL: process.env.REACT_APP_LOCAL,
    API_URL_1: process.env.REACT_APP_LOCAL_URL_1,
    SIO_ENDPOINT_1: process.env.REACT_APP_LOCAL_SIO_1,
    API_URL: process.env.REACT_APP_LOCAL_URL,
    SIO_ENDPOINT: process.env.REACT_APP_LOCAL_SIO,
  },
  development: {
    WEB_URL: process.env.REACT_APP_DEV,
    API_URL: process.env.REACT_APP_DEV_URL,
    SIO_ENDPOINT: process.env.REACT_APP_DEV_SIO
  },
  stage: {
    WEB_URL: process.env.REACT_APP_STAGE,
    API_URL: process.env.REACT_APP_STAGE_URL,
    SIO_ENDPOINT: process.env.REACT_APP_STAGE_SIO
  },
  production: {
    WEB_URL: process.env.REACT_APP_PROD,
    API_URL: process.env.REACT_APP_PROD_URL,
    SIO_ENDPOINT: process.env.REACT_APP_PROD_SIO
  },
  imageURL: process.env.REACT_APP_IMAGE_URL,
  cdnUrl: process.env.REACT_APP_CDN_URL,
  googleApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  beforeTokenString: process.env.REACT_APP_BEFORE_TOKEN_STR,

  taxPercentage: 18,
  USDValue: 76,
  EUROValue: 78,
  googleLibrary: ["geometry", "drawing", "places"],
  colorsPalete: [
    "red",
    "orange",
    "yellow",
    "olive",
    "green",
    "teal",
    "blue",
    "violet",
    "purple",
    "pink",
    "brown"
  ]
}