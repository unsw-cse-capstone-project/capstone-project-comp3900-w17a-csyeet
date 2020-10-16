import React from "react";
import { action } from "mobx";
import { ListingStore } from "../ListingStore";
import { DetailStyles } from "./Detail.css";
import { TextFieldWrapper } from "../../../ui/base/jenn/textfield_wrapper/TextFieldWrapper";

export const Details: React.FC<{
  store: ListingStore;
}> = action(({ store }) => {
  const classes = DetailStyles();
  const onChange = (value: string, field: string) => {
    (store as any)[field] = value;
  };
  return (
    <div className={classes.container}>
      <TextFieldWrapper
        field="address"
        label="Address"
        onChange={onChange}
        value={store.address}
      />
    </div>
  );
});
