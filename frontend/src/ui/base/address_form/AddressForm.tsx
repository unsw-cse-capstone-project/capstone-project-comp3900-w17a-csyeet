import React from "react";
import { observer } from "mobx-react";
import { SelectWrapper } from "../../../ui/base/select_wrapper/SelectWrapper";
import { TextFieldWrapper } from "../../../ui/base/textfield_wrapper/TextFieldWrapper";
import {
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";

// Countries and states sourced from
// https://github.com/stefanbinder/countries-states
export const AddressForm = observer(
  ({
    onChange,
    addressData,
    style,
    className,
    readOnly = false,
  }: {
    onChange: (value: string, field: string) => void;
    addressData?: AddressDetails;
    style?: React.CSSProperties;
    className?: string;
    readOnly?: boolean;
  }) => {
    // Get all the countries
    const countryStateData = require("./country-state.json");
    let countries: Array<string> = [];
    for (var i = 0; i < countryStateData.length; ++i) {
      countries.push(countryStateData[i].name);
    }

    const getStates = (state: string) => {
      var newStates: string[] = [];
      for (var i = 0; i < countryStateData.length; ++i) {
        if (countryStateData[i].name === state) {
          for (var j = 0; j < countryStateData[i].states.length; ++j) {
            newStates.push(countryStateData[i].states[j].code);
          }
        }
      }

      return newStates;
    };

    const { street, suburb, postcode, state, country } = addressData;
    console.log(addressData);
    const [states, setStates] = React.useState<Array<string>>(
      getStates(country)
    );
    const [countryValue, setCountry] = React.useState<string>(country);
    return (
      <div style={style} className={className}>
        <TextFieldWrapper
          readOnly={readOnly}
          field="street"
          label="Street"
          onChange={onChange}
          value={street}
        />
        <TextFieldWrapper
          readOnly={readOnly}
          field="suburb"
          label="Suburb"
          onChange={onChange}
          value={suburb}
        />
        <Grid container spacing={2}>
          <Grid item xs>
            <TextFieldWrapper
              readOnly={readOnly}
              field="postcode"
              style={{
                minWidth: "100px",
              }}
              label="Postcode"
              onChange={onChange}
              value={postcode}
            />
          </Grid>

          {/* Defaults to NSW */}
          <Grid item xs>
            <SelectWrapper
              onChange={onChange}
              field="state"
              label="State"
              data={states}
              value={state}
            />
          </Grid>

          {/* Defaults to Australia */}
          <Grid item xs={6}>
            <FormControl
              fullWidth
              variant="outlined"
              style={{
                minWidth: "120px",
                marginTop: "10px",
              }}
            >
              <InputLabel id="select-outlined-label">Country</InputLabel>
              <Select
                labelId="select-outlined-label"
                id="select-outlined"
                readOnly={readOnly}
                value={countryValue}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                  onChange(e.target.value as string, "country");
                  setCountry(e.target.value as string);
                  setStates(getStates(e.target.value as string));
                }}
                label="Country"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {countries.map((v, i) => (
                  <MenuItem value={v} key={i}>
                    {v}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }
);
