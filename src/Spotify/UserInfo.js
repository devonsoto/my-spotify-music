import React from "react";

const UserInfo = props => {
  return (
    <div>
      Name: {props.name}, followers: {props.followers}
    </div>
  );
};

export default UserInfo;
