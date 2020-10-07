import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { createFakeAddress } from "../ui/util/helper";
import {
  BidderRegistration,
  BidderRegistrationStore,
} from "./BidderRegistration";

export default {
  title: "bidder registration/page",
  component: BidderRegistration,
} as Meta;

export const Overview = () => {
  const store = new BidderRegistrationStore();
  return (
    <div style={{ height: "800px" }}>
      <BidderRegistration
        store={store}
        currentBid={500000}
        address={createFakeAddress()}
      />
    </div>
  );
};
