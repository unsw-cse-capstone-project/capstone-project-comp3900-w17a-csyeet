import React from "react";
import { ListingStore } from "./ListingStore";
import {
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { ListingPage } from "../view_listing/listingPage";
import { ListingActual } from "../ui/util/types/listing";
import { useStore } from "../AuthContext";
import { observer } from "mobx-react";
import { toSentenceCase, toCapitaliseCase } from "../ui/util/helper";
import { ArrowBackIos } from "@material-ui/icons";

export const PreviewListingStyle = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      paddingTop: "30px",
      display: "flex",
      justifyContent: "space-between",
    },
    backToEditingButton: {
      width: "fit-content",
      marginBottom: theme.spacing(2),
    },
  })
);

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
    const listing: ListingActual = {
      id: -1,
      owner: userStore.user,
      title: store.descTitle,
      description: store.desc,
      num_bathrooms: parseInt(store.nBathrooms),
      num_bedrooms: parseInt(store.nBedrooms),
      num_car_spaces: parseInt(store.nGarages),
      type: store.type,
      street: toCapitaliseCase(store.street),
      suburb: toCapitaliseCase(store.suburb),
      state: store.state
        .split(" ")
        .map((word) => word[0])
        .join(""),
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
      toSentenceCase(feature)
    );

    const classes = PreviewListingStyle();
    return (
      <div>
        <div className={classes.header}>
          <Button className={classes.backToEditingButton} onClick={onBack}>
            <ArrowBackIos />
            Back
          </Button>
          <Button variant={"contained"} color={"primary"} onClick={onPublish}>
            Publish
          </Button>
        </div>
        <ListingPage
          listing={listing}
          disableActions={true}
          SuburbPanelContent={() => (
            <Typography variant="body1">
              Suburb information will be generated after the listing is created
            </Typography>
          )}
        />
      </div>
    );
  }
);
