import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import SearchPage from "./SearchPage";

export default {
  title: "Page-Search",
  component: SearchPage,
} as Meta;

const Template: Story = () => <SearchPage />;

export const Overview = Template.bind({});
Overview.args = {};
