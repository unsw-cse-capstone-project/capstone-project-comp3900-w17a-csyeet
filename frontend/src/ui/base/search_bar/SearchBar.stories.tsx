import { Meta } from "@storybook/react/types-6-0";
import * as React from "react";
import { SearchBar } from "./SearchBar";
import { SearchStore, SearchPresenter } from "../../../search/SearchPresenter";

export default {
  title: "ui/base/searchBar",
  component: SearchBar,
} as Meta;

const store = new SearchStore();
export const Overview = () => (
  <SearchBar store={store} />
);
