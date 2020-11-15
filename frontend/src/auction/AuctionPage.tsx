import * as React from "react";
import { BidPriceState } from "../ui/base/bid_price/BidPrice";
import { Typography, Grid, Paper } from "@material-ui/core";
import { Countdown } from "../ui/base/countdown/Countdown";
import classNames from "classnames";
import { auctionPageStyle } from "./AuctionPage.css";
import { dateFormatter } from "../ui/util/helper";
import { AddressHeading } from "../ui/base/address_heading/AddressHeading";
import MuiAlert from "@material-ui/lab/Alert";
import { ErrorBoundaryComponent } from "../ui/base/error_boundary/ErrorBoundary";

export type Address = {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
};

export type AuctionBid = {
  price: number;
  state: BidPriceState;
};

/**
 * Auction Page Component that shows the details of the auction including
 * time, current bid, bidders and bids
 * @param address
 * @param auction_start
 * @param auction_end
 * @param mainImage
 * @param BiddinBox
 * @param BidsList
 * @param BiddersList
 */
export const AuctionPage = ({
  address,
  auction_start,
  auction_end,
  mainImage,
  BiddingBox,
  BidsList,
  BiddersList,
}: {
  address: Address;
  auction_start: Date;
  auction_end: Date;
  mainImage: string;
  BiddingBox: React.ComponentType;
  BidsList: React.ComponentType;
  BiddersList: React.ComponentType;
}) => {
  const { street, suburb, state, postcode } = address;
  const classes = auctionPageStyle();

  let AuctionTime = () => (
    <div className={classes.auctionTime}>
      <Typography variant="body1" className={classes.auctionText}>
        Auction Start: {dateFormatter.format(auction_start)}
      </Typography>
      <Typography variant="body1" className={classes.auctionText}>
        Auction End: {dateFormatter.format(auction_end)}
      </Typography>
    </div>
  );

  if (new Date().getTime() >= auction_start.getTime()) {
    // eslint-disable-next-line react/display-name
    AuctionTime = () => (
      <div className={classes.auctionTime}>
        <Typography variant="body1" className={classes.auctionText}>
          Auction ends in
        </Typography>
        <ErrorBoundaryComponent>
          <Countdown date={auction_end} />
        </ErrorBoundaryComponent>
      </div>
    );
  }

  if (auction_end.getTime() <= new Date().getTime()) {
    // eslint-disable-next-line react/display-name
    AuctionTime = () => (
      <div className={classNames(classes.auctionTime, classes.auctionClosed)}>
        <MuiAlert severity="error">Auction is now closed</MuiAlert>
      </div>
    );
  }

  return (
    <div>
      <AddressHeading
        street={street}
        state={state}
        suburb={suburb}
        postcode={postcode}
      />
      <Paper elevation={0} className={classes.greyBackground}>
        <AuctionTime />
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5} xl={4}>
            <div
              className={classes.mainImage}
              style={{ backgroundImage: `url(${mainImage})` }}
            />
          </Grid>
          <Grid item xs={12} lg={7} xl={8}>
            <BiddingBox />
          </Grid>
        </Grid>
      </Paper>

      {/* bids list */}
      <Grid container spacing={3} className={classes.biddingInfo}>
        <Grid item xs={12} md={9}>
          <BidsList />
        </Grid>
        <Grid item xs={12} md={3}>
          <BiddersList />
        </Grid>
      </Grid>
    </div>
  );
};
