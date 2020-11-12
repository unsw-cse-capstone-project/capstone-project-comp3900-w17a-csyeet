import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { AddressForm, AddressDetails } from "./AddressForm";
import { action } from "@storybook/addon-actions/dist/preview";

export default {
  title: "ui/base/Address Form",
  component: AddressForm,
} as Meta;

const data: AddressDetails = {
  street: "5 middlebrook rise",
  suburb: "bella Vista",
  postcode: "2153",
  state: "NSW",
  country: "Australia",
};
export const Overview = () => (
  <AddressForm addressData={data} onChange={() => action("onChange")} />
);
