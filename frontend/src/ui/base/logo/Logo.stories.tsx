import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Logo, { LogoProps } from "./Logo";

export default {
  title: "ui/base/Logo",
  component: Logo,
} as Meta;

const Template: Story<LogoProps> = (args) => <Logo {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: "large",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
};
