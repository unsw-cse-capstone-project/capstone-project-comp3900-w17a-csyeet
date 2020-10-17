import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Description } from "./Description";
import { ListingStore } from "../ListingStore";
export default {
  title: "Add Listing/Step 3 - Description",
  component: Description,
} as Meta;

const store = new ListingStore();
export const Overview = () => <Description store={store} />;
