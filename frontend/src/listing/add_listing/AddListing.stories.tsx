import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { AddListingPage } from "./main";

export default {
  title: "Listing/Add Listing",
  component: AddListingPage,
} as Meta;

export const Overview = () => {
  return <AddListingPage />;
};
