import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { BidderTag } from "./BidderTag";

export default {
  title: "ui/base/bidderTag",
  component: BidderTag,
} as Meta;

export const Overview = () => <BidderTag bidderNumber={1234} />;
