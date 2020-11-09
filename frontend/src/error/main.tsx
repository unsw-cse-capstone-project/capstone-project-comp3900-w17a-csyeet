import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Button,
} from "@material-ui/core";
import * as React from "react";
import { useHistory } from "react-router-dom";
export const ErrorPageStyle = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "70%",
      justifyContent: "center",
    },
  })
);

export const ErrorPage = () => {
  const classes = ErrorPageStyle();
  const history = useHistory();
  return (
    <div className={classes.page}>
      <Typography variant="h1">
        404
      </Typography>
      <Typography variant="h6" color="textSecondary" style={{ margin: "15px 0" }}>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/")}
      >
        Return to Home
      </Button>
    </div>
  );
};
