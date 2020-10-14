import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { action } from "mobx";
import { SelectWrapper } from "./SelectWrapper";

export default {
  title: "Form Components/Select",
  component: SelectWrapper,
} as Meta;

const data = ["1", "2", "3", "4"];
export const Overview = () => (
  <SelectWrapper
    label="Label" // (Jenn) TODO: Label overflows
    field="name in store"
    data={data}
    onChange={action("onChange")}
  />
);
