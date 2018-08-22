import React from 'react'

function TopArtist(props) {
	console.log("props top artist:", props.artists)
	let areArtist = false
	let artistlist = []
	console.log(props.artists.length)
	if(props.artists.length !== 0){
		areArtist = true
		artistlist = props.artists[0]
		console.log(artistlist)
	}
	return (
		<div>
			{ areArtist && props.showArtist ? (
			<ol>
				{artistlist.map((artist, index) =>
					<li key={artist.id}>
						{artist.name}
					</li>
				)}
			</ol> ) :  null }

		</div>
	);
}

export default TopArtist;