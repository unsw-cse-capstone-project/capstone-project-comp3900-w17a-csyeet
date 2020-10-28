import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { ListingStore } from "../../ListingStore";
import { SelectWrapper } from "../../../ui/base/select_wrapper/SelectWrapper";
import { TextFieldWrapper } from "../../../ui/base/textfield_wrapper/TextFieldWrapper";
import { Grid } from "@material-ui/core";

// Countries and states sourced from
// https://github.com/stefanbinder/countries-states
export const AddressInputs: React.FC<{ store: ListingStore }> = observer(
  ({ store }) => {
    const countryStateData = require("./country-state.json");

    // Get all the countries
    var countries: Array<string> = [];
    for (var i = 0; i < countryStateData.length; ++i) {
      countries.push(countryStateData[i].name);
    }
    const AUStates = ["NSW", "ACT", "NT", "SA", "QLD", "VIC", "TAS"];
    const [states, setStates] = React.useState<Array<string>>(AUStates);
    const onChange = action((value: string, field: string) => {
      (store as any)[field] = value;
      if (field == "country") {
        var newStates: Array<string> = [];
        for (var i = 0; i < countryStateData.length; ++i) {
          if (countryStateData[i].name == value) {
            for (var j = 0; j < countryStateData[i].states.length; ++j) {
              newStates.push(countryStateData[i].states[j].name);
            }
          }
        }
        setStates(newStates);
      }
    });

    return (
      <>
        <TextFieldWrapper
          field="street"
          label="Street"
          onChange={onChange}
          value={store.street}
        />
        <TextFieldWrapper
          field="suburb"
          label="Suburb"
          onChange={onChange}
          value={store.suburb}
        />
        <Grid container spacing={2}>
          <Grid item xs>
            <TextFieldWrapper
              field="postcode"
              label="Postcode"
              onChange={onChange}
              value={store.postcode}
            />
          </Grid>

          {/* Defaults to NSW */}
          <Grid item xs>
            <SelectWrapper
              field="state"
              label="State"
              data={states}
              value={store.state}
              onChange={onChange}
            />
          </Grid>

          {/* Defaults to Australia */}
          <Grid item xs={6}>
            <SelectWrapper
              field="country"
              label="Country"
              data={countries}
              value={store.country}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </>
    );
  }
);
