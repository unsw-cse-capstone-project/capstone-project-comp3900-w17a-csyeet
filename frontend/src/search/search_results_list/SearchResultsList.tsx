import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { observer } from "mobx-react";
import * as React from "react";
import { SearchStore, SearchPresenter } from "../SearchPresenter";
import {
  ListingResultCard,
  ListingResultCardLoading,
} from "../../ui/base/listing_result_card/ListingResultCard";
import InfiniteScroll from "react-infinite-scroll-component";
import MuiAlert from '@material-ui/lab/Alert';

const SearchResultsListStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContainer: {
      marginTop: theme.spacing(2),
    },
  })
);

/**
 * Component to display search results when a user performs a search
 * Includes property placeholders while the page is in a loading state
 * and infinite scroll functionality
 * @param store
 * @param presenter
 */
export const SearchResultsList = observer(
  ({
    store,
    presenter,
  }: {
    store: SearchStore;
    presenter: SearchPresenter;
  }) => {
    const classes = SearchResultsListStyles();
    if (!store.searchState) {
      return null;
    }

    if (store.searchState === "loading") {
      return (
        <div>
          <ListingResultCardLoading className={classes.cardContainer} />
          <ListingResultCardLoading className={classes.cardContainer} />
          <ListingResultCardLoading className={classes.cardContainer} />
        </div>
      );
    }

    if (store.searchState === "error") {
      return (
        <MuiAlert severity="error">Error when fetching search results</MuiAlert>
      );
    }

    return (
      <div>
        {store.searchResults.length === 0 ? (
          <div style={{ textAlign: "center" }}>No results found</div>
        ) : (
          <InfiniteScroll
            dataLength={store.searchResults.length}
            next={() => presenter.search(store)}
            hasMore={!!store.continuation}
            loader={
              <ListingResultCardLoading className={classes.cardContainer} />
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>No more results</b>
              </p>
            }
            style={{ overflow: "visible" }}
            scrollableTarget={"content"}
          >
            {store.searchResults.map((result, i) => (
              <ListingResultCard
                key={i}
                listing={result}
                className={classes.cardContainer}
              />
            ))}
          </InfiniteScroll>
        )}
      </div>
    );
  }
);
