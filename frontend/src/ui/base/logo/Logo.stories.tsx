import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Logo, { LogoProps } from "./Logo";

export default {
<<<<<<< HEAD
  title: "ui/base/Logo",
=======
  title: "Logo",
>>>>>>> 29986f12a4570f6e2909ece56c9e34c3b742b32d
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
