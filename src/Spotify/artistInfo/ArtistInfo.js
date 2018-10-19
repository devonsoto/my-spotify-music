import React from 'react';

const ArtistInfo = props => {
  return props.loggedIn ? (
    <div>
      Now Playing: {props.artistName}
      <div>
        <img alt="Artist Album" src={props.albumArt} style={{ height: 150 }} />
      </div>
    </div>
  ) : null;
}

export default ArtistInfo;