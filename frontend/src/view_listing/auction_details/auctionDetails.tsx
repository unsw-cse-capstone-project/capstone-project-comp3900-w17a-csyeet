import * as React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import { auctionDetailsStyle } from "./auctionDetails.css";
import { AuctionTag } from "../../ui/base/auction_tag/AuctionTag";

export const AuctionDetails = ({
  auction_start,
  auction_end
}: {
  auction_start: Date;
  auction_end: Date;
}) => {
  const classes = auctionDetailsStyle();
  return (
    <div>
      <Typography variant="h5" className={classes.header}>
        Auction Details
      </Typography>
      <Divider className={classes.divider} />
      {new Date().getTime() < auction_start.getTime()
        ? [
            <Typography variant="body2">
              Start Time: {auction_start.toLocaleString()}
            </Typography>,
            <Typography variant="body2">
              End Time: {auction_end.toLocaleString()}
            </Typography>,
            <AuctionTag start={auction_start} end={auction_end} />,
            <Button
              variant="outlined"
              color="primary"
              style={{ marginTop: "15px" }}
            >
              Register to Bid
            </Button>
          ]
        : [
            <Typography variant="body2">
              End Time: {auction_end.toLocaleString()}
            </Typography>,
            <AuctionTag start={auction_start} end={auction_end} />,
            <Button
              variant="outlined"
              color="primary"
              style={{ marginTop: "15px" }}
            >
              View Auction
            </Button>
          ]}
    </div>
  );
};
