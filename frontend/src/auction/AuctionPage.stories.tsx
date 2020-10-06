import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { AuctionPage, Address } from "./AuctionPage";
import mainImage from "../images/propertyMain.jpg";
import { BiddingBox, BiddingBoxStore } from "./bidding_box/BiddingBox";
import { action } from "@storybook/addon-actions";
import { BidderTag } from "../ui/base/bidder_tag/BidderTag";

export default {
  title: "auction/auctionPage",
  component: AuctionPage,
  argTypes: {
    auctionDate: {
      control: {
        type: "date",
      },
      defaultValue: new Date().toString(),
    },
  },
} as Meta;

const createFakeAddress = (): Address => ({
  streetAddress: "111/544 pacific highway",
  suburb: "chatswood",
  state: "nsw",
  postcode: 2067,
});

const Template: Story<{ auctionDate: string }> = (props: {
  auctionDate: string;
}) => {
  const store = new BiddingBoxStore();
  const BiddingBoxWrapper = () => (
    <BiddingBox
      store={store}
      currentBid={500000}
      bidState="reserve_met"
      BidderTag={() => <BidderTag bidderNumber={1234} />}
      onPlaceBid={action("Place bid button clicked")}
    />
  );
  return (
    <AuctionPage
      address={createFakeAddress()}
      auctionDate={new Date(props.auctionDate)}
      mainImage={mainImage}
      currentBid={{ price: 500000, state: "reserve_met" }}
      bidderNumber={1234}
      BiddingBox={BiddingBoxWrapper}
    />
  );
};
export const Overview = Template.bind({});
