import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { AuthProvider } from "../../../AuthContext";
import { Header } from "./Header";
import { SignInStore } from "./sign_in/SignInStore";
import { SignUpStore } from "./sign_up/SignUpStore";
export default {
  title: "ui/base/header",
  component: Header,
} as Meta;

let signInStore = new SignInStore();
let signUpStore = new SignUpStore();
export const Overview = () => {
  return (
    <AuthProvider>
      <Header signInStore={signInStore} signUpStore={signUpStore} />
    </AuthProvider>
  );
};
