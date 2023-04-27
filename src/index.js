import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from "react-redux";
import store from "./redux/store/index"
import ErrorBoundary from "../src/utils/ErrorBoundary";
import Layout from "./component/layout/index";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <HelmetProvider>
          <Layout />
        </HelmetProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
