import * as React from "react";
import { Typography, Divider } from "@material-ui/core";
import { mapStyle } from "./map.css";

export const Map = ({ image }: { image: string }) => {
  const classes = mapStyle();
  return (
    <div>
      <Typography variant="h5" className={classes.header}>
        Map: Placeholder
      </Typography>
      <Divider className={classes.divider} />
      <img src={image} style={{ width: "100%" }}></img>
    </div>
  );
};
