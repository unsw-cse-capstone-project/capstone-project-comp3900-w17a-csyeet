import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import PasswordInput from "./PasswordInput";
import { action } from "@storybook/addon-actions";

export default {
  title: "Form Components/Password Input",
  component: PasswordInput,
} as Meta;

export const Overview = () => (
  <PasswordInput value="" onChange={action("onChange")} />
);
