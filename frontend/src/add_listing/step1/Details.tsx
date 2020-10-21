import React from "react";
import { observer } from "mobx-react";
import { Paper, Typography } from "@material-ui/core";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import BathtubOutlinedIcon from "@material-ui/icons/BathtubOutlined";
import DriveEtaOutlinedIcon from "@material-ui/icons/DriveEtaOutlined";

import { ListingStore } from "../ListingStore";
import { Features } from "./Features";
import { SelectWrapper } from "../../ui/base/select_wrapper/SelectWrapper";
import { AddressInputs } from "./Address"
import { DetailStyles } from "./Details.css";

export const Details: React.FC<{
  store: ListingStore;
}> = observer(({ store }) => {
  const classes = DetailStyles();
  const propertyTypes = ["Apartment", "Duplex", "House", "Studio", "Townhouse"];
  const numbers = ["1", "2", "3", "4", "5", "6+"];
  const onChange = (value: string, field: string) => {
    (store as any)[field] = value;
  };
  return (
    <div className={classes.container}>
      <Typography variant="h3">Details</Typography>
      {/* <TextFieldWrapper
        field="address"
        label="Address"
        onChange={onChange}
        value={store.address}
      /> */}
      <AddressInputs store={store} />
      <SelectWrapper
        data={propertyTypes}
        label="Property Type"
        field="type"
        onChange={onChange}
      />
      <Paper className={classes.cardContainer}>
        <div className={classes.cardLabel}>
          <HotelOutlinedIcon
            fontSize="default"
            style={{ marginRight: "10px" }}
          />
          <Typography>Bedroom(s)</Typography>
        </div>
        <SelectWrapper data={numbers} field="nBedrooms" onChange={onChange} />
      </Paper>
      <Paper className={classes.cardContainer}>
        <div className={classes.cardLabel}>
          <BathtubOutlinedIcon
            fontSize="default"
            style={{ marginRight: "10px" }}
          />
          <Typography>Bathrooms(s)</Typography>
        </div>
        <SelectWrapper data={numbers} field="nBedrooms" onChange={onChange} />
      </Paper>
      <Paper className={classes.cardContainer}>
        <div className={classes.cardLabel}>
          <DriveEtaOutlinedIcon
            fontSize="default"
            style={{ marginRight: "10px" }}
          />
          <Typography>Garages(s)</Typography>
        </div>
        <SelectWrapper data={numbers} field="nBedrooms" onChange={onChange} />
      </Paper>
      <Features store={store} />
    </div>
  );
});
