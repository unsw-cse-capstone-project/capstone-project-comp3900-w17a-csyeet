import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { AddressForm } from "./AddressForm";
import { action } from "@storybook/addon-actions/dist/preview";

export default {
  title: "ui/base/Address Form",
  component: AddressForm,
} as Meta;

export const Overview = () => (
  <AddressForm onChange={() => action("oChange")} />
);
