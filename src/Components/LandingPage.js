import React from "react";
/**
 * Handle irregular browser behaviour
 */
const LandingPage = (props) => {
  const { history } = props;
  const openHome = () => {
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
