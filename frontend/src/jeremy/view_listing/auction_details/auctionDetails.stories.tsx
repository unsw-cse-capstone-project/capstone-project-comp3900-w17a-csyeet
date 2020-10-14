import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { AuctionDetails } from "./auctionDetails";

export default {
  title: "view_listing/auctionDetails",
  component: AuctionDetails,
  argTypes: {
    auction_start: {
      control: {
        type: "date"
      },
      defaultValue: new Date().toString()
    },
    auction_end: {
      control: {
        type: "date"
      },
      defaultValue: new Date().toString()
    }
  }
} as Meta;

const Template: Story<{
  auction_start: string;
  auction_end: string;
}> = (props: { auction_start: string; auction_end: string }) => {
  return (
    <AuctionDetails
      auction_start={new Date(props.auction_start)}
      auction_end={new Date(props.auction_end)}
      id={1}
    />
  );
};
export const Overview = Template.bind({});
