import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { ListingCardAuction } from "./ListingCardAuction";
import { ListingActual } from "../../util/types/listing";
import { createFakeActualListing } from "../../util/fakes/listing";

export default {
  title: "ui/base/listing card (auction)",
  component: ListingCardAuction,
} as Meta;

const Template: Story<{ listing: ListingActual }> = (args) => (
  <ListingCardAuction {...args} />
);

export const Pre_Auction = Template.bind({});
Pre_Auction.args = {
  listing: createFakeActualListing({
    auction_start: new Date(2020, 12, 30),
    auction_end: new Date(2021, 2, 20),
    starred: false,
    highest_bid: null,
  }),
};

export const Reserve_Met = Template.bind({});
Reserve_Met.args = {
  listing: createFakeActualListing({
    auction_start: new Date(2020, 9, 1),
    auction_end: new Date(2020, 11, 10),
    starred: false,
    reserve_met: true,
    user_bid: 5000000,
    highest_bid: 5100000,
  }),
};
export const Reserve_not_met = Template.bind({});
Reserve_not_met.args = {
  listing: createFakeActualListing({
    auction_start: new Date(2020, 9, 1),
    auction_end: new Date(2020, 11, 10),
    starred: false,
    reserve_met: false,
    user_bid: 5000000,
    highest_bid: 5000000,
  }),
};
