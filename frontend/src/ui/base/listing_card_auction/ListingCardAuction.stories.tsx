import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { ListingCardAuction } from "./ListingCardAuction";
import { ListingSummary } from "../../util/types/listing";

export default {
  title: "ui/base/listing card (auction)",
  component: ListingCardAuction,
} as Meta;

const images = [
  "https://i2.au.reastatic.net/1000x750-format=webp/8779b210bb43515a6968f04d7c86cbddaffd81d4dd96b2640ca68379fdff8636/image.jpg",
  "https://i2.au.reastatic.net/1340x824-resize,extend,r=33,g=40,b=46/10784f34dc9c093688c1c137dff1aad545ad5000ebf653ca90e0793569231fe9/image.jpg",
  "https://i2.au.reastatic.net/1340x824-resize,extend,r=33,g=40,b=46/45efa7d514e314b49996d38460b3f1f7dc3160958a43b84211346b1a9b854032/image.jpg",
];

const Template: Story<{ data: ListingSummary }> = (args) => (
  <ListingCardAuction {...args} />
);

const pre_auc_start = new Date(2020, 12, 30);
const pre_auc_end = new Date(2021, 2, 20);
const pre_auc_data: ListingSummary = {
  id: 1,
  street: "6 Angelo St",
  suburb: "Burwood",
  postcode: "2134",
  state: "NSW",
  auction_start: pre_auc_start,
  auction_end: pre_auc_end,
  highest_bid: null,
  reserve_met: false,
  user_bid: 500000,
  starred: false,
  images: images,
};

export const Pre_Auction = Template.bind({});
Pre_Auction.args = { data: pre_auc_data };

const ongoing_auc_start = new Date(2020, 2, 1);
const ongoing_auc_end = new Date(2020, 12, 2);
const reserve_met_data: ListingSummary = {
  id: 1,
  street: "6 Angelo St",
  suburb: "Burwood",
  postcode: "2134",
  state: "NSW",
  auction_start: ongoing_auc_start,
  auction_end: ongoing_auc_end,
  highest_bid: 5000000,
  reserve_met: true,
  user_bid: 4999900,
  starred: false,
  images: images,
};

export const Reserve_Met = Template.bind({});
Reserve_Met.args = { data: reserve_met_data };

const reserve_not_met_data: ListingSummary = {
  id: 1,
  street: "6 Angelo St",
  suburb: "Burwood",
  postcode: "2134",
  state: "NSW",
  auction_start: ongoing_auc_start,
  auction_end: ongoing_auc_end,
  highest_bid: 4999900,
  reserve_met: false,
  user_bid: 4999000,
  starred: true,
  images: images,
};

export const Reserve_not_met = Template.bind({});
Reserve_not_met.args = { data: reserve_not_met_data };
