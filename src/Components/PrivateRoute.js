import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { isLogin, isTestActive } from "./utils";

const PrivateRoute = ({ component: Component, ...rest }) => (

  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
  <Route
    {...rest}
    render={(props) => (
      isLogin() && isTestActive()
        ? <Component {...props} />
        : <Redirect to="/SignIn" />
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
