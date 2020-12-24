import React from "react";
import logo from "../assets/logo.png";

const withLayout = (WrappedComponent) => {
  const WithLayout = (props) => (
    <div>
      <nav className="menu-container-nav">
        <img src={logo} alt="logo" className="logo" />
      </nav>
      <WrappedComponent {...props} />
      <p className="footer">Copyright © 2020 , All Rights Reserved.</p>
    </div>
  );
  return WithLayout;
};
export default withLayout;
