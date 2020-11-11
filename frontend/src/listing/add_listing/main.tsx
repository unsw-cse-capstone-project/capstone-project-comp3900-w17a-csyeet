import * as React from "react";
import { ListingStore, ListingPresenter } from "../ListingPresenter";
import { useHistory } from "react-router-dom";
import {
  Snackbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { ListingForm } from "../listing_form/ListingForm";
import { PreviewListing } from "../PreviewListing";
import { AddListingStyles } from "./AddListing.css";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { observer } from "mobx-react";

function Alert(props: AlertProps) {
  return <MuiAlert variant="filled" {...props} />;
}

export const AddListingPage = () => {
  const presenter = new ListingPresenter();
  const store = new ListingStore();
  return <AddListingPageBase store={store} presenter={presenter} />;
};

export const AddListingPageBase = observer(
  ({
    store,
    presenter,
  }: {
    store: ListingStore;
    presenter: ListingPresenter;
  }) => {
    const history = useHistory();
    const [status, setStatus] = React.useState<string | null>(null);
    const [openSnack, setOpen] = React.useState<boolean>(false);
    const [openConfirmDialog, setDialog] = React.useState<boolean>(false);
    const [isEditing, setIsEditing] = React.useState<boolean>(true);
    const onSuccess = () => {
      setOpen(true);
      setStatus("success");
      history.push("/listing/" + store.listing.id);
    };
    const confirmPublish = () => {};
    const onPublish = () => {
      setOpen(true);
      setStatus("publishing");
      presenter.publishListing(store, onSuccess, () => {
        setOpen(true);
        setStatus("error");
      });
    };

    const snackContent = (status: string) => {
      switch (status) {
        case "success":
          return <Alert severity="success">Successfully published</Alert>;
        case "publishing":
          return <Alert severity="info">Publishing your listing...</Alert>;
        case "error":
          return <Alert severity="error">There was an error publishing</Alert>;
        default:
          return <></>;
      }
    };

    const classes = AddListingStyles();
    return (
      <>
        <div className={classes.root}>
          <div className={classes.main}>
            {isEditing ? (
              <>
                <Typography variant="h3">Add Listing</Typography>
                <ListingForm
                  store={store}
                  onBack={() => history.push("/")}
                  onPreview={() => setIsEditing(false)}
                />
              </>
            ) : (
              <PreviewListing
                store={store}
                onBack={() => setIsEditing(true)}
                onPublish={() => {
                  confirmPublish();
                  onSuccess();
                }}
              />
            )}
          </div>
        </div>
        {status !== null && (
          <Snackbar
            open={openSnack}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={1500}
            onClose={() => {
              setOpen(false);
              setStatus(null);
            }}
          >
            {snackContent(status)}
          </Snackbar>
        )}
        <Dialog open={openConfirmDialog} onClose={() => setDialog(false)}>
          <DialogTitle>{"Publish your listing"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>Warning:</strong>Once you publish your listing you won't
              be able to edit the address of your property.
            </DialogContentText>
            <DialogContentText>
              <strong>Warning:</strong>Once the auction has begun, you can no
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
                onPublish();
              }}
              variant="contained"
              color="primary"
              autoFocus
            >
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);
