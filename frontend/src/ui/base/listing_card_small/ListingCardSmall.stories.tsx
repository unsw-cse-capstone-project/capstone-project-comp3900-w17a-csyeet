import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { AuthProvider } from "../../../AuthContext";
import { ListingCardSmall } from "./ListingCardSmall";
import { ListingSummary } from "../../util/types/listing";
export default {
  title: "ui/base/listing card (small)",
  component: ListingCardSmall,
} as Meta;

const images = [
  "https://i2.au.reastatic.net/1000x750-format=webp/8779b210bb43515a6968f04d7c86cbddaffd81d4dd96b2640ca68379fdff8636/image.jpg",
  "https://i2.au.reastatic.net/1340x824-resize,extend,r=33,g=40,b=46/10784f34dc9c093688c1c137dff1aad545ad5000ebf653ca90e0793569231fe9/image.jpg",
  "https://i2.au.reastatic.net/1340x824-resize,extend,r=33,g=40,b=46/45efa7d514e314b49996d38460b3f1f7dc3160958a43b84211346b1a9b854032/image.jpg",
];

const Template: Story<{ data: ListingSummary }> = (args) => (
  <ListingCardSmall {...args} />
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
  num_bathrooms: 3,
  num_bedrooms: 5,
  num_car_spaces: 2,
  starred: false,
  images: images,
};

export const Pre_Auction = Template.bind({});
Pre_Auction.args = { data: pre_auc_data };

const post_auc_start = new Date(2020, 5, 15);
const post_auc_end = new Date(2020, 6, 10);
const post_auc_data: ListingSummary = {
  id: 1,
  street: "6 Angelo St",
  suburb: "Burwood",
  postcode: "2134",
  state: "NSW",
  auction_start: post_auc_start,
  auction_end: post_auc_end,
  num_bathrooms: 3,
  num_bedrooms: 5,
  num_car_spaces: 2,
  starred: false,
  images: images,
};

export const Post_Auction = Template.bind({});
Post_Auction.args = { data: pre_auc_data };

const ongoing_auc_start = new Date(2020, 10, 1);
const ongoing_auc_end = new Date(2020, 12, 2);
const ongoing_auc_data: ListingSummary = {
  id: 1,
  street: "6 Angelo St",
  suburb: "Burwood",
  postcode: "2134",
  state: "NSW",
  auction_start: ongoing_auc_start,
  auction_end: ongoing_auc_end,
  num_bathrooms: 3,
  num_bedrooms: 5,
  num_car_spaces: 2,
  starred: false,
  images: images,
};

export const Ongoing_Auction = Template.bind({});
Ongoing_Auction.args = { data: ongoing_auc_data };

const starred_data: ListingSummary = {
  id: 1,
  street: "6 Angelo St",
  suburb: "Burwood",
  postcode: "2134",
  state: "NSW",
  auction_start: ongoing_auc_start,
  auction_end: ongoing_auc_end,
  num_bathrooms: 3,
  num_bedrooms: 5,
  num_car_spaces: 2,
  starred: true,
  images: images,
};

export const Starred_Card = Template.bind({});
Starred_Card.args = { data: starred_data };
