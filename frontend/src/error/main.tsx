import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Button,
} from "@material-ui/core";
import * as React from "react";
import { useHistory } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
export const NotFoundPageStyle = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "calc(100vh - 435px)",
      justifyContent: "center",
    },
  })
);

/**
 * Not Found Page for invalid page routes
 */
export const NotFoundPage = () => {
  const classes = NotFoundPageStyle();
  const history = useHistory();
  return (
    <div className={classes.page}>
      <Typography variant="h1">404</Typography>
      <Typography
        variant="h6"
        color="textSecondary"
        style={{ margin: "15px 0" }}
      >
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

/**
 * Error Page for invalid page routes
 */
export const ErrorPage = () => {
  const classes = NotFoundPageStyle();
  const history = useHistory();
  return (
    <div className={classes.page}>
      <Typography variant="h1">Error</Typography>
      <Typography
        variant="h6"
        color="textSecondary"
        style={{ margin: "15px 0" }}
      >
        An error occurred, please try again
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

/**
 * Error Page for invalid page routes
 */
export const ErrorMessage = () => (
  <MuiAlert
    severity="error"
    action={
      <Button
        color="inherit"
        size="small"
        onClick={() => window.location.reload()}
      >
        Refresh
      </Button>
    }
  >
    An error occurred{" "}
    <span role="img" aria-labelledby="sad emoji">
      😔
    </span>
  </MuiAlert>
);
