import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { SearchBar, SearchBarProps } from "./SearchBar";
<<<<<<< HEAD
import SearchStore from "./SearchStore";
=======
import SearchStore from "../../../stores/SearchStore";
>>>>>>> Figuring out mobx wip

export default {
  title: "Search Bar",
  component: SearchBar,
} as Meta;

const Template: Story<SearchBarProps> = (args) => <SearchBar {...args} />;

const searchStore = new SearchStore();
export const Mini = Template.bind({});
Mini.args = {
  size: "mini",
  searchStore: searchStore,
};

export const Regular = Template.bind({});
Regular.args = {
  searchStore: searchStore,
};
