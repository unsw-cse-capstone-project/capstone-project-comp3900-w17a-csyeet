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
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import {
  BidPriceWithBidderTag,
  BidPrice,
  BidPriceState,
} from "../../ui/base/bid_price/BidPrice";
import { observer } from "mobx-react";
import NumberFormat from "react-number-format";

export class BiddingBoxStore {
  @observable
  biddingPrice: number;

  @observable
  isError: boolean = false;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bidderBox: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(6, 0),
    },
    tagContainer: {
      width: "50%",
    },
    inputContainer: {
      display: "flex",
      width: "70%",
      marginTop: theme.spacing(2),
    },
    placeBidButton: {
      minWidth: "min-content",
      whiteSpace: "nowrap",
      marginLeft: theme.spacing(2),
    },
  })
);
type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

export const BiddingBox = observer(
  ({
    store,
    currentBid,
    bidState,
    BidderTag,
    onPlaceBid,
    style,
  }: {
    store: BiddingBoxStore;
    currentBid: number;
    bidState: BidPriceState;
    BidderTag: React.ComponentType;
    onPlaceBid(price: number): void;
    style?: React.CSSProperties;
  }) => {
    const classes = useStyles();
    const onChange = action((event: React.ChangeEvent<HTMLInputElement>) => {
      store.biddingPrice = parseInt(event.target.value);
    });
    const InputComponent = (props: NumberFormatCustomProps) => {
      const { inputRef, onChange, ...other } = props;
      return (
        <NumberFormat
          {...other}
          getInputRef={inputRef}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          thousandSeparator
          decimalScale={0}
          isNumericString
        />
      );
    };
    const onClick = () => {
      onPlaceBid(store.biddingPrice);
    };
    const BidPriceWrapper = () => (
      <BidPrice price={currentBid} state={bidState} />
    );
    return (
      <Card variant="outlined" style={style}>
        <div className={classes.bidderBox}>
          <Typography variant="body1">Current Bid</Typography>
          <div className={classes.tagContainer}>
            <BidPriceWithBidderTag
              BidPrice={BidPriceWrapper}
              BidderTag={BidderTag}
            />
          </div>
          <div className={classes.inputContainer}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={store.biddingPrice}
                type=""
                onChange={onChange}
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
        </div>
      </Card>
    );
  }
);
