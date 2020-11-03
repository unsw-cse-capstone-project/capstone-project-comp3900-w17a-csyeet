import React from "react";
import { ListingStore } from "./ListingStore";
import { Typography, Button } from "@material-ui/core";
import { ListingPage } from "../view_listing/listingPage";
import { ListingActual } from "../ui/util/types/listing";
import { useStore } from "../AuthContext";
import { observer } from "mobx-react";
export const PreviewListing = observer(
  ({
    store,
    onPublish,
    onBack,
  }: {
    store: ListingStore;
    onPublish: () => void;
    onBack: () => void;
  }) => {
    const userStore = useStore();
    if (!userStore || !userStore.user) {
      return null;
    }
    console.log(store);
    const listing: ListingActual = {
      id: -1,
      owner: userStore.user,
      title: store.descTitle,
      description: store.desc,
      num_bathrooms: parseInt(store.nBathrooms),
      num_bedrooms: parseInt(store.nBedrooms),
      num_car_spaces: parseInt(store.nGarages),
      type: store.type,
      street: store.street,
      suburb: store.suburb,
      state: store.state,
      country: store.country,
      postcode: store.postcode,
      auction_start: store.auctionStart as Date,
      auction_end: store.auctionEnd as Date,
      images: store.images.map((image) => image.data_url || ""),
      features: store.features,
      starred: false,
      registered_bidder: false,
      reserve_met: false,
      landmarks: [],
      highest_bid: null,
    };
    listing.features = listing.features.map((feature) =>
      feature
        .split("_")
        .slice(1)
        .map((word) => word[0].toLowerCase() + word.slice(1))
        .join(" ")
    );
    console.log(listing.images);
    return (
      <div>
        <Typography>Preview Listing </Typography>
        <Button variant={"contained"} color={"primary"} onClick={onPublish}>
          Publish
        </Button>
        <ListingPage listing={listing} SuburbPanelContent={() => <div></div>} />
      </div>
    );
  }
);
