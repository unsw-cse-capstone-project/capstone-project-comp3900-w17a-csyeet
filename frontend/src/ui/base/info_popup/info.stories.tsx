import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { InfoPopup } from "./InfoPopup";

export default {
  title: "ui/base/Info Popup",
  component: InfoPopup,
} as Meta;

export const Overview = () => <InfoPopup data="I am popup" />;
