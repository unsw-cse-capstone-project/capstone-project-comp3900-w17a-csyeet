import { observer } from "mobx-react";
import { SearchBar } from "../ui/base/search_bar/SearchBar";
import { SearchStore, SearchPresenter } from "./SearchPresenter";
import { SearchResultsList } from "./search_results_list/SearchResultsList";
import * as React from "react";
import { SearchPage } from "./SearchPage";

export const createSearchPage = (
  query?: string,
  type?: string,
  beds?: number,
  baths?: number,
  cars?: number,
  start?: string,
  end?: string,
  featureList?: string[],
  landmarkList?: string[],
  closed_auction?: string
) => {
  const store = new SearchStore(
    query,
    type,
    beds,
    baths,
    cars,
    start,
    end,
    featureList,
    landmarkList,
    closed_auction
  );
  const presenter = new SearchPresenter();

  presenter.search(store);

  const SearchBarWrapper = observer(() => <SearchBar store={store} />);

  const SearchResult = observer(() => (
    <SearchResultsList store={store} presenter={presenter} />
  ));
  // eslint-disable-next-line react/display-name
  return () => (
    <SearchPage SearchResults={SearchResult} SearchBar={SearchBarWrapper} />
  );
};
