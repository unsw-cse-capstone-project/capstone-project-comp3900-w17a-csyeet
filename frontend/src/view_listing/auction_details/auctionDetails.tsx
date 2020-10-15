import * as React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import { auctionDetailsStyle } from "./auctionDetails.css";
import { AuctionTag } from "../../ui/base/auction_tag/AuctionTag";
import { useHistory } from "react-router-dom";
import { dateFormatter } from "../../ui/util/helper";

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
            Start Time: {dateFormatter.format(auction_start)}
          </Typography>
          <Typography variant="body2">
            End Time: {dateFormatter.format(auction_end)}
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
            End Time: {dateFormatter.format(auction_end)}
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
