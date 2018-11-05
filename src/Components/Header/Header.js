import React from "react";
import PropTypes from "prop-types";

import "./Header.less";

const Header = props => {
  return (
    <div className="Header-wrapper">
      <div className="Header">
        <div className="logo">
          <img
            className="spotify-logo"
            src="../../assets/static/SpotifyLogos/Spotify_Logo_RGB_Black.png"
          />
        </div>
        <div className="login">Put My pic and log out button here</div>
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
