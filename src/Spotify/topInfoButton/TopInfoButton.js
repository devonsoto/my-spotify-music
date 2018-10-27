import React from "react";
import Button from "@material-ui/core/Button";

import "./TopInfoButton.less";

const TopInfoButton = props => {
  return props.loggedIn ? (
    <Button
      variant="contained"
      color="secondary"
      onClick={props.onClick}
      className="TopInfoButton"
    >
      {props.name}
    </Button>
  ) : null;
};

export default TopInfoButton;
