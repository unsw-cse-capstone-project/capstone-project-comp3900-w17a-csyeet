import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { BidderTag } from "../../../ui/base/teresa/bidder_tag/BidderTag";
import { BiddingBox, BiddingBoxStore } from "./BiddingBox";
import { action } from "@storybook/addon-actions";
import { Typography } from "@material-ui/core";
import { createFakeListing } from "../../../ui/util/fakes/listing";

export default {
  title: "auction/biddingBox",
  component: BiddingBox,
  argTypes: {
    bidState: {
      control: {
        type: "select",
        option: ["reserve_met", "reserve_not_met"],
      },
      defaultValue: "reserve_met",
    },
    enableBidding: {
      control: {
        type: "boolean",
      },
      defaultValue: true,
    },
    currentBid: {
      control: {
        type: "number",
      },
      defaultValue: 500000,
    },
    isAuctionClosed: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
  },
} as Meta;

const Template: Story<{
  enableBidding: boolean;
  bidState: "reserve_met" | "reserve_not_met";
  currentBid: number;
  isAuctionClosed: boolean;
}> = (props: {
  enableBidding: boolean;
  bidState: "reserve_met" | "reserve_not_met";
  currentBid: number;
  isAuctionClosed: boolean;
}) => {
  const store = new BiddingBoxStore();
  return (
    <BiddingBox
      store={store}
      currentBid={props.currentBid}
      enableBidding={props.enableBidding}
      isAuctionClosed={props.isAuctionClosed}
      bidState={props.bidState}
      BidderTag={() => <BidderTag bidderNumber={1234} />}
      onPlaceBid={action("Place bid button clicked")}
    />
  );
};
export const Stateful = Template.bind({});
// export const Overview = () => {
//   const store = new BiddingBoxStore();
//   return (
//     <div>
//       <Typography variant="h5">Pre Auction (Unknown current bid)</Typography>
//       <BiddingBox
//         store={store}
//         enableBidding={false}
//         isAuctionClosed={false}
//         bidState={"current"}
//         BidderTag={() => <BidderTag bidderNumber={1234} />}
//         onPlaceBid={action("Place bid button clicked")}
//       />
//     </div>
//   );
// };
