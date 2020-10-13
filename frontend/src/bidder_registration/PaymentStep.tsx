import * as React from "react";
import { BidderRegistrationStore } from "./BidderRegistrationPresenter";
import { action } from "mobx";
import NumberFormat from "react-number-format";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Grid,
} from "@material-ui/core";
import { CreditCard } from "@material-ui/icons";
import { observer } from "mobx-react";
import { paymentStepStyle } from "./PaymentStep.css";

type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat | null) => void;
  name: string;
};

type PaymentStepProps = {
  store: BidderRegistrationStore;
};

export const PaymentStep = ({ store }: PaymentStepProps) => {
  const onChangeCard = action((value: string) => {
    store.cardNumber = value;
  });
  const onChangeDate = action((value: string) => {
    store.expiryDate = value;
  });
  const onChangeCCV = action((value: string) => {
    store.ccv = value;
  });

  const CreditCardInput = observer((props: NumberFormatCustomProps) => {
    const { inputRef, ...other } = props;
    return (
      <NumberFormat
        {...other}
        format="#### #### #### ####"
        mask="#"
        value={store.cardNumber}
        onValueChange={(values) => {
          onChangeCard(values.value);
        }}
      />
    );
  });

  const ExpiryDateInput = observer((props: NumberFormatCustomProps) => {
    const { inputRef, ...other } = props;
    return (
      <NumberFormat
        {...other}
        format="##/##"
        mask={["M", "M", "Y", "Y"]}
        placeholder="MM/YY"
        value={store.expiryDate}
        onValueChange={(values) => {
          onChangeDate(values.value);
        }}
      />
    );
  });

  const CCVInput = observer((props: NumberFormatCustomProps) => {
    const { inputRef, ...other } = props;
    return (
      <NumberFormat
        {...other}
        format="###"
        mask="#"
        value={store.ccv}
        onValueChange={(values) => {
          onChangeCCV(values.value);
        }}
      />
    );
  });

  const classes = paymentStepStyle();
  return (
    <div className={classes.container}>
      <FormControl
        fullWidth
        variant="outlined"
        style={{ marginBottom: "20px" }}
      >
        <InputLabel
          htmlFor="outlined-adornment-card"
          style={{ background: "white" }}
          shrink
        >
          Card Number
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-card"
          endAdornment={
            <InputAdornment position="end">{<CreditCard />}</InputAdornment>
          }
          labelWidth={110}
          inputComponent={CreditCardInput as any}
        />
      </FormControl>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-date"
              style={{ background: "white" }}
              shrink
            >
              Expiry Date
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-date"
              labelWidth={80}
              inputComponent={ExpiryDateInput as any}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-CCV"
              shrink
              style={{ background: "white" }}
            >
              CCV
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-CCV"
              labelWidth={40}
              inputComponent={CCVInput as any}
            />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};
