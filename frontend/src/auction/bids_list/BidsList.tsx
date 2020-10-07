import * as React from "react";
import { AuctionBid } from "../AuctionPage";
import { Typography, Divider } from "@material-ui/core";
import {
  BidPriceWithBidderTag,
  BidPrice,
} from "../../ui/base/bid_price/BidPrice";
import { BidderTag } from "../../ui/base/bidder_tag/BidderTag";
import { dateFormatter } from "../../ui/util/helper";
import { bidsListStyle } from "./BidsList.css";

export type Bid = {
  value: AuctionBid;
  bidder: number;
  time: Date;
};

export const BidsList = ({ bids }: { bids: Bid[] }) => {
  const classes = bidsListStyle();
  return (
    <div>
      <Typography variant="h5">Bidding History</Typography>
      <Divider className={classes.divider} />
      {bids.map((bid, i) => (
        <div key={i} className={classes.bidContainer}>
          <BidPriceWithBidderTag
            BidPrice={() => (
              <BidPrice
                price={bid.value.price}
                state={i === 0 ? "current" : "past"}
                textType="h5"
              />
            )}
            BidderTag={() => <BidderTag bidderNumber={bid.bidder} />}
          />
          <div className={classes.bidTime}>
            <Typography variant="body1">
              {dateFormatter.format(bid.time)}
            </Typography>
            {bid.value.state === "reserve_met" && (
              <Typography variant="body1" className={classes.reserveLabel}>
                Reserve Met
              </Typography>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
