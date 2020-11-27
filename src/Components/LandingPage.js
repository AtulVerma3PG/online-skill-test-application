import React from "react";
import { logout } from "./utils";
/**
 * Handle irregular browser behaviour
 */
const LandingPage = (props) => {
  const { history } = props;
  const openHome = () => {
    logout();
    history.push("/");
  };
  return (
    <div>
      <h1>Landing Page</h1>
      <button id="home" type="button" onClick={openHome} className="btn btn-primary btn-lg">
        Home
      </button>
    </div>
  );
};

LandingPage.propTypes = {
  history: Object.isRequired,
};

export default LandingPage;
