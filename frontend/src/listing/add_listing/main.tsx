import * as React from "react";
import { ListingPresenter } from "../ListingPresenter";
import { ListingStore } from "../ListingStore";
import { useHistory } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import { ListingForm } from "../listing_form/ListingForm";
import { PreviewListing } from "../PreviewListing";
import { AddListingStyles } from "./AddListing.css";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { observer } from "mobx-react";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const AddListingPage = () => {
  const presenter = new ListingPresenter();
  const store = new ListingStore();
  return <AddListingPageBase store={store} />;
};

export const AddListingPageBase = observer(
  ({ store }: { store: ListingStore }) => {
    const history = useHistory();
    const [status, setStatus] = React.useState<string | null>(null);
    const [openSnack, setOpen] = React.useState<boolean>(false);
    const [isEditing, setIsEditing] = React.useState<boolean>(true);
    const classes = AddListingStyles();
    const onSuccess = () => {
      setStatus("success");
      history.push("/listing/" + store.id);
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

    return (
      <>
        <div className={classes.root}>
          <div className={classes.main}>
            {isEditing ? (
              <ListingForm
                store={store}
                onBack={() => history.push("/")}
                onPreview={() => setIsEditing(false)}
              />
            ) : (
              <PreviewListing
                store={store}
                onBack={() => setIsEditing(true)}
                onPublish={onSuccess}
              />
            )}
          </div>
        </div>
        {status !== null && (
          <Snackbar
            open={openSnack}
            autoHideDuration={1500}
            onClose={() => {
              setOpen(false);
              setStatus(null);
            }}
          >
            {snackContent(status)}
          </Snackbar>
        )}
      </>
    );
  }
);
