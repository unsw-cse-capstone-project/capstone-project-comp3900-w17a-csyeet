import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { BidderRegistrationStore } from "./BidderRegistrationPresenter";
import { BidderRegistrationWrapper } from "./main";
import { createFakeListing } from "../ui/util/fakes/listing";

const store = new BidderRegistrationStore();
store.listing = createFakeListing();

export default {
  title: "bidder registration/page",
  component: BidderRegistrationWrapper,
  argTypes: {
    loadingState: {
      control: {
        type: "select",
        options: ["loaded", "loading", "error"],
      },
      defaultValue: "loaded",
    },
    auction_start: {
      control: {
        type: "date",
      },
      defaultValue: createFakeListing().auction_start,
    },
    auction_end: {
      control: {
        type: "date",
      },
      defaultValue: createFakeListing().auction_end,
    },
    current_bid: {
      control: {
        type: "number",
      },
      defaultValue: 500000,
    },
  },
} as Meta;

export const Overview = ({
  loadingState,
  auction_start,
  auction_end,
  current_bid,
}: {
  loadingState: "loaded" | "loading" | "error";
  auction_start: string;
  auction_end: string;
  current_bid: number;
}) => {
  store.listing.auction_start = new Date(auction_start);
  store.listing.auction_end = new Date(auction_end);
  store.loadingState = loadingState;
  store.currentBid = current_bid;

  return <BidderRegistrationWrapper store={store} />;
};
