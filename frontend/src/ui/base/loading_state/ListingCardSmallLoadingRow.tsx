import * as React from "react";
import { withWidth, Grid } from "@material-ui/core";
import { ListingCardSmallPlaceholder } from "../listing_card_sm/ListingCardSmall";
import { getNumCards } from '../../util/helper';

export const ListingCardSmallLoadingRowBase = ({
  width,
}: {
  width: string;
}) => {
  return (
    <Grid container spacing={3}>
      {Array.from(Array(getNumCards(width))).map((_, i) => (
        <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <ListingCardSmallPlaceholder />
        </Grid>
      ))}
    </Grid>
  );
};

export const ListingCardSmallLoadingRow = withWidth()(
  ListingCardSmallLoadingRowBase
);
