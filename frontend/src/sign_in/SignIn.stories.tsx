import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SignIn, { SignInProps } from "./SignIn";
import SignInStore from "./SignInStore";

export default {
  title: "Authentication/Sign in",
  component: SignIn,
} as Meta;

const Template: Story<SignInProps> = (args) => <SignIn {...args} />;

let store = new SignInStore();
export const Overview = Template.bind({});
Overview.args = {
  onSubmit: action("onSubmit"),
  store: store,
};
