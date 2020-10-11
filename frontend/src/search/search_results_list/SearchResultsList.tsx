import { Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import * as React from "react";
import { ListingResultCard } from "../../ui/base/listing_result_card/ListingResultCard";
import { SearchStore } from "../SearchPresenter";

export const SearchResultsList = observer(({store}:{ store: SearchStore }) => {
  if (!store.searchState) {
    return null;
  }

  if (store.searchState === "loading") {
    return <Typography variant="body1">Loading</Typography>;
  }

  if (store.searchState === "error") {
    return <Typography variant="body1">Error</Typography>;
  }

  return <div>
    {
      store.searchResults.map(result => <ListingResultCard />
    }
  </div>
});
