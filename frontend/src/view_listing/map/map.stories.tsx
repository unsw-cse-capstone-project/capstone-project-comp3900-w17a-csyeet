import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Map } from "./map";
import { createFakeActualListing } from "../../ui/util/fakes/listing";

export default {
  title: "view_listing/map",
  component: Map,
} as Meta;

export const Overview = () => <Map listing={createFakeActualListing()} />;
