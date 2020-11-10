import React from "react";
import { Meta } from "@storybook/react/types-6-0";
<<<<<<< HEAD
import { DetailsPage } from "./DetailsPage";

=======
import { Details } from "./Details";
import { action } from "@storybook/addon-actions";
import { DetailStore } from "./DetailPresenter";
>>>>>>> master
export default {
  title: "Profile/Details",
  component: DetailsPage,
} as Meta;

export const Overview = () => <DetailsPage />;
