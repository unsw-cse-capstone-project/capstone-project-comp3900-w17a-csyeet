import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { BidsList } from "./BidsList";
import { Bid } from "../../ui/util/types/bid";

export default {
  title: "auction/bidsList",
  component: BidsList,
} as Meta;

export const Overview = () => {
  let bids: Bid[] = [
    {
      bid: 500000,
      bidder_id: 5,
      reserve_met: true,
      placed_at: new Date(),
    },
  ];
  
  for (let i = 0; i < 3; i++) {
    bids.push({
      bid: 500000 - (i + 1) * 10000,
      bidder_id: 1230 + i,
      reserve_met: false,
      placed_at: new Date(),
    });
  }

  return <BidsList bids={bids} />;
};
