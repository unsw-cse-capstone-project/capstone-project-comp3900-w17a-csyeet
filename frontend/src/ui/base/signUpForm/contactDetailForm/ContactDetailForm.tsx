import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import TextFieldWrapper from "../../textFieldWrapper/TextFieldWrapper";
import SignInStore from "../SignUpStore";
import { InputAdornment, Grid } from "@material-ui/core";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import SelectWrapper from "../../selectWrapper/SelectWrapper";

// import ContextDetailStyles from "./contactDetailForm.css";
const AUSstates = ["NSW", "ACT", "NT", "SA", "QLD", "WA", "TAS"];

const ContactDetailForm: React.FC<{ store: SignInStore }> = observer(
  ({ store }) => {
    const onChange = action((value: string, name: string) => {
      (store as any)[name] = value;
    });
    return (
      <>
        <TextFieldWrapper
          field="phoneNo"
          label="Phone Number"
          onChange={onChange}
          adornment={
            <InputAdornment position="end">
              <PhoneAndroidOutlinedIcon />
            </InputAdornment>
          }
        />
        <TextFieldWrapper
          field="addressLine"
          label="Address Line"
          onChange={onChange}
        />
        <TextFieldWrapper field="suburb" label="Suburb" onChange={onChange} />

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextFieldWrapper
              field="postcode"
              label="Postcode"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs>
            <SelectWrapper
              data={AUSstates}
              field="state"
              label="State"
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </>
    );
  }
);

export default ContactDetailForm;
