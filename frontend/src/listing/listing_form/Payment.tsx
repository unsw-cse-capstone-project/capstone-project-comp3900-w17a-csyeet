import React from "react";
import { action } from "mobx";
import { TextFieldWrapper } from "../../ui/base/input/TextFieldWrapper";
import { ListingStore } from "../ListingPresenter";
import { Typography, TextField } from "@material-ui/core";
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
      format="###-###"
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

export const PaymentDetails = ({ store }: { store: ListingStore }) => {
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
      <TextField
        style={{ marginTop: "10px" }}
        variant="outlined"
        value={value}
        error={BSBError}
        label="BSB"
        helperText={BSBError ? "Invalid BSB" : undefined}
        onBlur={() => {
          setBsbNo(value);
          value.length !== 6 ? setBSBError(true) : setBSBError(false);
        }}
        fullWidth
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
          setBSBError(false);
        }}
        InputProps={{
          inputComponent: BSBInput as any,
        }}
      />
    );
  };

  const setAccNo = action((value: string) => {
    store.payment.account_number = value;
  });
  const AccNoInputField = () => {
    const [value, setValue] = React.useState<string>(account_number);
    const [AccNoError, setAccNoError] = React.useState<boolean>(false);
    return (
      <TextField
        style={{ marginTop: "10px" }}
        variant="outlined"
        value={value}
        helperText={AccNoError ? "Invalid Account Number (8-10 digits)" : undefined}
        error={AccNoError}
        label="Account Number"
        onBlur={() => {
          value.length < 8 || value.length > 10
            ? setAccNoError(true)
            : setAccNoError(false);
          setAccNo(value);
        }}
        fullWidth
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
          setAccNoError(false);
        }}
        InputProps={{
          inputComponent: AccNoInput as any,
        }}
      />
    );
  };

  return (
    <>
      <Typography variant={"subtitle1"}>Payment Details</Typography>
      <TextFieldWrapper
        value={account_name}
        field="account_name"
        label="Account Name"
        onChange={onChange}
      />
      <BSBInputField />
      <AccNoInputField />
    </>
  );
};
