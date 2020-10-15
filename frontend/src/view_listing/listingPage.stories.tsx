import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { ListingPage } from "./listingPage";
import { createFakeActualListing } from "../ui/util/fakes/listing";

export default {
  title: "view_listing/listingPage",
  component: ListingPage,
  argTypes: {
    auction_start: {
      control: {
        type: "date",
      },
      defaultValue: createFakeActualListing().auction_start,
    },
    auction_end: {
      control: {
        type: "date",
      },
      defaultValue: createFakeActualListing().auction_end,
    },
  },
} as Meta;

export const Overview = (props: {
  auction_start: string;
  auction_end: string;
}) => (
  <ListingPage
    listing={createFakeActualListing({
      auction_start: new Date(props.auction_start),
      auction_end: new Date(props.auction_end),
    })}
  />
);
