import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AuthForm from "./AuthForm";
import AuthStore from "../../../stores/AuthStore";

export default {
  title: "AuthForm",
  component: AuthForm,
} as Meta;

const Template: Story<{ store: AuthStore; onSubmit: () => void }> = (args) => (
  <AuthForm {...args} />
);

const onSubmit = () => {
  console.log("Submitted Form");
};
let store = new AuthStore();
export const SignInForm = Template.bind({});
SignInForm.args = {
  store: store,
  onSubmit: onSubmit,
};

store.formType = "signup";
export const SignUpForm = Template.bind({});
SignUpForm.args = {
  store: store,
  onSubmit: onSubmit,
};
