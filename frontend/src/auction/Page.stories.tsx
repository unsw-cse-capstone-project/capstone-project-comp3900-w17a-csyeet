import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { createFakeListing } from "../ui/util/fakes/listing";
import { AuctionPageWrapper } from "./main";
import { AuctionPageStore } from "./AuctionPagePresenter";
import { createFakeBidsList } from "../ui/util/fakes/bid";
import { action } from "@storybook/addon-actions";

const store = new AuctionPageStore();
store.listing = createFakeListing();
store.bids = createFakeBidsList(4);

export default {
  title: "auction/pageWrapper",
  component: AuctionPageWrapper,
  argTypes: {
    loadingState: {
      control: {
        type: "select",
        options: ["loaded", "loading", "error"],
      },
      defaultValue: "loaded",
    },
    auction_start: {
      control: {
        type: "date",
      },
      defaultValue: createFakeListing().auction_start,
    },
    auction_end: {
      control: {
        type: "date",
      },
      defaultValue: createFakeListing().auction_end,
    },
    reserve_price: {
      control: {
        type: "number",
      },
      defaultValue: createFakeListing().reserve_price,
    },
  },
} as Meta;

export const Overview = (props: {
  loadingState: "loaded" | "loading" | "error";
  auction_start: string;
  auction_end: string;
  reserve_price: number;
}) => {
  store.listing = createFakeListing({
    auction_start: new Date(props.auction_start),
    auction_end: new Date(props.auction_end),
    reserve_price: props.reserve_price,
  });
  store.loadingState = props.loadingState;
  return (
    <AuctionPageWrapper
      store={store}
      id={1}
      onPlaceBid={action("onPlaceBid")}
    />
  );
};
