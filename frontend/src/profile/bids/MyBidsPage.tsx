import * as React from "react";
import { ProfileStore } from "../ProfilePresenter";
import { Grid } from "@material-ui/core";
import { ListingCardAuction } from "../../ui/base/listing_card_auction/ListingCardAuction";
import { action } from "mobx";
import { observer } from "mobx-react";

export const MyBidsPage = observer(({ store }: { store: ProfileStore }) => {
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      {store.myBidsResults.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          You have not registered as a registered bidder for any auctions
        </div>
      ) : (
        <div>
          <Grid container spacing={3}>
            {store.myBidsResults.map((listing, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
                <ListingCardAuction
                  listing={listing}
                  onUnstar={action(() => {
                    console.log("unstarring");
                    const index = store.starredResults.findIndex(
                      (l) => l.id === listing.id
                    );
                    console.log(index);
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
        </div>
      )}
    </div>
  );
});
