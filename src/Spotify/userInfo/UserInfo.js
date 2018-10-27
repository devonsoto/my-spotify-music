import React from "react";

import "./Userinfo.less";

const UserInfo = props => {
  return (
    <div className="Userinfo">
      Name: {props.name}, followers: {props.followers}
    </div>
  );
};

export default UserInfo;
