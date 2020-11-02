import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { DateRangeWrapper } from "./DateRangeWrapper";
import { action } from "mobx";

export default {
  title: "ui/base/Date Range Picker",
  component: DateRangeWrapper,
} as Meta;

export const Overview = () => {
  return <DateRangeWrapper onDateChange={() => action("onDateChange")} />;
};
