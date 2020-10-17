import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Details } from "./Details";
import { ListingStore } from "../ListingStore";
export default {
  title: "Add Listing/Step 1 - Details",
  component: Details,
} as Meta;

const store = new ListingStore();
export const Overview = () => <Details store={store} />;
