import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { AuctionPage } from "./AuctionPage";
import mainImage from "../images/propertyMain.jpg";
import { BiddingBox, BiddingBoxStore } from "./bidding_box/BiddingBox";
import { action } from "@storybook/addon-actions";
import { BidderTag } from "../ui/base/bidder_tag/BidderTag";
import { BidsList } from "./bids_list/BidsList";
import { BiddersList } from "./bidders_list/BiddersList";
import { createFakeAddress } from "../ui/util/helper";
import { Bid } from "../ui/util/types/bid";
import { computed } from 'mobx';

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
    bid: 500000,
    bidder_id: 5,
    reserve_met: true,
    placed_at: new Date(),
  },
];

for (let i = 0; i < 3; i++) {
  bids.push({
    bid: 500000 - (i + 1) * 10000,
    bidder_id: 1230 + i,
    reserve_met: false,
    placed_at: new Date(),
  });
}

const Template: Story<{
  auction_start: string;
  auction_end: string;
  enableBidding: boolean;
}> = (props: {
  auction_start: string;
  enableBidding: boolean;
  auction_end: string;
}) => {
  const store = new BiddingBoxStore();
  const BiddingBoxWrapper = () => (
    <BiddingBox
      store={store}
      currentBid={500000}
      enableBidding={props.enableBidding}
      isAuctionClosed={
        new Date(props.auction_start).getTime() - new Date().getTime() <= 0
      }
      shouldDisableBiddingButton={computed(() => false)}
      bidState="reserve_met"
      BidderTag={() => <BidderTag bidderNumber={1234} />}
      onPlaceBid={action("Place bid button clicked")}
    />
  );
  return (
    <AuctionPage
      address={createFakeAddress()}
      auction_start={new Date(props.auction_start)}
      auction_end={new Date(props.auction_end)}
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
