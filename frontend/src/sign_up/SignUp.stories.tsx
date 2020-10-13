import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SignUp, { SignUpProps } from "./SignUp";
import SignUpStore from "./SignUpStore";

export default {
  title: "Authentication/Sign Up",
  component: SignUp,
} as Meta;

let store = new SignUpStore();
const Template: Story<SignUpProps> = (args) => <SignUp {...args} />;
export const Overview = Template.bind({});
Overview.args = {
  onSubmit: action("onSubmit"),
  store: store,
};
