import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Map } from "./map";

export default {
  title: "view_listing/map",
  component: Map,
  argTypes: {
    image: {
      control: {
        type: "text"
      }
    }
  }
} as Meta;

export const Overview = () => (
  <Map
    image={
      "https://i0.wp.com/www.cssscript.com/wp-content/uploads/2018/03/Simple-Location-Picker.png?fit=561%2C421&ssl=1"
    }
  />
);
