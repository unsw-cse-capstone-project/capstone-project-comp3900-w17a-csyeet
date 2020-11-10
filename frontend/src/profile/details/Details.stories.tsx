import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { DetailsPage } from "./DetailsPage";

export default {
  title: "Profile/Details",
  component: DetailsPage,
} as Meta;

export const Overview = () => <DetailsPage />;
