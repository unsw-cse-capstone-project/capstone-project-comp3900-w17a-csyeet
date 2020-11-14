import React from "react";
import { ListingStore } from "./ListingPresenter";
import {
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
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

/**
 * Preview Listing component that allows users to see how their listing will be
 * displayed before publishing and finalising new listing details
 * @param store
 * @param onPublish
 * @param onBack
 */
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
      state: store.address.state,
      country: store.address.country,
      postcode: store.address.postcode,
      auction_start: store.auction.auction_start as Date,
      auction_end: store.auction.auction_end as Date,

      // Already uploaded images also need to be shown
      images: store.imageList.map((image) => image.data_url || ""),
      features: store.listing.features,
      starred: false,
      registered_bidder: false,
      reserve_met: false,
      landmarks: [],
      highest_bid: null,
    };

    const confirmedPublish = () => {
      setSubmitting(true);
      onPublish();
    };

    const [openConfirmDialog, setDialog] = React.useState<boolean>(false);
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
            onClick={() => setDialog(true)}
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
        <Dialog open={openConfirmDialog} onClose={() => setDialog(false)}>
          <DialogTitle>{"Publish your listing"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>Warning: </strong>Once you publish your listing you won't
              be able to edit the address of your property.
            </DialogContentText>
            <DialogContentText>
              <strong>Warning: </strong>Once the auction has begun, you can no
              longer change your auction dates, reserve price or payment
              details.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialog(false)} color="primary">
              Back
            </Button>
            <Button
              onClick={() => {
                setDialog(false);
                confirmedPublish();
              }}
              variant="contained"
              color="primary"
              autoFocus
            >
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
);
