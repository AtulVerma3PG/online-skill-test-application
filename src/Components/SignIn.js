/* eslint-disable linebreak-style */
import React from "react";
/**
 * Handle irregular browser behaviour
 */
const SignIn = (props) => {
  const { history } = props;
  localStorage.clear();
  const openHome = () => {
    history.push("/RegistrationForm");
  };
  return (
    <div>
      <h1>Sign In</h1>
      <button id="home" type="button" onClick={openHome} className="btn btn-primary btn-lg">
        Registration
      </button>
    </div>
  );
};

SignIn.propTypes = {
  history: Object.isRequired,
};

export default SignIn;
