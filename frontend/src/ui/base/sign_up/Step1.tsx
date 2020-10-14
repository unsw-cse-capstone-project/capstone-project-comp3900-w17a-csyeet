import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import {
  Grid,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import SignUpStore from "./SignUpStore";
import TextFieldWrapper from "../textfield_wrapper/TextFieldWrapper";
import SelectWrapper from "../select_wrapper/SelectWrapper";
import NumberFormat from "react-number-format";

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
      />
    );
  });

  return (
    <>
      <FormControl
        fullWidth
        variant="outlined"
        // style={{ marginBottom: "20px" }}
      >
        <InputLabel
          htmlFor="outlined-adornment-card"
          style={{ background: "white" }}
          shrink
        >
          Phone Number
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-card"
          endAdornment={
            <InputAdornment position="end">
              <PhoneAndroidOutlinedIcon />
            </InputAdornment>
          }
          labelWidth={110}
          inputComponent={PhoneInput as any}
        />
      </FormControl>
      <TextFieldWrapper
        field="addressLine"
        label="Address Line"
        value={store.addressLine}
        onChange={onChange}
      />
      <TextFieldWrapper field="suburb" label="Suburb" onChange={onChange} />

      {/* (Jenn) TODO: Need to fix up wierd css here.. extra margin exists for Grid  */}
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextFieldWrapper
            field="postcode"
            label="Postcode"
            value={store.postcode}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs>
          <SelectWrapper
            data={AUSstates}
            field="state"
            label="State"
            value={store.state}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </>
  );
});

export default Step1;
