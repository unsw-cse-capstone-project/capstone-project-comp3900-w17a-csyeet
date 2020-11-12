import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { TextFieldWrapper } from "../../ui/base/input/TextFieldWrapper";
import { ListingStore } from "../ListingPresenter";
import { FormHelperText, Typography, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import NumberFormat from "react-number-format";

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const BSBInput = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={props.inputRef}
      format="### ###"
      mask="#"
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

const AccNoInput = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={props.inputRef}
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

export const PaymentDetails: React.FC<{
  store: ListingStore;
  edit: boolean;
}> = observer(({ store, edit }) => {
  const { confirmed_auction_start } = store.auction;
  const { account_name, bsb, account_number } = store.payment;
  const onChange = action((value: string, field: string) => {
    (store as any).payment[field] = value;
  });

  const setBsbNo = action((value: string) => {
    store.payment.bsb = value;
  });
  const BSBInputField = () => {
    const [value, setValue] = React.useState<string>(bsb);
    const [BSBError, setBSBError] = React.useState<boolean>(false);
    return (
      <>
        <TextField
          style={{ marginTop: "10px" }}
          variant="outlined"
          value={value}
          error={BSBError}
          label="BSB"
          onBlur={() => {
            value.length !== 7 ? setBSBError(true) : setBSBError(false);
            setBsbNo(value);
          }}
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
            console.log("Value: ", value);
          }}
          InputProps={{
            inputComponent: BSBInput as any,
          }}
        />
        {BSBError && (
          <FormHelperText style={{ color: "red" }}>Invalid BSB</FormHelperText>
        )}
      </>
    );
  };

  const setAccNo = action((value: string) => {
    store.payment.account_number = value;
  });
  const AccNoInputField = () => {
    const [value, setValue] = React.useState<string>(account_number);
    const [AccNoError, setAccNoError] = React.useState<boolean>(false);
    return (
      <>
        <TextField
          style={{ marginTop: "10px" }}
          variant="outlined"
          value={value}
          error={AccNoError}
          label="Account Number"
          onBlur={() => {
            value.length < 8 || value.length > 10
              ? setAccNoError(true)
              : setAccNoError(false);
            setAccNo(value);
          }}
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setValue(event.target.value)
          }
          InputProps={{
            inputComponent: AccNoInput as any,
          }}
        />
        {AccNoError && (
          <FormHelperText style={{ color: "red" }}>
            Invalid Account Number
          </FormHelperText>
        )}
      </>
    );
  };

  console.log(store.payment.bsb);
  let readOnly = false;
  if (edit && confirmed_auction_start)
    readOnly =
      new Date().getTime() > (confirmed_auction_start as Date).getTime();
  return (
    <>
      {readOnly && (
        <Alert
          severity="info"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          You cannot edit your payment details during your auction
        </Alert>
      )}
      <Typography variant={"subtitle1"}>Payment Details</Typography>
      <TextFieldWrapper
        value={account_name}
        field="account_name"
        label="Account Name"
        onChange={onChange}
        readOnly={readOnly}
      />
      <BSBInputField />
      <AccNoInputField />
    </>
  );
});
