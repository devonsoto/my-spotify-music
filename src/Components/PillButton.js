import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const PillButton = props => {
  const { classes, name, loggedIn, onClick, color, href } = props;

  return loggedIn ? (
    <Button
      variant="contained"
      color={color}
      onClick={onClick}
      className={classes.button}
      href={href}
    >
      {name}
    </Button>
  ) : null;
};

PillButton.propTypes = {
  classes: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  href: PropTypes.string
};

export default withStyles(styles)(PillButton);
