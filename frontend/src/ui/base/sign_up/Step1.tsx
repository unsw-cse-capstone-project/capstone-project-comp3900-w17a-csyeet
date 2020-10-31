import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import {
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import SignUpStore from "./SignUpStore";
import { AddressForm } from "../address_form/AddressForm";
import NumberFormat from "react-number-format";

type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat | null) => void;
  name: string;
};

const Step1: React.FC<{ store: SignUpStore }> = observer(({ store }) => {
  const onChange = action((value: string, name: string) => {
    (store as any)[name] = value;
  });

  const [phoneError, setPhoneError] = React.useState<boolean>(false);
  const phoneErrorMsg = (
    <FormHelperText style={{ color: "red" }}>
      Phone format must be 04.. ... ...
    </FormHelperText>
  );
  const PhoneInput = observer((props: NumberFormatCustomProps) => {
    const { inputRef, ...other } = props;
    return (
      <NumberFormat
        {...other}
        format="#### ### ###"
        mask="#"
        placeholder="04"
        value={store.phoneNo}
        onValueChange={(values) => {
          onChange(values.value, "phoneNo");
        }}
        onBlur={() => {
          store.phoneNo.length != 10
            ? setPhoneError(true)
            : setPhoneError(false);
        }}
      />
    );
  });

  return (
    <div style={{ marginBottom: "10px" }}>
      <FormControl fullWidth variant="outlined" error={phoneError}>
        <InputLabel
          htmlFor="outlined-adornment-card"
          style={{ background: "white" }}
        >
          Phone Number
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-card"
          endAdornment={
            <InputAdornment position="end">
              <PhoneAndroidOutlinedIcon style={{ color: "#7b7b7b" }} />
            </InputAdornment>
          }
          labelWidth={110}
          inputComponent={PhoneInput as any}
        />
        {phoneError ? <>{phoneErrorMsg}</> : <></>}
      </FormControl>
      <AddressForm onChange={onChange} />
    </div>
  );
});

export default Step1;
