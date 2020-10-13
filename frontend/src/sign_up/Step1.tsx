import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { Grid } from "@material-ui/core";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import SignUpStore from "./SignUpStore";
import TextFieldWrapper from "../ui/base/textfield_wrapper/TextFieldWrapper";
import SelectWrapper from "../ui/base/select_wrapper/SelectWrapper";

// import ContextDetailStyles from "./contactDetailForm.css";
const AUSstates = ["NSW", "ACT", "NT", "SA", "QLD", "WA", "TAS"];

const Step1: React.FC<{ store: SignUpStore }> = observer(({ store }) => {
  const onChange = action((value: string, name: string) => {
    (store as any)[name] = value;
  });
  return (
    <>
      <TextFieldWrapper
        field="phoneNo"
        label="Phone Number"
        value={store.phoneNo}
        onChange={onChange}
        adornment={<PhoneAndroidOutlinedIcon />}
      />
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
