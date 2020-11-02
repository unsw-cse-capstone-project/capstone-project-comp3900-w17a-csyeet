import React from "react";
import { ListingStore } from "./ListingStore";
import { Typography, Button } from "@material-ui/core";
export const PreviewListing = ({ store, onPublish, onBack }: {
  store: ListingStore;
  onPublish: () => void;
  onBack: () => void,
}) => {
  return (
    <div>
      <Typography>Preview Listing </Typography>
      <Button variant={"contained"} color={"primary"} onClick={onPublish}>
        Publish
      </Button>
    </div>
  );
};
