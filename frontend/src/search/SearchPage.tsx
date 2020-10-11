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
      <div
        style={{
          position: "sticky",
          padding: "20px",
          background: "white",
          top: "0",
          zIndex: 2000,
        }}
      >
        <SearchBar />
      </div>
      <div className={classes.resultContainer}>
        <SearchResults />
      </div>
    </div>
  );
};
