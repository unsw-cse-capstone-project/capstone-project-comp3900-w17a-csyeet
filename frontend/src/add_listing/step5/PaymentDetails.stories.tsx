import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { PaymentDetails } from "./PaymentDetails";
import { ListingStore } from "../ListingStore";
export default {
    title: "Add Listing/Step 5 - Payment Details",
    component: PaymentDetails,
} as Meta;

const store = new ListingStore();
export const Overview = () => <PaymentDetails store={store} />;
