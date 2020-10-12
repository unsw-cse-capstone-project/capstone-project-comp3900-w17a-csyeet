import * as React from "react";
import { BidderRegistrationStore } from "./BidderRegistrationPresenter";
import { computed } from "mobx";
import { observer } from "mobx-react";
import {
  FormHelperText,
  Typography,
  Link,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import { BidPrice } from "../ui/base/bid_price/BidPrice";
import { createPriceInput } from "../ui/base/input/PriceFormat";
import { initialBidStepStyle } from "./InitialBidStep.css";
import { Checkbox } from "../ui/base/input/Checkbox";

export const InitialBidStep = ({
  store,
  currentBid,
}: {
  store: BidderRegistrationStore;
  currentBid: number;
}) => {
  const errorMessage = computed(() => {
    if (store.initialBid <= currentBid) {
      return "Your bid must be greater than the current bid";
    }
  });

  const ErrorText = observer(() => {
    return errorMessage.get() ? (
      <FormHelperText id="helper-text">{errorMessage.get()}</FormHelperText>
    ) : null;
  });

  const InputComponent = createPriceInput({
    store,
    name: "initialBid",
  });

  const Label = (
    <Typography variant="body1">
      I agree to the <Link href="#">Terms and Conditions</Link> and{" "}
      <Link href="#">Terms of Sale</Link>
    </Typography>
  );
  const classes = initialBidStepStyle();
  return (
    <div className={classes.container}>
      <Typography variant="body1">
        Submit the initial amount you want to bid for this property
      </Typography>
      <div className={classes.currentBid}>
        <Typography variant="body2">Current Bid</Typography>
        <BidPrice price={currentBid} state="current" />
      </div>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          labelWidth={60}
          inputComponent={InputComponent as any}
          aria-describedby="helper-text"
        />
        <ErrorText />
      </FormControl>
      <Checkbox
        store={store}
        name="agreeToTerms"
        Label={Label}
        style={{ marginTop: "40px" }}
      />
    </div>
  );
};
