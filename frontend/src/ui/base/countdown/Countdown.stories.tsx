import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Countdown } from "./Countdown";

export default {
  title: "ui/base/countdown",
  component: Countdown,
  argTypes: {
    date: {
      control: {
        type: "date",
      },
      defaultValue: new Date().toString(),
    },
  },
} as Meta;

const Template: Story<{ date: string }> = (props: { date: string }) => (
  <Countdown date={new Date(props.date)} />
);

export const Overview = Template.bind({});
