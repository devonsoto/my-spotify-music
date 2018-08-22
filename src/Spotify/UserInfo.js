import React from 'react'

function UserInfo(props) {
	return (
		<div>
			<div>
				Name: {props.name}, followers: {props.followers}
			</div>
		</div>
	);
}


export default UserInfo;