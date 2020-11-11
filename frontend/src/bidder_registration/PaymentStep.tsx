import * as React from "react";
import { BidderRegistrationStore } from "./BidderRegistrationPresenter";
import { action } from "mobx";
import NumberFormat from "react-number-format";
import {
  Grid,
  TextField,
} from "@material-ui/core";
import { paymentStepStyle } from "./PaymentStep.css";
import { Checkbox } from "../ui/base/input/Checkbox";
import { Typography } from '@material-ui/core';

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

/**
 * Payment Step for bidder registration
 */
export const PaymentStep = ({ store }: {
  store: BidderRegistrationStore;
}) => {
  const CardInputField = () => {
    const [cardNumber, setCardNumber] = React.useState<string>(
      store.cardNumber
    );
    return (
      <TextField
        variant="outlined"
        value={cardNumber}
        label="Card Number"
        onBlur={action(() => (store.cardNumber = cardNumber))}
        fullWidth
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setCardNumber(event.target.value)
        }
        InputProps={{
          inputComponent: CreditCardInput as any,
        }}
      />
    );
  };

  const ExpiryDateInputField = () => {
    const [expiryDate, setExpiryDate] = React.useState<string>(
      store.expiryDate
    );
    return (
      <TextField
        variant="outlined"
        fullWidth
        value={expiryDate}
        label="Expiry Date"
        onBlur={action(() => (store.expiryDate = expiryDate))}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setExpiryDate(event.target.value)
        }
        InputProps={{
          inputComponent: ExpiryDateInput as any,
        }}
      />
    );
  };

  const CCVInputField = () => {
    const [CCV, setCCV] = React.useState<string>(store.ccv);
    return (
      <TextField
        variant="outlined"
        value={CCV}
        label="CCV"
        fullWidth
        onBlur={action(() => (store.ccv = CCV))}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setCCV(event.target.value)
        }
        InputProps={{
          inputComponent: CCVInput as any,
        }}
      />
    );
  };
  const classes = paymentStepStyle();
  return (
    <div className={classes.container}>
      <CardInputField />
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={6}>
          <ExpiryDateInputField />
        </Grid>
        <Grid item xs={6}>
          <CCVInputField />
        </Grid>
      </Grid>
      <Checkbox
        store={store}
        name="confirmPayment"
        Label={<Typography variant="body1">Confirm these details are correct</Typography>}
        style={{ marginTop: "40px" }}
      />
    </div>
  );
};

const CCVInput = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={props.inputRef}
      format="###"
      mask="#"
      placeholder="###"
      onValueChange={(values) => {
        props.onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
    />
  );
};

const ExpiryDateInput = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={props.inputRef}
      format="##/##"
      mask={["M", "M", "Y", "Y"]}
      placeholder="MM/YY"
      onValueChange={(values) => {
        props.onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
    />
  );
};

const CreditCardInput = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={props.inputRef}
      format="#### #### #### ####"
      mask="#"
      placeholder="#### #### #### ####"
      onValueChange={(values) => {
        props.onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
    />
  );
};
