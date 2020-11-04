import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { BidderRegistrationStore } from "./BidderRegistrationPresenter";
import { BidderRegistrationWrapper } from "./main";
import { createFakeListing, createFakeActualListing } from '../ui/util/fakes/listing';
import { action } from '@storybook/addon-actions';

const store = new BidderRegistrationStore();
store.listing = createFakeActualListing();

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
  },
} as Meta;

export const Overview = ({
  loadingState,
  auction_start,
  auction_end,
}: {
  loadingState: "loaded" | "loading" | "error";
  auction_start: string;
  auction_end: string;
  current_bid: number;
}) => {
  if (!store || !store.listing) {
    store.listing = createFakeActualListing();
  }
  store.listing.auction_start = new Date(auction_start);
  store.listing.auction_end = new Date(auction_end);
  store.loadingState = loadingState;

  return <BidderRegistrationWrapper store={store} onSubmit={action("onSubmit")} id={1}/>;
};
