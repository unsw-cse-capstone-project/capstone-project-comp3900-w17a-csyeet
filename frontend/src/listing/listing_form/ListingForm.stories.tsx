import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { ListingForm } from "./ListingForm";
import { ListingStore } from "../ListingStore";
export default {
  title: "Add Listing/Form",
  component: ListingForm,
} as Meta;

const store = new ListingStore();
export const Overview = () => <ListingForm store={store} />;
