import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Details } from "./Details";
import { action } from "@storybook/addon-actions";
import { ProfileStore } from "../ProfilePresenter";
import { runInAction } from "mobx";
export default {
  title: "profile/Details",
  component: Details,
} as Meta;

const store = new ProfileStore(5);
runInAction(() => {
  store.userDetails = {
    name: "Jennifer",
    email: "Jenn@example.com",
    phone_number: "0414555666",
    street: "30 Gellot Tripe",
    suburb: "Tpeorh",
    postcode: "2356",
    state: "NSW",
    country: "Australia",
  };
});

export const Overview = () => (
  <Details
    store={store}
    onUpdateUserDetails={() => action("onUpdate")}
    onChangePassword={() => action("onChangePassword")}
  />
);
