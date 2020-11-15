import * as React from "react";
import { ProfileStore } from "../ProfilePresenter";
import { Grid, Typography } from "@material-ui/core";
import { ListingCardSmall } from "../../ui/base/listing_card_sm/ListingCardSmall";
import { action } from "mobx";
import { observer } from "mobx-react";
import { ListingCardSmallLoadingRow } from "../../ui/base/loading_state/ListingCardSmallLoadingRow";

/**
 * Page component to display a user's own listings
 * @param store
 */
export const MyListingsPage = observer(({ store }: { store: ProfileStore }) => {
  if (store.loadingState === "loading") {
    return <ListingCardSmallLoadingRow />;
  }

  if (store.loadingState === "error") {
    return (
      <Typography variant="body1" align="center">
        Error occurred, please try again.
      </Typography>
    );
  }

  if (store.myListingsResults.length === 0) {
    return (
      <Typography variant="body1" align="center">
        No Listings found
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {store.myListingsResults.map((listing, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
          <ListingCardSmall
            listing={listing}
            onUnstar={action(() => {
              const index = store.starredResults.findIndex(
                (l) => l.id === listing.id
              );
              if (index !== -1) {
                store.starredResults.splice(index, 1);
              }
            })}
            onStar={action(() => {
              const listings = [...store.starredResults];
              listing.starred = true;
              listings.push(listing);
              store.starredResults = listings;
            })}
          />
        </Grid>
      ))}
    </Grid>
  );
});
