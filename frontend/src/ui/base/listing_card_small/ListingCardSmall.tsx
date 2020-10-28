import React from "react";
import { ListingCardSmallStyles } from "./ListingCardSmall.css";
import { Typography, Grid } from "@material-ui/core";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import BathtubOutlinedIcon from "@material-ui/icons/BathtubOutlined";
import DriveEtaOutlinedIcon from "@material-ui/icons/DriveEtaOutlined";
import { ListingSummary } from "../../util/types/listing";
import { AuctionTag } from "../auction_tag/AuctionTag";

export const ListingCardSmall: React.FC<{ data: ListingSummary }> = ({
  data,
}) => {
  const {
    id,
    street,
    suburb,
    postcode,
    state,
    auction_start,
    auction_end,
    num_bathrooms,
    num_bedrooms,
    num_car_spaces,
    starred,
    images,
  } = data;

  const classes = ListingCardSmallStyles();
  return (
    <div>
      <img src={images[0]} alt="title" />
      <Typography>
        {street}, {suburb} {postcode} {state}
      </Typography>
      <AuctionTag start={auction_start} end={auction_end} />
      <Grid container spacing={2}>
        <Grid item xs>
          <HotelOutlinedIcon />
          {num_bedrooms}
        </Grid>
        <Grid item xs>
          <BathtubOutlinedIcon />
          {num_bathrooms}
        </Grid>
        <Grid item xs>
          <DriveEtaOutlinedIcon />
          {num_car_spaces}
        </Grid>
      </Grid>
    </div>
  );
};
