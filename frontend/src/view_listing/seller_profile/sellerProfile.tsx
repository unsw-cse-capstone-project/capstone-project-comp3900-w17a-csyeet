import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
      <div style={{display: "flex", alignItems: "center"}}>
        <AccountCircleIcon />
        <Typography variant="body1" style={{paddingLeft: "10px"}}>Jeremy Chiu</Typography>
      </div>
    </div>
  );
};
