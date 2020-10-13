import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Header from "./Header";
import SignInStore from "../sign_in/SignInStore";
import SignUpStore from "../sign_up/SignUpStore";
import { AuthProvider } from "../../../AuthContext";
export default {
  title: "ui/base/Header",
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
