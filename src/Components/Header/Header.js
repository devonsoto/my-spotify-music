import React from "react";
import PropTypes from "prop-types";
import PillButton from "../PillButton";

import "./Header.less";

const Header = props => {
  const { onClick } = props;
  return (
    <div className="Header">
      <h1>Welcome to My Spotify</h1>
      <PillButton
        onClick={onClick}
        loggedIn={true}
        name="Log into Spotify"
        color="primary"
        href="http://localhost:8888"
      />
    </div>
  );
};

Header.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Header;
