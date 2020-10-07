import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { BidsList, Bid } from "./BidsList";

export default {
  title: "auction/bidsList",
  component: BidsList,
} as Meta;

export const Overview = () => {
  let bids: Bid[] = [
    {
      value: { price: 500000, state: "reserve_met" },
      bidder: 1234,
      time: new Date(),
    },
  ];

  for (let i = 0; i < 3; i++) {
    bids.push({
      value: { price: 500000 - (i + 1) * 10000, state: "reserve_not_met" },
      bidder: 1230 + i,
      time: new Date(),
    });
  }

  return <BidsList bids={bids} />;
};
