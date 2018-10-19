import React from "react";
import Button from "@material-ui/core/Button";

const LoggedIn = props => {
  return (
    <Button variant="contained" color="primary" href="http://localhost:8888" onClick={props.onClick}>
      {" "}
      Login to Spotify{" "}
    </Button>
  );
};

export default LoggedIn;