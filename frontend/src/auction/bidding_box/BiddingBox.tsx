import * as React from "react";
import { observable, action, runInAction } from "mobx";
import {
  Card,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  FormHelperText,
} from "@material-ui/core";
import {
  BidPriceWithBidderTag,
  BidPrice,
  BidPriceState,
} from "../../ui/base/bid_price/BidPrice";
import { createPriceInput } from "../../ui/base/input/PriceFormat";
import { BiddingBoxStyle } from "./BiddingBox.css";
import { observer } from "mobx-react";

export class BiddingBoxStore {
  @observable
  biddingPrice: number = 0;
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
    currentBid?: number;
    bidState: BidPriceState;
    BidderTag?: React.ComponentType;
    isAuctionClosed?: boolean;
    enableBidding?: boolean;
    onPlaceBid(price: number): void;
    style?: React.CSSProperties;
  }) => {
    const [cBid, setCBid] = React.useState(currentBid);
    const [error, setError] = React.useState("");
    const classes = BiddingBoxStyle();
    const InputComponent = createPriceInput({
      store,
      name: "biddingPrice",
    });
    const onClick = action(() => {
      if (cBid === undefined) {
        return;
      }
      if (store.biddingPrice <= cBid) {
        setError("Bid must be higher than current bid");
      } else {
        onPlaceBid(store.biddingPrice);
        setCBid(store.biddingPrice);
        runInAction(() => (store.biddingPrice = 0));
        setError("");
      }
    });
    const BidPriceWrapper = () => (
      <BidPrice bid={currentBid} state={bidState} />
    );
    return (
      <Card variant="outlined" style={style}>
        <div className={classes.bidderBox}>
          <Typography variant="body1">
            {isAuctionClosed ? "Final Bid" : "Current Bid"}
          </Typography>
          <div className={classes.tagContainer}>
            {!currentBid || !BidderTag ? (
              <BidPrice state="current" />
            ) : (
              <BidPriceWithBidderTag
                BidPrice={BidPriceWrapper}
                BidderTag={BidderTag}
              />
            )}
          </div>
          {enableBidding && !isAuctionClosed && currentBid && (
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
          {error !== "" && <FormHelperText>{error}</FormHelperText>}
        </div>
      </Card>
    );
  }
);
