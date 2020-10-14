import * as React from "react";
import { Typography, Divider } from "@material-ui/core";
import { sellerProfileStyle } from "./sellerProfile.css";

export const SellerProfile = ({ seller }: { seller: string }) => {
  const classes = sellerProfileStyle();
  return (
    <div>
      <Typography variant="h5" className={classes.header}>
        Seller
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant="body2">TOOD: Implement Seller API</Typography>
    </div>
  );
};
