import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { ListingCardAuction } from "./ListingCardAuction";
import { ListingActual } from "../../util/types/listing";
import { createFakeActualListing } from "../../util/fakes/listing";

export default {
  title: "ui/base/listing card (auction)",
  component: ListingCardAuction,
} as Meta;

const Template: Story<{ listing: ListingActual; user_bid: number }> = (
  args
) => (
  <div style={{ width: "250px" }}>
    <ListingCardAuction {...args} />
  </div>
);

export const PreAuction = Template.bind({});
PreAuction.args = {
  listing: createFakeActualListing({
    auction_start: new Date(2020, 12, 30),
    auction_end: new Date(2021, 2, 20),
    highest_bid: 0,
    reserve_met: false,
  }),
  user_bid: 500000,
};

export const ReserveMet = Template.bind({});
ReserveMet.args = {
  listing: createFakeActualListing({
    auction_start: new Date(2020, 12, 30),
    auction_end: new Date(2021, 2, 20),
    highest_bid: 5000000,
    reserve_met: true,
  }),
  user_bid: 4999900,
};

export const ReserveNotMet = Template.bind({});
ReserveNotMet.args = {
  listing: createFakeActualListing({
    auction_start: new Date(2020, 12, 30),
    auction_end: new Date(2021, 2, 20),
    highest_bid: 5000000,
    reserve_met: false,
  }),
  user_bid: 4999900,
};
