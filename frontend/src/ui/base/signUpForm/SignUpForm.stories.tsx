import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SignUpForm, { SignUpFormProps } from "./SignUpForm";
import SignUpStore from "./SignUpStore";

export default {
<<<<<<< HEAD
  title: "Authentication/Sign Up",
=======
  title: "Sign Up Form",
>>>>>>> 29986f12a4570f6e2909ece56c9e34c3b742b32d
  component: SignUpForm,
} as Meta;

const Template: Story<SignUpFormProps> = (args) => <SignUpForm {...args} />;

let store = new SignUpStore();
const tempSubmit = () => console.log("Submitted sign up form.");
export const Overview = Template.bind({});
Overview.args = {
  store: store,
  onSubmit: tempSubmit,
};
