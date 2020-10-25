import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { FeaturesPanel } from "./featuresPanel";

export default {
  title: "view_listing/featuresPanel",
  component: FeaturesPanel
} as Meta;

export const Overview = () => <FeaturesPanel features={['ensuite', 'bathtub']} />;
