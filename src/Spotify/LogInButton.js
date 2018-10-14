import React from "react";
import Button from "@material-ui/core/Button";

const LoggedIn = () => {
  return (
    <Button variant="contained" color="primary" href="http://localhost:8888">
      {" "}
      Login to Spotify{" "}
    </Button>
  );
};

export default LoggedIn;
