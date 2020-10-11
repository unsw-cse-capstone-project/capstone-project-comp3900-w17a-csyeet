import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Header from "./Header";
import { AuthProvider } from "../../authContext/AuthContext";

export default {
  title: "ui/base/Header",
  component: Header,
} as Meta;

export const Overview = () => {
  return (
    <AuthProvider>
      <Header />
    </AuthProvider>
  );
};

