import * as React from "react";
import { observable, action } from "mobx";
import {
  Card,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from "@material-ui/core";
import {
  BidPriceWithBidderTag,
  BidPrice,
  BidPriceState,
} from "../../ui/base/bid_price/BidPrice";
import { observer } from "mobx-react";
import { createPriceInput } from "../../ui/base/input/PriceFormat";
import { BiddingBoxStyle } from "./BiddingBox.css";

export class BiddingBoxStore {
  @observable
  biddingPrice: number;

  constructor() {
    console.log("cosntructing");
    this.biddingPrice = 0;
  }
}

export const BiddingBox = observer(
  ({
    store,
    currentBid,
    bidState,
    BidderTag,
    isAuctionClosed = false,
    enableBidding = true,
    onPlaceBid,
    style,
  }: {
    store: BiddingBoxStore;
    currentBid: number;
    bidState: BidPriceState;
    BidderTag: React.ComponentType;
    isAuctionClosed?: boolean;
    enableBidding?: boolean;
    onPlaceBid(price: number): void;
    style?: React.CSSProperties;
  }) => {
    const classes = BiddingBoxStyle();
    const onChange = action((value: string) => {
      store.biddingPrice = parseInt(value);
    });
    const InputComponent = createPriceInput({
      value: store.biddingPrice,
      onChange,
    });
    const onClick = () => {
      onPlaceBid(store.biddingPrice);
    };
    const BidPriceWrapper = () => (
      <BidPrice price={currentBid} state={bidState} />
    );
    return (
      <Card variant="outlined" style={style}>
        <div className={classes.bidderBox}>
          <Typography variant="body1">
            {isAuctionClosed ? "Final Bid" : "Current Bid"}
          </Typography>
          <div className={classes.tagContainer}>
            <BidPriceWithBidderTag
              BidPrice={BidPriceWrapper}
              BidderTag={BidderTag}
            />
          </div>
          {enableBidding && !isAuctionClosed && (
            <div className={classes.inputContainer}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  type=""
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  labelWidth={60}
                  inputComponent={InputComponent as any}
                />
              </FormControl>
              <Button
                size="large"
                variant="outlined"
                className={classes.placeBidButton}
                onClick={onClick}
              >
                Place Bid
              </Button>
            </div>
          )}
        </div>
      </Card>
    );
  }
);
