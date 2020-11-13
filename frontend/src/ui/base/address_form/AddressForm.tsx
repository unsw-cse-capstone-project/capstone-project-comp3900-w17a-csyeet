import React from "react";
import { observer } from "mobx-react";
import { SelectWrapper } from "../input/SelectWrapper";
import { TextFieldWrapper } from "../input/TextFieldWrapper";
import {
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";

export type AddressDetails = {
  street: string;
  suburb: string;
  postcode: string;
  state: string;
  country: string;
};

// Countries and states sourced from
// https://github.com/stefanbinder/countries-states
export const AddressForm = observer(
  ({
    onChange,
    addressData,
    readOnly = false,
    style,
    className,
    where = "other",
  }: {
    onChange: (value: string, field: string) => void;
    addressData: AddressDetails;
    style?: React.CSSProperties;
    className?: string;
    readOnly?: boolean;
    where?: 'other' | 'signUp';
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
    const [states, setStates] = React.useState<Array<string>>(
      getStates(country)
    );
    const [countryValue, setCountry] = React.useState<string>(country);
    return (
      <Grid
        container
        spacing={where === "signUp" ? 0 : 2}
        style={style}
        className={className}
      >
        <Grid item xs={12}>
          <TextFieldWrapper
            readOnly={readOnly}
            field="street"
            label="Street"
            onChange={onChange}
            value={street}
          />
        </Grid>
        <Grid item xs={12} md={where === "signUp" ? 12 : 6}>
          <TextFieldWrapper
            readOnly={readOnly}
            field="suburb"
            label="Suburb"
            onChange={onChange}
            value={suburb}
          />
        </Grid>
        <Grid item xs={where === "signUp" ? 12 : 6}>
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
        <Grid item xs={where === "signUp" ? 12 : 6}>
          <SelectWrapper
            onChange={onChange}
            readOnly={readOnly}
            field="state"
            label="State"
            data={states}
            value={state}
          />
        </Grid>
        {/* Defaults to Australia */}
        <Grid item xs={where === "signUp" ? 12 : 6}>
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
              disabled={readOnly}
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
    );
  }
);
