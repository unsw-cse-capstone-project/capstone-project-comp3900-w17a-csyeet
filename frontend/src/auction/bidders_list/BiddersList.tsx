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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bidderContainer: {
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(2, 0),
    },
    bidTime: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-end",
    },
    youLabel: {
      color: theme.palette.info.main,
    },
    divider: {
      border: theme.palette.grey[700] + " solid 1px ",
      backgroundColor: theme.palette.grey[700],
    },
  })
);

export const BiddersList = ({
  bidders,
  currentUser,
}: {
  bidders: number[];
  currentUser?: number;
}) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h5">Bidders</Typography>
      <Divider className={classes.divider} />
      {bidders.map((bidder, i) => (
        <div key={i} className={classes.bidderContainer}>
          <BidderTag bidderNumber={bidder} />
          <div className={classes.bidTime}>
            {currentUser && currentUser === bidder && (
              <Typography variant="body1" className={classes.youLabel}>
                You
              </Typography>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
