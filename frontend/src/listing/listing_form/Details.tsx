import React from "react";
import { observer } from "mobx-react";
import { Paper, Typography, Grid } from "@material-ui/core";
import { AddressForm } from "../../ui/base/address_form/AddressForm";
import { ListingStore } from "../ListingPresenter";
import { TextFieldWrapper } from "../../ui/base/textfield_wrapper/TextFieldWrapper";
import { SelectWrapper } from "../../ui/base/select_wrapper/SelectWrapper";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import BathtubOutlinedIcon from "@material-ui/icons/BathtubOutlined";
import DriveEtaOutlinedIcon from "@material-ui/icons/DriveEtaOutlined";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { computed, runInAction } from "mobx";

export const DetailStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    cardContainer: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      padding: "10px",
      marginTop: "10px",
    },
    cardLabel: {
      display: "flex",
      flexDirection: "row",
      verticalAlign: "center",
      marginTop: "10px",
    },
  })
);

export const Details: React.FC<{
  store: ListingStore;
}> = observer(({ store }) => {
  const {
    type,
    street,
    suburb,
    postcode,
    state,
    country,
    num_bedrooms,
    num_bathrooms,
    num_car_spaces,
  } = store.listing;
  const classes = DetailStyles();
  const propertyTypes = ["Apartment", "Duplex", "House", "Studio", "Townhouse"];

  const onChange = (value: string, field: string) => {
    runInAction(() => ((store as any).listing[field] = value));
  };

  const getAddressData = computed(() => {
    return {
      street: street,
      suburb: suburb,
      postcode: postcode,
      state: state,
      country: country,
    };
  });

  return (
    <div className={classes.container}>
      <Typography variant={"subtitle1"}> Property Address</Typography>
      <AddressForm onChange={onChange} addressData={getAddressData.get()} />
      <Typography variant={"subtitle1"} style={{ marginTop: "30px" }}>
        Property Details
      </Typography>
      <SelectWrapper
        data={propertyTypes}
        label="Property Type"
        field="type"
        value={type}
        onChange={onChange}
        required={true}
      />
      <Grid container spacing={2}>
        <Grid item xs>
          <Paper className={classes.cardContainer}>
            <div className={classes.cardLabel}>
              <HotelOutlinedIcon style={{ marginRight: "10px" }} />
              <Typography>Bedroom(s)</Typography>
            </div>
            <TextFieldWrapper
              field="num_bedrooms"
              label="Bedroom(s)"
              type="number"
              onChange={onChange}
              value={num_bedrooms.toString()}
            />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.cardContainer}>
            <div className={classes.cardLabel}>
              <BathtubOutlinedIcon style={{ marginRight: "10px" }} />
              <Typography>Bathrooms(s)</Typography>
            </div>
            <TextFieldWrapper
              field="num_bathrooms"
              label="Bathroom(s)"
              type="number"
              onChange={onChange}
              value={num_bathrooms.toString()}
            />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.cardContainer}>
            <div className={classes.cardLabel}>
              <DriveEtaOutlinedIcon style={{ marginRight: "10px" }} />
              <Typography>Car Spaces(s)</Typography>
            </div>
            <TextFieldWrapper
              field="num_car_spaces"
              label="Car Spaces(s)"
              type="number"
              onChange={onChange}
              value={num_car_spaces.toString()}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
});
