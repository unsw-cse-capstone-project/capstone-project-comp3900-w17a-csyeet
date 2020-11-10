import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { SuburbPanel } from "./SuburbPanel";
import { createFakeActualListing } from '../../ui/util/fakes/listing';

export default {
  title: "view_listing/suburbPanel",
  component: SuburbPanel,

} as Meta;

export const Overview = () => <SuburbPanel listing={createFakeActualListing()} Content={() => <div>test</div>}/>;
