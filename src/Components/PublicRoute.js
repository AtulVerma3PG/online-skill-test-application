import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin, isTestActive } from "./utils";

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      isLogin()
        ? isTestActive()
          ? <Redirect to="/Questionaire" />
          : <Component {...props} />
        : <Redirect to="/" />
    )}
  />
);

PublicRoute.propTypes = {
  component: Object.isRequired,
};
export default PublicRoute;
