import * as React from "react";
import { Typography, Divider } from "@material-ui/core";
import { auctionDetailsStyle } from "./AuctionDetails.css";
import { AuctionTag } from "../../ui/base/auction_tag/AuctionTag";
import { dateFormatter } from "../../ui/util/helper";
import { AuctionActionButton } from "../../ui/base/auction_action_button/AuctionActionButton";

/**
 * Component which displays information about a listing's auction
 * @param auction_start
 * @param auction_end
 * @param id
 * @param isUser
 * @param registered_bidder
 * @param disabledAction
 */
export const AuctionDetails = ({
  auction_start,
  auction_end,
  id,
  isUser,
  registered_bidder,
  disableAction = false,
}: {
  auction_start: Date;
  auction_end: Date;
  id: number;
  registered_bidder: boolean;
  isUser: boolean;
  disableAction?: boolean;
}) => {
  const classes = auctionDetailsStyle();
  return (
    <div>
      <Typography variant="h5" className={classes.header}>
        Auction Details
      </Typography>
      <Divider className={classes.divider} />
      <AuctionTag start={auction_start} end={auction_end} className={classes.auctionTag} />
      {new Date().getTime() < auction_start.getTime() ? (
        <div>
          <Typography variant="body2">
            <b>Start Time:</b> {dateFormatter.format(auction_start)}
          </Typography>
          <Typography variant="body2">
            <b>End Time:</b> {dateFormatter.format(auction_end)}
          </Typography>
        </div>
      ) : (
          <Typography variant="body2">
            <b>End Time:</b> {dateFormatter.format(auction_end)}
          </Typography>
        )}
      {!disableAction && (
        <AuctionActionButton
          id={id}
          auction_start={auction_start}
          registered_bidder={registered_bidder}
          isUser={isUser}
        />
      )}
    </div>
  );
};
