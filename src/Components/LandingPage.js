import React from "react";
import { Link } from "react-router-dom";

/**
 * Handle irregular browser behaviour
 */
const LandingPage = () => (
  <div>
    <h1>Landing Page</h1>
    <Link
      to={{
        pathname: "/",
      }}
    >
      <button type="button" className="btn btn-primary btn-sm">
        Home
      </button>
    </Link>
  </div>
);
export default LandingPage;
