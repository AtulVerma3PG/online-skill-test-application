import React from "react";
import PropTypes from "prop-types";

import { Route, Redirect } from "react-router-dom";
import { isLogin, isTestActive } from "./utils";

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      // eslint-disable-next-line no-nested-ternary
      isLogin()
        ? isTestActive()
          ? <Redirect to="/Questionaire" />
          : <Component {...props} />
        : <Redirect to="/" />
    )}
  />
);

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
export default PublicRoute;
