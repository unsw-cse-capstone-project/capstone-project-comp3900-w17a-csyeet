import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { BidderTag } from "../../ui/base/bidder_tag/BidderTag";
import { BiddingBox, BiddingBoxStore } from "./BiddingBox";
import { action } from "@storybook/addon-actions";

export default {
  title: "auction/biddingBox",
  component: BiddingBox,
} as Meta;

export const Overview = () => {
  const store = new BiddingBoxStore();
  return (
    <BiddingBox
      store={store}
      currentBid={500000}
      bidState="reserve_met"
      BidderTag={() => <BidderTag bidderNumber={1234} />}
      onPlaceBid={action("Place bid button clicked")}
    />
  );
};
