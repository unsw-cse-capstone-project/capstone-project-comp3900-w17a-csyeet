import * as React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { createSearchPage } from "./create";

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const SearchPage = () => {
  const query = useQuery().get("query");

  if (query === null || query === "") {
    return <Redirect to="/" />;
  }

  const Page = createSearchPage(query);
  return <Page />;
};
