import React from 'react';
import ReactDOM from 'react-dom';
// import { hydrate, render } from "react-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";

import './index.css';
import '../src/assets/css/common.css';
import Main from './Main';
import ErrorBoundary from './ErrorBoundary';

const APP = (<Provider store={store}>
  <PersistGate persistor={persistor}>
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  </PersistGate>
</Provider>);

// const rootElement = document.getElementById("root");
// if (rootElement.hasChildNodes()) {
//   hydrate(APP, rootElement);
// } else {
//   render(APP, rootElement);
// }

ReactDOM.render(
  APP,
  document.getElementById('root')
);

