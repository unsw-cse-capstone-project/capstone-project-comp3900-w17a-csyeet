import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { BidderRegistrationStore } from "./BidderRegistrationPresenter";
import { BidderRegistration } from "./BidderRegistration";
import { createFakeListing } from "../ui/util/fakes/listing";
import { action } from '@storybook/addon-actions';

export default {
  title: "bidder registration/bidderRego",
  component: BidderRegistration,
} as Meta;

export const RegoOnly = () => {
  const store = new BidderRegistrationStore();
  return (
    <div style={{ height: "800px" }}>
      <BidderRegistration store={store} listingId={createFakeListing().id} onSubmit={action("onSubmit")}/>
    </div>
  );
};
