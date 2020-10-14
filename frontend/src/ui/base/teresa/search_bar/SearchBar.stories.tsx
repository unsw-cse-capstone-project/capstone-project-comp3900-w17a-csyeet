import * as React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";
import { SearchBar } from "./SearchBar";
import {
  SearchPresenter,
  SearchStore,
} from "../../../../teresa/search/SearchPresenter";

export default {
  title: "ui/base/searchBar",
  component: SearchBar,
} as Meta;

const store = new SearchStore();
const presenter = new SearchPresenter();
export const Overview = () => (
  <SearchBar store={store} onSubmit={() => action(store.input)()} />
);
