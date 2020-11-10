import * as React from "react";
import { BidderRegistrationStore } from "./BidderRegistrationPresenter";
import {
  Typography,
  Link,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import { createPriceInput } from "../ui/base/input/PriceFormat";
import { initialBidStepStyle } from "./InitialBidStep.css";
import { Checkbox } from "../ui/base/input/Checkbox";

/**
 * Initial bidding step to get the initial bid and confirm
 * terms and conditions
 */
export const InitialBidStep = ({
  store,
}: {
  store: BidderRegistrationStore;
}) => {
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
      <Typography variant="body1" align="center" style={{ marginBottom: "20px" }}>
        Submit the initial amount you want to bid for this property
      </Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          labelWidth={60}
          inputComponent={InputComponent as any}
        />
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
