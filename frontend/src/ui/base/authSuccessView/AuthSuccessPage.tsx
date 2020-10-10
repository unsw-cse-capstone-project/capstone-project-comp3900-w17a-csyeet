import React from "react";
import { Typography } from "@material-ui/core";

const AuthSuccessView = () => {
  return (
    <>
      <Typography variant="h3" align="center">
        All done
      </Typography>
      <p>Redirecting you back to our search page...</p>
    </>
  );
};

export default AuthSuccessView;
