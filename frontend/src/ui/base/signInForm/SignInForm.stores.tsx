import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SignInForm, { SignInFormProps } from "./SignInForm";
import SignInStore from "./SignInStore";

export default {
  title: "Sign in Form",
  component: SignInForm,
} as Meta;

const Template: Story<SignInFormProps> = (args) => <SignInForm {...args} />;

let store = new SignInStore();
const tempSubmit = () => console.log("Submitted sign in form.");
export const Overview = Template.bind({});
Overview.args = {
  store: store,
  onSubmit: tempSubmit,
};
