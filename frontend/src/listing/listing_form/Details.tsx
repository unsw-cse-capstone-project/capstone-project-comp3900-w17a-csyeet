import React from "react";
import { observer } from "mobx-react";
import { Paper, Typography, Grid } from "@material-ui/core";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import BathtubOutlinedIcon from "@material-ui/icons/BathtubOutlined";
import DriveEtaOutlinedIcon from "@material-ui/icons/DriveEtaOutlined";

import { ListingStore } from "../ListingStore";
import { SelectWrapper } from "../../ui/base/select_wrapper/SelectWrapper";
import { TextFieldWrapper } from "../../ui/base/textfield_wrapper/TextFieldWrapper";
import { AddressForm } from "../../ui/base/address_form/AddressForm";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const DetailStyles = makeStyles((theme: Theme) =>
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
    (store as any)[field] = value;
  };
  return (
    <div>
      <Typography> Property Address</Typography>
      <AddressForm onChange={onChange} />
      <Typography style={{ marginTop: "30px" }}> Property Details </Typography>
      <SelectWrapper
        data={propertyTypes}
        label="Property Type"
        field="type"
        value={store.type}
        onChange={onChange}
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
              value={store.nBedrooms}
              onChange={onChange}
            />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper>
            <div className={classes.cardLabel}>
              <BathtubOutlinedIcon style={{ marginRight: "10px" }} />
              <Typography>Bathrooms(s)</Typography>
            </div>
            <TextFieldWrapper
              field="nBathrooms"
              label="Bathrooms(s)"
              type="number"
              value={store.nBathrooms}
              onChange={onChange}
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
              value={store.nGarages}
              onChange={onChange}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
});
