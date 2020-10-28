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
    },
    registered_bidder: {
      control: {
        type: "boolean"
      },
      defaultValue: false,
    },
    isUser: {
      control: {
        type: "boolean"
      },
      defaultValue: false,
    }
  }
} as Meta;

const Template: Story<{
  auction_start: string;
  auction_end: string;
  registered_bidder: boolean;
  isUser: boolean;
}> = (props: { auction_start: string; auction_end: string, registered_bidder: boolean; isUser: boolean }) => {
  return (
    <AuctionDetails
      auction_start={new Date(props.auction_start)}
      auction_end={new Date(props.auction_end)}
      registered_bidder={props.registered_bidder}
      id={1}
      isUser={false}
    />
  );
};
export const Overview = Template.bind({});
