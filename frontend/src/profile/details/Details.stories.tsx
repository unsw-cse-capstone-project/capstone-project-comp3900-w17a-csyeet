import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Details } from "./Details";
import { DetailStore } from "./DetailStore";
import { action } from "@storybook/addon-actions";
export default {
  title: "profile/Details",
  component: Details,
} as Meta;

const store = new DetailStore();
store.name = "Example Name";
export const Overview = () => (
  <Details
    store={store}
    onUpdate={() => action("onUpdate")}
    onChangePassword={() => action("onChangePassword")}
  />
);
