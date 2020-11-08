import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { LandmarksPanel } from "./LandmarksPanel";
import { createFakeActualListing } from '../../ui/util/fakes/listing';

export default {
  title: "view_listing/landmarksPanel",
  component: LandmarksPanel
} as Meta;

export const Overview = () => <LandmarksPanel facilities={createFakeActualListing().landmarks} />;
