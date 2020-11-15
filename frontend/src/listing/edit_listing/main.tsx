import * as React from "react";
import { ListingStore, ListingPresenter } from "../ListingPresenter";
import { useHistory, useParams } from "react-router-dom";
import { Snackbar, Typography } from "@material-ui/core";
import { PreviewListing } from "../PreviewListing";
import { EditListingStyles } from "./EditListing.css";
import MuiAlert from "@material-ui/lab/Alert";
import { observer } from "mobx-react";
import { EditListingForm } from "./EditListingForm";
import { ErrorBoundaryPage } from "../../ui/base/error_boundary/ErrorBoundary";

export const EditListingPage = () => {
  const presenter = new ListingPresenter();
  const store = new ListingStore();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = React.useState<boolean>(false);
  presenter.fetchListing(store, parseInt(id), () => setError(true));
  if (error) return <div>Error Fetching Listing</div>;
  return (
    <ErrorBoundaryPage>
      <EditListingPageBase
        store={store}
        onUpdateListing={presenter.updateListing}
      />
    </ErrorBoundaryPage>
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
    ) => Promise<void>;
  }) => {
    const history = useHistory();
    const [status, setStatus] = React.useState<string | null>(null);
    const [openSnack, setOpen] = React.useState<boolean>(false);
    const [isEditing, setIsEditing] = React.useState<boolean>(true);
    const classes = EditListingStyles();

    const onSuccess = () => {
      setStatus("success");
      setOpen(true);
      history.push("/listing/" + store.listing.id?.toString());
    };

    const onError = () => {
      setStatus("error");
      setOpen(true);
    };

    const onPublish = () => {
      setOpen(true);
      setStatus("updating");
      onUpdateListing(store, onSuccess, onError);
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
              <EditListingForm
                store={store}
                onBack={() => history.push("/")}
                onPreview={() => setIsEditing(false)}
              />
            </>
          ) : (
            <PreviewListing
              store={store}
              onBack={() => setIsEditing(true)}
              onPublish={onPublish}
            />
          )}
        </div>
        {status !== null && (
          <Snackbar
            open={openSnack}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
