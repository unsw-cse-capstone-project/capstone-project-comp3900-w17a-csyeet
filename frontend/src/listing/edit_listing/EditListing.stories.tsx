import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { EditListingPageBase } from "./main";
import { action } from "mobx";
import {
  ListingStore,
  PaymentDetails,
  AuctionDetails,
} from "../ListingPresenter";
import { createFakeActualListing } from "../../ui/util/fakes/listing";

export default {
  title: "Listing/Edit Listing",
  component: EditListingPageBase,
} as Meta;

const store = new ListingStore();
const populateStore = action(() => {
  const fake_listing = createFakeActualListing();
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
  store.payment = fake_payment;
  store.auction = fake_auction;

  // Note, images are included in listing, but images not working.. so including images separately
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
