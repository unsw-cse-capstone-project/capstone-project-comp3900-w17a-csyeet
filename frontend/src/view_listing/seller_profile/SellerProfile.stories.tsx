import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { SellerProfile } from "./SellerProfile";

export default {
  title: "view_listing/sellerProfile",
  component: SellerProfile,
  argTypes: {
    suburb: {
      control: {
        type: "text",
      },
    },
  },
} as Meta;

export const Overview = () => (
  <SellerProfile id={1} name="Jeremy" email="Jeremy@example.com" avatar="" />
);
