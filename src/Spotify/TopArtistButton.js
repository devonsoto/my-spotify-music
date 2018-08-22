import React from 'react';
import './Spotify.css'

function TopArtistButton(props) {

	return  props.loggedIn ? (
			<button onClick={props.onClick} className="InfoButtons">Show Top Artist</button>
	) : null;
}



export default TopArtistButton;