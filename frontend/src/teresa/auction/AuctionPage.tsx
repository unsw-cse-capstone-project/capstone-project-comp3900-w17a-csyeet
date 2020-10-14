import * as React from "react";
import { Typography, Grid, Hidden } from "@material-ui/core";
import classNames from "classnames";
import { BidPriceState } from "../../ui/base/teresa/bid_price/BidPrice";
import { Countdown } from "../../ui/base/teresa/countdown/Countdown";
import { auctionPageStyle } from "./AuctionPage.css";
import { dateFormatter } from "../../ui/util/helper";

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
        <Countdown date={auction_end} />
      </div>
    );
  }

  if (auction_end.getTime() <= new Date().getTime()) {
    // eslint-disable-next-line react/display-name
    AuctionTime = () => (
      <div className={classNames(classes.auctionTime, classes.auctionClosed)}>
        <Typography variant="body1">Auction closed</Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h2" className={classes.streetAddress}>
        {street}
      </Typography>
      <Typography variant="h4" className={classes.secondaryAddress}>
        {suburb}
        {", "}
        <span style={{ textTransform: "uppercase" }}>{state}</span> {postcode}
      </Typography>
      <AuctionTime />
      <Hidden lgDown>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <div
              className={classes.mainImage}
              style={{ backgroundImage: `url(${mainImage})` }}
            />
          </Grid>
          <Grid item xs={8}>
            <BiddingBox />
          </Grid>
        </Grid>
      </Hidden>
      <Hidden only={["xs", "sm", "xl"]}>
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <div
              className={classes.mainImage}
              style={{ backgroundImage: `url(${mainImage})` }}
            />
          </Grid>
          <Grid item xs={7}>
            <BiddingBox />
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        {/* xs sm */}
        <Grid container>
          <Grid item xs={12}>
            <div
              className={classes.mainImage}
              style={{
                backgroundImage: `url(${mainImage})`,
                height: "auto",
                paddingTop: "67%",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <BiddingBox />
          </Grid>
        </Grid>
      </Hidden>
      {/* bids list */}
      <div className={classes.biddingInfo}>
        <Hidden smDown>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <BidsList />
            </Grid>
            <Grid item xs={3}>
              <BiddersList />
            </Grid>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid container>
            <Grid item xs={12}>
              <BidsList />
            </Grid>
            <Grid item xs={12}>
              <BiddersList />
            </Grid>
          </Grid>
        </Hidden>
      </div>
    </div>
  );
};
