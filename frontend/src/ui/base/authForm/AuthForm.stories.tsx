import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { AuthForm, AuthFormProps } from "./AuthForm";

export default {
  title: "AuthForm",
  component: AuthForm,
} as Meta;

const Template: Story<AuthFormProps> = (args) => <AuthForm {...args} />;

export const SignInForm = Template.bind({});
SignInForm.args = {
  type: "signin",
};

export const SignUpForm = Template.bind({});
SignUpForm.args = {
  type: "signup",
};
