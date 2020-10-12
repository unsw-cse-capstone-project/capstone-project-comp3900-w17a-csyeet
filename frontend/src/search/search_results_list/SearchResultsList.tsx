import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import { action } from "mobx";
import * as React from "react";
import { SearchStore } from "../SearchPresenter";
import {
  ListingResultCard,
  ListingResultCardLoading,
} from "../../ui/base/listing_result_card/ListingResultCard";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchResultsListStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContainer: {
      marginTop: theme.spacing(2),
    },
  })
);

export const SearchResultsList = observer(
  ({ store }: { store: SearchStore }) => {
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
      return <Typography variant="body1">Error</Typography>;
    }

    return (
      <div>
        <InfiniteScroll
          dataLength={store.searchResults.length}
          next={() =>
            setTimeout(
              action(() =>
                store.searchResults.push(...store.searchResults.slice(0, 3))
              ),
              400
            )
          }
          hasMore={true}
          loader={
            // <div style={{ padding: "20px 0 100px 0", textAlign: "center" }}>
            //   <LinearProgress />
            // </div>
            <ListingResultCardLoading className={classes.cardContainer} />
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
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
      </div>
    );
  }
);
