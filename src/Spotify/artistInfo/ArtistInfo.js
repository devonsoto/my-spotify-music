import React from "react";
import PropTypes from "prop-types";

import "./ArtistInfo.less";

const ArtistInfo = props => {
  const { loggedIn, artistName, albumArt } = props;

  return loggedIn ? (
    <div className="ArtistInfo-text">
      Now Playing: {artistName}
      <div>
        <img className="ArtistInfo-img" alt="Artist Album" src={albumArt} />
      </div>
    </div>
  ) : null;
};

ArtistInfo.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  artistName: PropTypes.string.isRequired,
  albumArt: PropTypes.string
};

export default ArtistInfo;
