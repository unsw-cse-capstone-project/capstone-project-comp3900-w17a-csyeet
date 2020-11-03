import * as React from "react";
import { ProfileStore } from "../ProfilePresenter";
import { Grid } from "@material-ui/core";
import { ListingCardSmall } from "../../ui/base/listing_card_sm/ListingCardSmall";

export function StarredPropertiesPage({ store }: { store: ProfileStore }) {
  const listings = store.starredResults;
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      {listings.length === 0 ? (
        <div style={{ textAlign: "center" }}>No Starred Properties</div>
      ) : (
        <div>
          <Grid container spacing={3}>
            {listings.map((listing, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
                <ListingCardSmall listing={listing} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
}
