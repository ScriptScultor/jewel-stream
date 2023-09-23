import React from "react";
import { Route } from "react-router";

const PrivateRoute = ({ children, ...rest }) => {
  return <Route {...rest} render={({ location }) => children}></Route>;
};

export default PrivateRoute;
