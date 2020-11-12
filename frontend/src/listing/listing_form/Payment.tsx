import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { TextFieldWrapper } from "../../ui/base/input/TextFieldWrapper";
import { ListingStore } from "../ListingPresenter";
import { FormHelperText, Typography, TextField } from "@material-ui/core";
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

export const PaymentDetails: React.FC<{
  store: ListingStore;
}> = observer(({ store }) => {
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
            value.length !== 6 ? setBSBError(true) : setBSBError(false);
            setBsbNo(value);
          }}
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
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
            Invalid Account Number (8-10 digits)
          </FormHelperText>
        )}
      </>
    );
  };

  console.log(bsb);
  console.log(account_number);
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
});
