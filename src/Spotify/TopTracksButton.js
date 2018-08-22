import React from 'react';
import './Spotify.css'

function TopTracksButton(props) {

	return  props.loggedIn ? (
			<button onClick={props.onClick} className="InfoButtons">Show Top Tracks</button>
	) : null;
}



export default TopTracksButton;