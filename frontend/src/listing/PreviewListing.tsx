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
    root: {
      minHeight: "100vh - 800px",
    },
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

    const uploadedImages: string[] = store.imageList.map(
      (image) => image.data_url || ""
    );
    const allImages: string[] = uploadedImages.concat(store.listing.images);
    const listing: ListingActual = {
      id: -1,
      owner: userStore.user,
      title: store.listing.title,
      description: store.listing.description,
      num_bathrooms: store.listing.num_bathrooms as number,
      num_bedrooms: store.listing.num_bedrooms as number,
      num_car_spaces: store.listing.num_car_spaces as number,
      type: store.listing.type,
      street: toCapitaliseCase(store.address.street),
      suburb: toCapitaliseCase(store.address.suburb),
      state: store.address.state,
      country: store.address.country,
      postcode: store.address.postcode,
      auction_start: store.auction.auction_start as Date,
      auction_end: store.auction.auction_end as Date,
      images: allImages,
      features: store.listing.features,
      starred: false,
      registered_bidder: false,
      reserve_met: false,
      landmarks: [],
      highest_bid: null,
    };

    const confirmedPublish = async () => {
      setSubmitting(true);
      await onPublish();
      setTimeout(() => {
        setSubmitting(false);
      }, 4000);
    };

    const [openConfirmDialog, setDialog] = React.useState<boolean>(false);
    const classes = PreviewListingStyle();
    return (
      <div className={classes.root}>
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
            {isSubmitting ? <CircularProgress size={20} /> : "Publish"}
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
