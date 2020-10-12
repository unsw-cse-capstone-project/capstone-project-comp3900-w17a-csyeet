import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { FacilitiesPanel } from "./facilitiesPanel";

export default {
  title: "view_listing/facilitiesPanel",
  component: FacilitiesPanel
} as Meta;

export const Overview = () => <FacilitiesPanel facilities={"test"} />;
