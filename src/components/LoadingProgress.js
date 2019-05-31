import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
    color: "rgb(50, 235, 158)"
  },
  spinner: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.spinner}>
      <CircularProgress className={classes.progress} />
    </div>
  );
}

export default CircularIndeterminate;
