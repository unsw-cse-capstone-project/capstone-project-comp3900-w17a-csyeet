import React from "react";
import { action } from "mobx";
import { useStore } from "../../AuthContext";
import { DetailStore } from "./DetailStore";
import { Details } from "./Details";

export const DetailsPage = () => {
  const userStore = useStore();
  if (!userStore) throw Error("User Store cannot be null");

  const store = new DetailStore();
  const fillDetailStore = action(() => {
    if (!userStore.user) throw Error("User does not exit");
    const {
      id,
      name,
      phone_number,
      street,
      suburb,
      postcode,
      state,
      country,
    } = userStore.user;
    store.id = id;
    store.name = name;
    store.phone_number = phone_number;
    store.street = street;
    store.suburb = suburb;
    store.postcode = postcode;
    store.state = state;
    store.country = country;
  });

  const onUpdate = () => {
    // (Jenn) TODO: Update
    console.log("Updating");
  };

  const onChangePassword = (onError: () => void) => {
    // (Jenn) TODO: Update
    console.log("Changing password");
  };
  fillDetailStore();

  return (
    <Details
      store={store}
      onUpdate={onUpdate}
      onChangePassword={onChangePassword}
    />
    // Snack for error on update here.
    // Snack for success update here.
  );
};
