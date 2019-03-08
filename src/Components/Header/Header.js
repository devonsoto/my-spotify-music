import React from "react";
import PropTypes from "prop-types";

import "./Header.less";

const Header = props => {
  const { loggedIn } = props;
  return (
    <div className="container">
      {loggedIn ? (
        <div className="Header-wrapper">
          <div className="Header">
            <div className="logo">
              <img
                className="spotify-logo"
                src="../../assets/static/SpotifyLogos/Spotify_Logo_RGB_Black.png"
              />
            </div>
            <div className="login">log out button here</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

Header.propTypes = {};

export default Header;
