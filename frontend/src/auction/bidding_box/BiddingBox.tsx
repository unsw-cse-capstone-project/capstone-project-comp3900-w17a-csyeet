import * as React from "react";
import { observable, action, runInAction, IComputedValue } from "mobx";
import {
  Card,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  FormHelperText,
  Grid,
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

/**
 * Bidder box that allows a registered bidder to bid
 * @param store
 * @param currentBid
 * @param shouldDisableBiddingButton
 * @param bidState
 * @param BidderTag
 * @param isAuctionClosed
 * @param enableBidding
 * @param onPlaceBid
 * @param style,
 */
export const BiddingBox = observer(
  ({
    store,
    currentBid,
    shouldDisableBiddingButton,
    bidState,
    BidderTag,
    isAuctionClosed = false,
    enableBidding,
    onPlaceBid,
    style,
  }: {
    store: BiddingBoxStore;
    currentBid?: number;
    bidState: BidPriceState;
    shouldDisableBiddingButton: IComputedValue<boolean>;
    BidderTag?: React.ComponentType;
    isAuctionClosed?: boolean;
    enableBidding: boolean;
    onPlaceBid(price: number, onSuccess: () => void): void;
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
        onPlaceBid(store.biddingPrice, () => {
          setCBid(store.biddingPrice);
          runInAction(() => (store.biddingPrice = 0));
          setError("");
        });
      }
    });
    const BidPriceWrapper = () => (
      <BidPrice bid={currentBid} state={bidState} />
    );
    return (
      <Card variant="outlined" style={style}>
        <div className={classes.bidderBox}>
          <Typography variant="h6">
            <b>{isAuctionClosed ? "Final Bid" : "Current Bid"}</b>
          </Typography>
          {!currentBid || !BidderTag ? (
            <Typography variant="body1" color="textSecondary">
              No bids yet
            </Typography>
          ) : (
              <BidPriceWithBidderTag
                BidPrice={BidPriceWrapper}
                BidderTag={BidderTag}
              />
            )}
          {enableBidding && !isAuctionClosed && currentBid && (
            <div className={classes.inputContainer}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={7} lg={8}>
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
                </Grid>
                <Grid item xs={12} sm={6} md={5} lg={4}>
                  <Button
                    size="large"
                    fullWidth
                    variant="outlined"
                    className={classes.placeBidButton}
                    onClick={onClick}
                    disabled={shouldDisableBiddingButton.get()}
                  >
                    Place Bid
                  </Button>
                </Grid>
              </Grid>
            </div>
          )}
          {error !== "" && <FormHelperText>{error}</FormHelperText>}
        </div>
      </Card>
    );
  }
);
