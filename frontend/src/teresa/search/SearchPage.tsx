import * as React from "react";
import { SearchPageStyles } from "./SearchPage.css";
export const SearchPage = ({
  SearchBar,
  SearchResults,
}: {
  SearchBar: React.ComponentType;
  SearchResults: React.ComponentType;
}) => {
  const classes = SearchPageStyles();
  return (
    <div className={classes.page}>
      <div className={classes.searchHeader}>
        <div className={classes.searchContainer}>
          <SearchBar />
        </div>
      </div>
      <div className={classes.resultContainer}>
        <SearchResults />
      </div>
    </div>
  );
};
