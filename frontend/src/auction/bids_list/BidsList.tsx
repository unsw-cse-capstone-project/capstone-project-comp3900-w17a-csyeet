import * as React from "react";
import { AuctionBid } from "../AuctionPage";
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Divider,
} from "@material-ui/core";
import {
  BidPriceWithBidderTag,
  BidPrice,
} from "../../ui/base/bid_price/BidPrice";
import { BidderTag } from "../../ui/base/bidder_tag/BidderTag";

export type Bid = {
  value: AuctionBid;
  bidder: number;
  time: Date;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bidContainer: {
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(2, 0),
    },
    bidTime: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-end",
      maxWidth: "40%",
      textAlign: "right",
    },
    reserveLabel: {
      color: theme.palette.success.main,
    },
    divider: {
      border: theme.palette.grey[700] + " solid 1px ",
      backgroundColor: theme.palette.grey[700],
    },
  })
);

export const BidsList = ({ bids }: { bids: Bid[] }) => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Australia/Sydney",
    hour12: true,
  });
  const classes = useStyles();
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
              {formatter.format(bid.time)}
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
