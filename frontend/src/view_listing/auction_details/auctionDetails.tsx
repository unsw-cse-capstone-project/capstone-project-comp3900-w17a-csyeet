import * as React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import { auctionDetailsStyle } from "./auctionDetails.css";
import { AuctionTag } from "../../ui/base/auction_tag/AuctionTag";
import { useHistory } from "react-router-dom";

export const AuctionDetails = ({
  auction_start,
  auction_end,
  id,
}: {
  auction_start: Date;
  auction_end: Date;
  id: number;
}) => {
  const classes = auctionDetailsStyle();
  const history = useHistory();
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
              onClick={() => history.push(`/listing/${id}/register`)}
            >
              Register to Bid
            </Button>,
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
              onClick={() => history.push(`/listing/${id}/auction`)}
            >
              View Auction
            </Button>,
          ]}
    </div>
  );
};
