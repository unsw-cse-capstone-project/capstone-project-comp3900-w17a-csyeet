import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { BidPrice, BidPriceWithBidderTag } from "./BidPrice";
import { BidderTag } from "../bidder_tag/BidderTag";

export default {
  title: "ui/base/bidPrice",
  component: BidPrice,
} as Meta;

export const Overview = () => (
  <div>
    <BidPrice price={500000} state="reserve_met" style={{ margin: "10px" }} />
    <BidPrice
      price={500000}
      state="reserve_not_met"
      style={{ margin: "10px" }}
    />
    <BidPrice price={500000} state="current" style={{ margin: "10px" }} />
    <BidPrice price={500000} state="past" style={{ margin: "10px" }} />
  </div>
);

export const BidPriceWithBidderTagOverview = () => (
  <div style={{ width: "300px" }}>
    <BidPriceWithBidderTag
      BidPrice={() => <BidPrice price={500000} state="reserve_met" />}
      BidderTag={() => <BidderTag bidderNumber={1234} />}
    />
  </div>
);
