import * as React from "react";
import { BidPriceState } from "../ui/base/bid_price/BidPrice";
import {
  makeStyles,
  Theme,
  createStyles,
  Button,
  Typography,
  capitalize,
  Grid,
  Hidden,
} from "@material-ui/core";
import { Countdown } from "../ui/base/countdown/Countdown";
import { ArrowBackIos } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      padding: theme.spacing(2, "15%", 0, "15%"),
      display: "flex",
      flexDirection: "column",
    },
    backButton: {
      width: "fit-content",
    },
    streetAddress: {
      textTransform: "capitalize",
      marginTop: theme.spacing(2),
    },
    secondaryAddress: {
      textTransform: "capitalize",
      color: theme.palette.grey[500],
    },
    auctionTime: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(3, 0, 5, 0),
    },
    auctionText: {
      marginBottom: theme.spacing(1),
      color: theme.palette.grey[700],
    },
    mainImage: {
      width: "100%",
      height: "100%",
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  })
);

export type Address = {
  streetAddress: string;
  suburb: string;
  state: string;
  postcode: number;
};

export type AuctionBid = {
  price: number;
  state: BidPriceState;
};

export const AuctionPage = ({
  address,
  auctionDate,
  mainImage,
  BiddingBox,
}: {
  address: Address;
  auctionDate: Date;
  mainImage: string;
  currentBid: AuctionBid;
  bidderNumber: number;
  BiddingBox: React.ComponentType;
}) => {
  const { streetAddress, suburb, state, postcode } = address;
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Button className={classes.backButton}>
        <ArrowBackIos />
        Back to Listing
      </Button>
      <Typography variant="h2" className={classes.streetAddress}>
        {streetAddress}
      </Typography>
      <Typography variant="h4" className={classes.secondaryAddress}>
        {suburb}
        {", "}
        <span style={{ textTransform: "uppercase" }}>{state}</span> {postcode}
      </Typography>
      <div className={classes.auctionTime}>
        <Typography variant="body1" className={classes.auctionText}>
          Auction ends in
        </Typography>
        <Countdown date={auctionDate} />
      </div>
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
    </div>
  );
};
