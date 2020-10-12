import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SelectWrapper, { SelectWrapperProps } from "./SelectWrapper";

export default {
  title: "Form Components/Select",
  component: SelectWrapper,
} as Meta;

const Template: Story<SelectWrapperProps> = (args) => (
  <SelectWrapper {...args} />
);

const data = ["hi", "this", "is", "my", "selector", "bye!"];
export const Overview = Template.bind({});
Overview.args = {
  field: "name in store",
  label: "Label",
  data: data,
  onChange: () => {},
};
