import { observer } from "mobx-react";
import { SearchBar } from "../../ui/base/teresa/search_bar/SearchBar";
import { SearchStore, SearchPresenter } from "./SearchPresenter";
import { SearchResultsList } from "./search_results_list/SearchResultsList";
import * as React from "react";
import { SearchPage } from "./SearchPage";

export const createSearchPage = (query?: string) => {
  const store = new SearchStore(query);
  const presenter = new SearchPresenter();

  if (query) {
    presenter.search(store);
  }

  const onSubmit = () => {
    presenter.search(store);
  };
  const SearchBarWrapper = observer(() => (
    <SearchBar store={store} onSubmit={onSubmit} />
  ));

  const SearchResult = observer(() => <SearchResultsList store={store} />);
  // eslint-disable-next-line react/display-name
  return () => (
    <SearchPage SearchResults={SearchResult} SearchBar={SearchBarWrapper} />
  );
};
