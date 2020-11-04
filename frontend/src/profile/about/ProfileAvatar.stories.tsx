import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { ProfileAvatar } from "./ProfileAvatar";
import { action } from "@storybook/addon-actions/dist/preview";

export default {
  title: "ProfileAvatar",
  component: ProfileAvatar,
} as Meta;

export const Overview = () => (
  <ProfileAvatar
    avatar={"https://avatarfiles.alphacoders.com/791/79102.png"}
    onUpload={() => action("onUpload")}
  />
);
