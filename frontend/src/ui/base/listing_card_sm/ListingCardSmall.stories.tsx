import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { ListingCardSmall } from "./ListingCardSmall";
import { ListingActual } from '../../util/types/listing';
import { createFakeActualListing } from '../../util/fakes/listing';

export default {
  title: "ui/base/listing card (small)",
  component: ListingCardSmall,
} as Meta;

const Template: Story<{ listing: ListingActual }> = (args) => (
  <div style={{ width: "250px" }}>
    <ListingCardSmall {...args} />
  </div>
);
export const Pre_Auction = Template.bind({});
Pre_Auction.args = { listing: createFakeActualListing({
    auction_start: new Date(2020, 12, 30),
    auction_end: new Date(2021, 2, 20),
    starred: false,
}) };

export const Post_Auction = Template.bind({});
Post_Auction.args = { listing: createFakeActualListing({
    auction_start: new Date(2020, 5, 15),
    auction_end: new Date(2020, 6, 10),
    starred: false,
}) };


export const Ongoing_Auction = Template.bind({});
Ongoing_Auction.args = { listing: createFakeActualListing({
    auction_start: new Date(2020, 9, 1),
    auction_end: new Date(2020, 11, 10),
    starred: false,
}) };

export const Starred_Card = Template.bind({});
Starred_Card.args = { listing: createFakeActualListing({
    auction_start: new Date(2020, 10, 1),
    auction_end: new Date(2020, 12, 10),
    starred: true,
}) };
