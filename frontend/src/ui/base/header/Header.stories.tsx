import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Header from "./Header";
import { AuthProvider } from "../../authContext/AuthContext";
import SignInStore from "../signInForm/SignInStore";
import SignUpStore from "../signUpForm/SignUpStore";

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
