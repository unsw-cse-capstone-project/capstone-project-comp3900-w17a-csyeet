import * as React from "react";
import {
  UpcomingAuctionsStore,
  UpcomingAuctionPresenter,
} from "./UpcomingAuctionsPresenter";
import { Grid } from "@material-ui/core";
import {
  ListingCardSmall,
  ListingCardSmallPlaceholder,
} from "../../ui/base/listing_card_sm/ListingCardSmall";
import { observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";

export const UpcomingAuctions = observer(
  ({
    store,
    presenter,
  }: {
    store: UpcomingAuctionsStore;
    presenter: UpcomingAuctionPresenter;
  }) => {
    if (store.state === "loading") {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ListingCardSmallPlaceholder />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ListingCardSmallPlaceholder />
          </Grid>
        </Grid>
      );
    }

    if (store.state === "error") {
      return <div>error</div>;
    }
    return (
      <div>
        {store.listings.length === 0 ? (
          <div style={{ textAlign: "center" }}>No upcoming auctions found</div>
        ) : (
          <InfiniteScroll
            dataLength={store.listings.length}
            next={() => presenter.loadUpcomingAuctions(store)}
            hasMore={!!store.continuation}
            loader={
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <ListingCardSmallPlaceholder />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <ListingCardSmallPlaceholder />
                </Grid>
              </Grid>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>No more listings to show</b>
              </p>
            }
            style={{ overflow: "visible" }}
            scrollableTarget={"content"}
          >
            <Grid container spacing={3}>
              {store.listings.map((listing, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
                  <ListingCardSmall listing={listing} />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        )}
      </div>
    );
  }
);
