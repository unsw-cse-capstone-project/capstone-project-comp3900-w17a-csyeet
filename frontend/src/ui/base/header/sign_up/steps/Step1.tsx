import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import {
  Grid,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import { SignUpStore } from "../SignUpStore";
import { TextFieldWrapper } from "../../../textfield_wrapper/TextFieldWrapper";
import { SelectWrapper } from "../../../select_wrapper/SelectWrapper";

type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat | null) => void;
  name: string;
};

const AUSstates = ["NSW", "ACT", "NT", "SA", "QLD", "WA", "TAS"];
const Step1: React.FC<{ store: SignUpStore }> = observer(({ store }) => {
  const onChange = action((value: string, name: string) => {
    (store as any)[name] = value;
  });

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

  const [phoneError, setPhoneError] = React.useState<boolean>(false);
  const phoneErrorMsg = (
    <FormHelperText style={{ color: "red" }}>
      Phone format must be 04.. ... ...
    </FormHelperText>
  );

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
      <TextFieldWrapper
        field="addressLine"
        label="Address Line"
        value={store.addressLine}
        onChange={onChange}
      />
      <TextFieldWrapper field="suburb" label="Suburb" onChange={onChange} />

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextFieldWrapper
            field="postcode"
            label="Postcode"
            value={store.postcode}
            onChange={onChange}
          />
          {phoneError ? <>{phoneErrorMsg}</> : <></>}
        </Grid>
        <Grid item xs>
          <div style={{ marginTop: "10px" }}>
            <SelectWrapper
              data={AUSstates}
              field="state"
              label="State"
              value={store.state}
              onChange={onChange}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
});

export default Step1;
