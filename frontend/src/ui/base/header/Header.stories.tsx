import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Header, HeaderProps } from "./Header";
import { useUserStore } from "../../../UserContextProvider";
export default {
  title: "Header",
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;
const { userStore } = useUserStore();

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  userStore: userStore,
};

userStore.usernm = "Jennifer";
export const LoggedIn = Template.bind({});
LoggedIn.args = {
  userStore: userStore,
};
