import React from "react";
import { observer } from "mobx-react";
import { Paper, Typography, Grid } from "@material-ui/core";
import {
  AddressForm,
  AddressDetails,
} from "../../ui/base/address_form/AddressForm";
import { ListingStore } from "../ListingPresenter";
import { SelectWrapper } from "../../ui/base/input/SelectWrapper";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import BathtubOutlinedIcon from "@material-ui/icons/BathtubOutlined";
import DriveEtaOutlinedIcon from "@material-ui/icons/DriveEtaOutlined";
import { NumberPicker } from "../../ui/base/input/NumberPicker";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { action } from "mobx";
import { Alert, AlertTitle } from "@material-ui/lab";

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
  edit: boolean;
}> = observer(({ store, edit }) => {
  const { type, num_bedrooms, num_bathrooms, num_car_spaces } = store.listing;
  const addressData: AddressDetails = {
    street: store.address.street,
    suburb: store.address.suburb,
    postcode: store.address.postcode,
    state: store.address.state,
    country: store.address.country,
  };
  const propertyTypes = ["Apartment", "Duplex", "House", "Studio", "Townhouse"];
  const onChange = action((value: string, field: string) => {
    (store as any).listing[field] = value;
  });

  const onChangeAddress = action((value: string, field: string) => {
    (store as any).address[field] = value;
  });

  const classes = DetailStyles();
  return (
    <div className={classes.container}>
      {edit && (
        <Alert
          severity="info"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          <AlertTitle>You cannot edit your address</AlertTitle>
          If you have entered the wrong address, we advise you to delete this
          listing and create a new one
        </Alert>
      )}
      <Typography variant={"subtitle1"}> Property Address</Typography>
      <AddressForm onChange={onChangeAddress} addressData={addressData} />
      <Typography variant={"subtitle1"} style={{ marginTop: "30px" }}>
        Property Details
      </Typography>
      <SelectWrapper
        readOnly={edit}
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
            <NumberPicker
              readOnly={edit}
              style={{ flex: 1, marginTop: "10px" }}
              value={num_bedrooms}
              size={"medium"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value, "num_bedrooms");
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.cardContainer}>
            <div className={classes.cardLabel}>
              <BathtubOutlinedIcon style={{ marginRight: "10px" }} />
              <Typography>Bathrooms(s)</Typography>
            </div>
            <NumberPicker
              readOnly={edit}
              style={{ flex: 1, marginTop: "10px" }}
              value={num_bathrooms}
              size={"medium"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value, "num_bathrooms");
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.cardContainer}>
            <div className={classes.cardLabel}>
              <DriveEtaOutlinedIcon style={{ marginRight: "10px" }} />
              <Typography>Car Spaces(s)</Typography>
            </div>
            <NumberPicker
              readOnly={edit}
              style={{ flex: 1, marginTop: "10px" }}
              value={num_car_spaces}
              size={"medium"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value, "num_car_spaces");
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
});
