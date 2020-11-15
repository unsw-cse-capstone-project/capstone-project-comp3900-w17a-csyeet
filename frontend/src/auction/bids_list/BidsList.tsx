import * as React from "react";
import { Typography, Divider } from "@material-ui/core";
import {
  BidPriceWithBidderTag,
  BidPrice,
} from "../../ui/base/bid_price/BidPrice";
import { BidderTag } from "../../ui/base/bidder_tag/BidderTag";
import { dateFormatter } from "../../ui/util/helper";
import { bidsListStyle } from "./BidsList.css";
import { Bid } from "../../ui/util/types/bid";
import { ErrorBoundaryComponent } from "../../ui/base/error_boundary/ErrorBoundary";

/**
 * List of bids, the time they were placed and whether they met the reserve
 * @param bids
 */
export const BidsList = ({ bids }: { bids: Bid[] }) => {
  const classes = bidsListStyle();
  return (
    <ErrorBoundaryComponent>
      <div>
        <Typography variant="h5">Bidding History</Typography>
        <Divider className={classes.divider} />
        {bids.length === 0 && (
          <Typography variant="body1" color="textSecondary">
            Currently, there are no bids.
          </Typography>
        )}
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
                {dateFormatter.format(bid.placed_at)}
              </Typography>
              {bid.reserve_met && (
                <Typography variant="body1" className={classes.reserveLabel}>
                  Reserve Met
                </Typography>
              )}
            </div>
          </div>
        ))}
      </div>
    </ErrorBoundaryComponent>
  );
};
