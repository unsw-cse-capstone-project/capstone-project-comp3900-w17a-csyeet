import { SearchPage } from "./SearchPage";
import { Meta } from "@storybook/react/types-6-0";
import { createSearchPage } from "./create";
import * as React from "react";

export default {
  title: "search/searchPage",
  component: SearchPage,
} as Meta;

const Page = createSearchPage();

export const Overview = () => <Page />;
