import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Header from "./Header";
import { AuthProvider } from "../../../AuthContext";
import { SignUpStore } from "./sign_up/SignUpStore";
export default {
  title: "ui/base/header",
  component: Header,
} as Meta;

let signUpStore = new SignUpStore();
export const Overview = () => {
  return (
    <AuthProvider>
      <Header signUpStore={signUpStore} />
    </AuthProvider>
  );
};
