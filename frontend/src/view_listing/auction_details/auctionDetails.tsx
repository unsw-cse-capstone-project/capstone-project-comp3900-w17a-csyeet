import * as React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import { auctionDetailsStyle } from "./auctionDetails.css";
import { AuctionTag } from "../../ui/base/auction_tag/AuctionTag";
import { useHistory } from "react-router-dom";
import { dateFormatter } from "../../ui/util/helper";
import { AuctionActionButton } from "../../ui/base/auction_action_button/AuctionActionButton";

export const AuctionDetails = ({
  auction_start,
  auction_end,
  id,
  isUser,
  registered_bidder,
}: {
  auction_start: Date;
  auction_end: Date;
  id: number;
  registered_bidder: boolean;
  isUser: boolean;
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
        </div>
      ) : (
        <div>
          <Typography variant="body2">
            End Time: {dateFormatter.format(auction_end)}
          </Typography>
          <AuctionTag start={auction_start} end={auction_end} />
        </div>
      )}
      <AuctionActionButton id={id} auction_start={auction_start} registered_bidder={registered_bidder} isUser={isUser} />
    </div>
  );
};
