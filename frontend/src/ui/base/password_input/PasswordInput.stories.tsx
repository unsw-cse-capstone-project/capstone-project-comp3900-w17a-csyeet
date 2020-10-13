import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import PasswordInput from "./PasswordInput";

export default {
  title: "Form Components/Password Input",
  component: PasswordInput,
} as Meta;

export const Overview = () => <PasswordInput onChange={() => {}} />; // (Jenn) TODO: Action() magic
