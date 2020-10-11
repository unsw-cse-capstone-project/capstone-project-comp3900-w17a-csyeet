import { Meta } from "@storybook/react/types-6-0";
import * as React from "react";
import { SearchBar } from "./SearchBar";
import { SearchBarPresenter, SearchBarStore } from "./SearchBarPresenter";
import { action } from "@storybook/addon-actions";

export default {
  title: "ui/base/searchBar",
  component: SearchBar,
} as Meta;

const store = new SearchBarStore();
const presenter = new SearchBarPresenter();
export const Overview = () => (
  <SearchBar store={store} onSubmit={() => action(store.input)()} />
);
