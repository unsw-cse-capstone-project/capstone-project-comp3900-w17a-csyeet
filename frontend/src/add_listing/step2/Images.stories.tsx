import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { ListingStore } from "../ListingStore";
import { Images } from "./Images";
export default {
  title: "Add Listing/Step 2 - Images",
  component: Images,
} as Meta;

const store = new ListingStore();
export const Overview = () => <Images store={store} />;
