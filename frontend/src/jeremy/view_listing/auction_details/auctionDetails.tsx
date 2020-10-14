import * as React from "react";
import { useHistory } from "react-router-dom";
import { Typography, Button, Divider } from "@material-ui/core";

import { AuctionTag } from "../../../ui/base/teresa/auction_tag/AuctionTag";
import { auctionDetailsStyle } from "./auctionDetails.css";

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
      {new Date().getTime() < auction_start.getTime() ? (
        <div>
          <Typography variant="body2">
            Start Time: {auction_start.toLocaleString()}
          </Typography>
          <Typography variant="body2">
            End Time: {auction_end.toLocaleString()}
          </Typography>
          <AuctionTag start={auction_start} end={auction_end} />
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: "15px" }}
            onClick={() => history.push(`/listing/${id}/register`)}
          >
            Register to Bid
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="body2">
            End Time: {auction_end.toLocaleString()}
          </Typography>
          <AuctionTag start={auction_start} end={auction_end} />
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: "15px" }}
            onClick={() => history.push(`/listing/${id}/auction`)}
          >
            View Auction
          </Button>
        </div>
      )}
    </div>
  );
};
