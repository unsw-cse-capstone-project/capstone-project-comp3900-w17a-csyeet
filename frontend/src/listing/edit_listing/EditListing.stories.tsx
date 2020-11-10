import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { EditListingPageBase } from "./main";
import { action } from "mobx";
import {
  ListingStore,
  PaymentDetails,
  AuctionDetails,
  ListingDetails,
} from "../ListingPresenter";
import { AddressDetails } from "../../ui/base/address_form/AddressForm";

export default {
  title: "Listing/Edit Listing",
  component: EditListingPageBase,
} as Meta;

const store = new ListingStore();
const populateStore = action(() => {
  const fake_listing: ListingDetails = {
    id: 1,
    title: "Immaculately presented family home",
    description: `This charming Federation style family home ensures a blissful family lifestyle of modern comfort and flexibility. Spacious interiors reveal a beautiful array of period features, complemented by a stylish renovation throughout, it is ready for you to move in and enjoy. The property is set in one of the best streets with a sun-drenched level block of 663.9sqm (approx).
  Within walking distance of Chatswood station, express buses, shopping, restaurants and schools this is an ideal location allowing you to enjoy the tranquillity of the suburb while still being close to all amenities.`,
    type: "House",
    num_bedrooms: 5,
    num_bathrooms: 3,
    num_car_spaces: 2,
    auction_start: new Date("October 30, 2020 11:00:00"),
    auction_end: new Date("October 31, 2020 11:00:00"),
    images: [
      "https://i2.au.reastatic.net/1000x750-format=webp/8779b210bb43515a6968f04d7c86cbddaffd81d4dd96b2640ca68379fdff8636/image.jpg",
      "https://i2.au.reastatic.net/1340x824-resize,extend,r=33,g=40,b=46/10784f34dc9c093688c1c137dff1aad545ad5000ebf653ca90e0793569231fe9/image.jpg",
      "https://i2.au.reastatic.net/1340x824-resize,extend,r=33,g=40,b=46/45efa7d514e314b49996d38460b3f1f7dc3160958a43b84211346b1a9b854032/image.jpg",
    ],

    features: ["ensuite", "bathtub"],
  };
  const fake_address: AddressDetails = {
    street: "8 Holland Street",
    suburb: "Chatswood",
    postcode: "2067",
    state: "NSW",
    country: "Australia",
  };
  const fake_payment: PaymentDetails = {
    account_name: "Miss Jane Stuart",
    bsb: "153748",
    account_number: "19584038",
  };
  const fake_auction: AuctionDetails = {
    auction_start: new Date(2020, 12, 13),
    auction_end: new Date(2021, 1, 24),
    reserve_price: "2400000",
  };
  store.listing = fake_listing;
  store.address = fake_address;
  store.payment = fake_payment;
  store.auction = fake_auction;
});

populateStore();
export const Overview = () => {
  return (
    <EditListingPageBase
      store={store}
      onUpdateListing={() => action("OnUpdateListing")}
    />
  );
};
