import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { AuctionPage } from "./AuctionPage";
import mainImage from "../images/propertyMain.jpg";
import { BiddingBox, BiddingBoxStore } from "./bidding_box/BiddingBox";
import { action } from "@storybook/addon-actions";
import { BidderTag } from "../ui/base/bidder_tag/BidderTag";
import { Bid, BidsList } from "./bids_list/BidsList";
import { BiddersList } from "./bidders_list/BiddersList";
import { createFakeAddress } from "../ui/util/helper";

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
    enableBidding: {
      control: {
        type: "boolean",
      },
      defaultValue: true,
    },
  },
} as Meta;

let bids: Bid[] = [
  {
    value: { price: 500000, state: "reserve_met" },
    bidder: 1234,
    time: new Date(),
  },
];

for (let i = 0; i < 3; i++) {
  bids.push({
    value: { price: 500000 - (i + 1) * 10000, state: "reserve_not_met" },
    bidder: 1230 + i,
    time: new Date(),
  });
}

const Template: Story<{
  auctionDate: string;
  enableBidding: boolean;
}> = (props: { auctionDate: string; enableBidding: boolean }) => {
  const store = new BiddingBoxStore();
  const BiddingBoxWrapper = () => (
    <BiddingBox
      store={store}
      currentBid={500000}
      enableBidding={props.enableBidding}
      isAuctionClosed={
        new Date(props.auctionDate).getTime() - new Date().getTime() <= 0
      }
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
      BiddingBox={BiddingBoxWrapper}
      BidsList={() => <BidsList bids={bids} />}
      BiddersList={() => (
        <BiddersList bidders={[1234, 1233, 1232, 1231]} currentUser={1234} />
      )}
    />
  );
};
export const Overview = Template.bind({});