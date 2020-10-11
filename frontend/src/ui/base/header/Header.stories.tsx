import React from "react";
<<<<<<< HEAD
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
=======
import { Story, Meta } from "@storybook/react/types-6-0";
import { Header } from "./Header";
export default {
  title: "Header",
  component: Header,
} as Meta;

const Template: Story<{}> = () => <Header />;
>>>>>>> 29986f12a4570f6e2909ece56c9e34c3b742b32d
