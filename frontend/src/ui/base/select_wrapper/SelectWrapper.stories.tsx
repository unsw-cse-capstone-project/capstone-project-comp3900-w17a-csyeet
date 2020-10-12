import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import SelectWrapper from "./SelectWrapper";

export default {
  title: "Form Components/Select",
  component: SelectWrapper,
} as Meta;

const data = ["1", "2", "3", "4"];
export const Overview = () => (
  <SelectWrapper
    field="name in store"
    label="Label" // (Jenn) TODO: Label overflows
    data={data}
    onChange={() => {}} // (Jenn) TODO: Action() magic
  />
);
