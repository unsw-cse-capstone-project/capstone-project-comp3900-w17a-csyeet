import React from "react";
import { ListingSummary } from "../../util/types/listing";
import { ListingCardSmallStyles } from "./ListingCardSmall.css";
import { Typography } from "@material-ui/core";
export const ListingCardSmall: React.FC<ListingSummary> = ({
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
}) => {
  type ListingState = "Pre-Auction" | "Auction Ongoing" | "Auction Closed";
  const getListingState = (start: Date, end: Date) => {
    const currDate = new Date();
    if (start.getTime() < currDate.getTime()) {
    }
  };
  const classes = ListingCardSmallStyles();
  return (
    <div>
      {/* Image */}
      <Typography>
        {street}, {suburb} {postcode} {state}
      </Typography>
    </div>
  );
};
