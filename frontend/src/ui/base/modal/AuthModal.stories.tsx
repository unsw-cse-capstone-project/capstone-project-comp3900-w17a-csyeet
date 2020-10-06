import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AuthModal, AuthModalProps } from "./AuthModal";
import { ModalStore } from "../../../stores/ModalStore";

export default {
  title: "AuthModal",
  component: AuthModal,
} as Meta;

const Template: Story<AuthModalProps> = (args) => <AuthModal {...args} />;
var store = new ModalStore();

export const General = Template.bind({});
General.args = {};
