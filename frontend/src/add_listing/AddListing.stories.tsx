import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { AddListing } from "./AddListing";
import { ListingStore } from "./ListingStore";
export default {
    title: "Add Listing/Add Listing Page",
    component: AddListing,
} as Meta;

const store = new ListingStore();
export const Overview = () => <AddListing store={store} />;
