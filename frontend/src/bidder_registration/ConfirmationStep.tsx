import * as React from "react";
import { BidderRegistrationStore } from "./BidderRegistrationPresenter";
import { Typography } from "@material-ui/core";
import { BidPrice } from "../ui/base/bid_price/BidPrice";
import { confirmationStepStyle } from "./ConfirmationStep.css";

/**
 * Confirmation step with the bidding price
 * @param store
 */
export const ConfirmationStep = ({
  store,
}: {
  store: BidderRegistrationStore;
}) => {
  const classes = confirmationStepStyle();
  return (
    <div className={classes.container}>
      <Typography variant="body1" className={classes.text} align="center">
        Please confirm you want to register to be a bidder with the following
        initial bid amount
      </Typography>
      <BidPrice bid={store.initialBid} state="current" />
    </div>
  );
};
