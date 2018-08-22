import React from 'react'

function TopTracks(props) {
	console.log("props top tracks:", props.tracks)
	let aretracks = false
	let trackslist = []
	console.log(props.tracks.length)
	if(props.tracks.length !== 0){
		aretracks = true
		trackslist = props.tracks[0]
		console.log(trackslist)
	}
	return (
		<div>
			{ aretracks && props.showTracks? (
			<ol>
				{trackslist.map((tracks, index) =>
					<li key={tracks.id}>
						{tracks.name}
					</li>
				)}
			</ol> ) :  null }

		</div>
	);
}

export default TopTracks;