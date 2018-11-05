import React from "react";
import PropTypes from "prop-types";
import PillButton from "../PillButton/PillButton";

import "./LogInScreen.less";

const LogInScreen = props => {
  const { onClick } = props;
  return (
    <div className="LogInScreen">
      <h1>Welcome to My Spotify</h1>
      <PillButton
        onClick={onClick}
        loggedIn={true}
        name="Log into Spotify"
        color="primary"
        href="http://localhost:8888"
      />
    </div>
  );
};

LogInScreen.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default LogInScreen;
