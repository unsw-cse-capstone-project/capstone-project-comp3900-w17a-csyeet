import * as React from "react";
import { ListingStore, ListingPresenter } from "../ListingPresenter";
import { useHistory, useParams } from "react-router-dom";
import { Snackbar, Typography } from "@material-ui/core";
import { ListingForm } from "../listing_form/ListingForm";
import { PreviewListing } from "../PreviewListing";
import { EditListingStyles } from "./EditListing.css";
import MuiAlert from "@material-ui/lab/Alert";
import { observer } from "mobx-react";

export const EditListingPage = () => {
  const presenter = new ListingPresenter();
  const store = new ListingStore();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = React.useState<boolean>(false);
  presenter.fetchListing(store, parseInt(id), () => setError(true));
  if (error) return <div>Error Fetching Listing</div>;
  const updateListing = (
    store: ListingStore,
    onSuccess: () => void,
    onError: () => void
  ) => {
    presenter.updateListing(store, onSuccess, onError);
  };
  return (
    <EditListingPageBase
      store={store}
      onUpdateListing={(
        store: ListingStore,
        onSuccess: () => void,
        onError: () => void
      ) => updateListing(store, onSuccess, onError)}
    />
  );
};

export const EditListingPageBase = observer(
  ({
    store,
    onUpdateListing,
  }: {
    store: ListingStore;
    onUpdateListing: (
      store: ListingStore,
      onSuccess: () => void,
      onError: () => void
    ) => void;
  }) => {
    const history = useHistory();
    const [status, setStatus] = React.useState<string | null>(null);
    const [openSnack, setOpen] = React.useState<boolean>(false);
    const [isEditing, setIsEditing] = React.useState<boolean>(true);
    const classes = EditListingStyles();
    const onLoad = () => {
      setStatus("updating");
      setOpen(true);
    };
    const onSuccess = () => {
      setStatus("success");
      setOpen(true);
      history.push("/listing/" + store.listing.id?.toString());
    };

    const onError = () => {
      setStatus("error");
      setOpen(true);
    };

    const snackContent = (status: string) => {
      switch (status) {
        case "success":
          return <MuiAlert severity="success">Successfully updated</MuiAlert>;
        case "updating":
          return <MuiAlert severity="info">Updating your listing...</MuiAlert>;
        case "error":
          return (
            <MuiAlert severity="error">There was an error updating</MuiAlert>
          );
        default:
          return <></>;
      }
    };

    return (
      <div className={classes.root}>
        <div className={classes.main}>
          {isEditing ? (
            <>
              <Typography variant="h3">Edit Listing</Typography>
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
                onLoad();
                onUpdateListing(store, onSuccess, onError);
              }}
            />
          )}
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
      </div>
    );
  }
);
