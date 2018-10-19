import React from 'react'

const TopInfo = props => {
	console.log("props top tracks:", props.info)
	let areInfo = true
	let infoList = []
	console.log(props.info.length)
	if(props.info.length !== 0){
		areInfo = true
		infoList = props.info[0]
		console.log(infoList)
	}
	console.log(props.showInfo, areInfo)
	return (
		<div>
			{ areInfo && props.showInfo ? (
			<ol>
				{infoList.map((info, index) =>
					<li key={info.id}>
						{info.name}
					</li>
				)}
			</ol> ) :  null }

		</div>
	);
}

export default TopInfo;