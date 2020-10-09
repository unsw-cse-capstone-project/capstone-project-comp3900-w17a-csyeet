import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Header } from "./Header";
import { useUserStore } from "../../../UserContextProvider";
import UserStore from "../../../stores/UserStore";
export default {
  title: "Header",
  component: Header,
} as Meta;

const Template: Story<{ userStore: UserStore }> = (args) => (
  <Header {...args} />
);
let userStore = new UserStore();

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  userStore: userStore,
};

userStore.usernm = "Jennifer";
export const LoggedIn = Template.bind({});
LoggedIn.args = {
  userStore: userStore,
};
