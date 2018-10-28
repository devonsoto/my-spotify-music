import React from "react";
import PropTypes from "prop-types";

const ArtistInfo = props => {
  const { loggedIn, artistName, albumArt } = props;
  return loggedIn ? (
    <div>
      Now Playing: {artistName}
      <div>
        <img alt="Artist Album" src={albumArt} style={{ height: 150 }} />
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
