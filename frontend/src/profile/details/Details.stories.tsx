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
  store.name = "Jennifer";
  store.email = "Jenn@example.com";
  store.phone_number = "0414555666";
  store.street = "30 Gellot Tripe";
  store.suburb = "Tpeorh";
  store.postcode = "2356";
  store.state = "NSW";
  store.country = "Australia";
});

export const Overview = () => (
  <Details
    store={store}
    onUpdateUserDetails={() => action("onUpdate")}
    onChangePassword={() => action("onChangePassword")}
  />
);
