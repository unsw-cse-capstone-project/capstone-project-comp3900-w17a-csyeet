import React from "react";
import { ListingStore } from "./ListingStore";
import { Typography, Button } from "@material-ui/core";
export const PreviewListing: React.FC<{
  store: ListingStore;
  onPublish: () => void;
}> = ({ store, onPublish }) => {
  return (
    <div>
      <Typography>Preview Listing </Typography>
      <Button variant={"contained"} color={"primary"} onClick={onPublish} />
    </div>
  );
};
