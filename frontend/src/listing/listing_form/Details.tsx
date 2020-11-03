import React from "react";
import { observer } from "mobx-react";
import { Paper, Typography, Grid } from "@material-ui/core";
import { AddressForm } from "../../ui/base/address_form/AddressForm";
import { ListingStore } from "../ListingStore";
import { TextFieldWrapper } from "../../ui/base/textfield_wrapper/TextFieldWrapper";
import { SelectWrapper } from "../../ui/base/select_wrapper/SelectWrapper";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import BathtubOutlinedIcon from "@material-ui/icons/BathtubOutlined";
import DriveEtaOutlinedIcon from "@material-ui/icons/DriveEtaOutlined";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { computed } from "mobx";

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
  const classes = DetailStyles();
  const propertyTypes = ["Apartment", "Duplex", "House", "Studio", "Townhouse"];
  const onChange = (value: string, field: string) => {
    console.log("OnChange ", field, "new", value);
    (store as any)[field] = value;
  };

  const getAddressData = computed(() => {
    return {
      street: store.street,
      suburb: store.suburb,
      postcode: store.postcode,
      state: store.state,
      country: store.country,
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
        value={store.type}
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
              field="nBedrooms"
              label="Bedroom(s)"
              type="number"
              onChange={onChange}
              value={store.nBedrooms}
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
              field="nBathrooms"
              label="Bathroom(s)"
              type="number"
              onChange={onChange}
              value={store.nBathrooms}
            />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.cardContainer}>
            <div className={classes.cardLabel}>
              <DriveEtaOutlinedIcon style={{ marginRight: "10px" }} />
              <Typography>Garages(s)</Typography>
            </div>
            <TextFieldWrapper
              field="nGarages"
              label="Garages(s)"
              type="number"
              onChange={onChange}
              value={store.nGarages}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
});
