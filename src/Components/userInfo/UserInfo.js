import React from "react";
import PropTypes from "prop-types";

import "./Userinfo.less";

const UserInfo = props => {
  const { name, followers } = props;

  return (
    <div className="Userinfo">
      Name: {name}, followers: {followers}
    </div>
  );
};

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  followers: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default UserInfo;
