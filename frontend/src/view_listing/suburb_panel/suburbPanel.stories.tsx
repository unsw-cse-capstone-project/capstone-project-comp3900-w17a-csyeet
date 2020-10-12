import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { SuburbPanel } from "./suburbPanel";

export default {
  title: "view_listing/suburbPanel",
  component: SuburbPanel,
  argTypes: {
    suburb: {
      control: {
        type: "text"
      }
    }
  }
} as Meta;

export const Overview = () => <SuburbPanel suburb={"Chatswood"} />;
