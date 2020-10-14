import * as React from "react";
import { Typography, Divider } from "@material-ui/core";
import {
  BidPriceWithBidderTag,
  BidPrice,
} from "../../../ui/base/teresa/bid_price/BidPrice";
import { BidderTag } from "../../../ui/base/teresa/bidder_tag/BidderTag";
import { dateFormatter } from "../../../ui/util/helper";
import { bidsListStyle } from "./BidsList.css";
import { Bid } from "../../../ui/util/types/bid";

export const BidsList = ({
  bids,
  reserve_price,
}: {
  bids: Bid[];
  reserve_price: number;
}) => {
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
                bid={bid.bid}
                state={i === 0 ? "current" : "past"}
                textType="h5"
              />
            )}
            BidderTag={() => <BidderTag bidderNumber={bid.bidder_id} />}
          />
          <div className={classes.bidTime}>
            <Typography variant="body1">
              {dateFormatter.format(bid.submitted)}
            </Typography>
            {bid.bid >= reserve_price && (
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
