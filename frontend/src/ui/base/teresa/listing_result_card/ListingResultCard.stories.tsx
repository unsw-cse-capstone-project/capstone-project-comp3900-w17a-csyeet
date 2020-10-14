import { Meta } from "@storybook/react/types-6-0";
import { ListingResultCard } from "./ListingResultCard";
import { createFakeActualListing } from "../../../util/fakes/listing";
import * as React from "react";

export default {
  title: "ui/base/listingResult",
  component: ListingResultCard,
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
  <ListingResultCard
    listing={createFakeActualListing({
      auction_start: new Date(props.auction_start),
      auction_end: new Date(props.auction_end),
    })}
  />
);
