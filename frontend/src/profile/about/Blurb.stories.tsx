import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Blurb } from "./Blurb";
import { action } from "@storybook/addon-actions/dist/preview";

export default {
  title: "Profile/Blurb",
  component: Blurb,
} as Meta;

export const Overview = () => (
  <Blurb
    blurb={"Hi, I'm jenn and I like milk tea"}
    onEdit={() => action("onEdit")}
  />
);
