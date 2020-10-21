import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { AuctionDetails } from "./AuctionDetails";
import { ListingStore } from "../ListingStore";
export default {
    title: "Add Listing/Step 4 - Auction Details",
    component: AuctionDetails,
} as Meta;

const store = new ListingStore();
export const Overview = () => <AuctionDetails store={store} />;
