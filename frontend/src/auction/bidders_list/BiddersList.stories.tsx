import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { BiddersList } from "./BiddersList";

export default {
  title: "auction/biddersList",
  component: BiddersList,
} as Meta;

export const Overview = () => {
  return <BiddersList bidders={[1234, 1233, 1232, 1231]} currentUser={1234} />;
};
