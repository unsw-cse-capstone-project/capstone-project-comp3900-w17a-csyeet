import * as React from "react";
import {
  UpcomingAuctionsStore,
  UpcomingAuctionPresenter,
} from "./UpcomingAuctionsPresenter";
import { Grid, Snackbar, Typography, withWidth } from "@material-ui/core";
import { ListingCardSmall } from "../../ui/base/listing_card_sm/ListingCardSmall";
import { observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ListingCardSmallLoadingRow } from "../../ui/base/loading_state/ListingCardSmallLoadingRow";
import MuiAlert from "@material-ui/lab/Alert";
import { getNumCards } from "../../ui/util/helper";

/**
 * List of upcoming auctions with loading states
 * @param store
 * @param presenter
 * @param width
 */
export const UpcomingAuctionsBase = observer(
  ({
    store,
    presenter,
    width,
  }: {
    store: UpcomingAuctionsStore;
    presenter: UpcomingAuctionPresenter;
    width: string;
  }) => {
    React.useEffect(() => {
      presenter.loadUpcomingAuctions(store, getNumCards(width));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (store.state === "loading") {
      return <ListingCardSmallLoadingRow />;
    }

    /**
     * Display toast notification if an error occurred
     */
    if (store.state === "error") {
      return (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          autoHideDuration={2000}
        >
          <MuiAlert elevation={6} severity="error">
            Error occurred while fetching upcoming auctions.
          </MuiAlert>
        </Snackbar>
      );
    }

    if (store.listings.length === 0) {
      return (
        <Typography align="center" variant="body1">
          No upcoming auctions found
        </Typography>
      );
    }

    return (
      <InfiniteScroll
        dataLength={store.listings.length}
        next={() => presenter.loadUpcomingAuctions(store, getNumCards(width))}
        hasMore={!!store.continuation}
        loader={<ListingCardSmallLoadingRow />}
        endMessage={
          <Typography
            align="center"
            variant="body1"
            style={{ marginTop: "15px" }}
          >
            No more listings to show
          </Typography>
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
    );
  }
);

export const UpcomingAuctions = withWidth()(UpcomingAuctionsBase);
