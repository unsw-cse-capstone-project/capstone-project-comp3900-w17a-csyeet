import * as React from "react";
import { SearchPageStyles } from "./SearchPage.css";
import { ErrorBoundaryComponent } from "../ui/base/error_boundary/ErrorBoundary";

/**
 * Page component that allows users to search and see search results
 * @param SearchBar
 * @param SearchResults
 */
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
        <ErrorBoundaryComponent>
          <SearchResults />
        </ErrorBoundaryComponent>
      </div>
    </div>
  );
};
