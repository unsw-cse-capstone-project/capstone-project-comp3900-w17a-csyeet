import React from "react";
import { ListingStore } from "./ListingPresenter";
import {
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
  CircularProgress,
} from "@material-ui/core";
import { ListingPage } from "../view_listing/ListingPage";
import { ListingActual } from "../ui/util/types/listing";
import { useStore } from "../AuthContext";
import { observer } from "mobx-react";
import { toCapitaliseCase } from "../ui/util/helper";
import { BackButton } from "../ui/base/back_button/BackButton";

export const PreviewListingStyle = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      paddingTop: "30px",
      display: "flex",
      justifyContent: "space-between",
    },
    backToEditingButton: {
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
    const [isSubmitting, setSubmitting] = React.useState(false);
    if (!userStore || !userStore.user) {
      return null;
    }
    const listing: ListingActual = {
      id: -1,
      owner: userStore.user,
      title: store.listing.title,
      description: store.listing.description,
      num_bathrooms: store.listing.num_bathrooms,
      num_bedrooms: store.listing.num_bedrooms,
      num_car_spaces: store.listing.num_car_spaces,
      type: store.listing.type,
      street: toCapitaliseCase(store.address.street),
      suburb: toCapitaliseCase(store.address.suburb),
      state: store.address.state
        .split(" ")
        .map((word) => word[0])
        .join(""),
      country: store.address.country,
      postcode: store.address.postcode,
      auction_start: store.auction.auction_start as Date,
      auction_end: store.auction.auction_end as Date,
      images: store.imageList.map((image) => image.data_url || ""),
      features: store.listing.features,
      starred: false,
      registered_bidder: false,
      reserve_met: false,
      landmarks: [],
      highest_bid: null,
    };

    const onClick = () => {
      setSubmitting(true);
      onPublish();
    };

    console.log(listing.auction_start);
    const classes = PreviewListingStyle();
    return (
      <div>
        <div className={classes.header}>
          <BackButton
            className={classes.backToEditingButton}
            onClick={onBack}
            text="Back"
          />
          <Button
            variant={"contained"}
            disabled={isSubmitting}
            color={"primary"}
            onClick={onClick}
          >
            {isSubmitting ? <CircularProgress size="small" /> : "Publish"}
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
