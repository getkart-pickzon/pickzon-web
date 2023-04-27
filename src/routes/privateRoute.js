import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/common";
import NavigationPaths from "./navigationPath";
const TOKEN_NAME = process.env.REACT_APP_TOKEN_NAME;
// handle the private routes
export default function PrivateRoute({ children }) {
  const logged = getToken(TOKEN_NAME) ? true : false
  return logged ? children : <Navigate to={{ pathname: NavigationPaths.LOGIN }} />
}