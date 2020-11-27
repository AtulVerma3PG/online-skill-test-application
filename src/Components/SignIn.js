/* eslint-disable linebreak-style */
import React from "react";
/**
 * Handle irregular browser behaviour
 */
const SignIn = (props) => {
  const { history } = props;
  const openHome = () => {
    history.push("/");
  };
  return (
    <div>
      <h1>Sign In</h1>
      <button id="home" type="button" onClick={openHome} className="btn btn-primary btn-lg">
        Registeration
      </button>
    </div>
  );
};

SignIn.propTypes = {
  history: Object.isRequired,
};

export default SignIn;
