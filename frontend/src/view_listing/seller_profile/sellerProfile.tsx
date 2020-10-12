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
      <Typography variant="body2">
        Include seller profile picture, name: {seller} and button to message.
        Clicking the name should display a pop-up window of the seller's
        profile.
      </Typography>
    </div>
  );
};
