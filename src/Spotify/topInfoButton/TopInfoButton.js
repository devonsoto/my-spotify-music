import React from 'react';
import '../Spotify.css'

const TopInfoButton = props => {
	return props.loggedIn ? (
		<button onClick={props.onClick} className="InfoButtons">{props.name}</button>
	) : null;
}

export default TopInfoButton;