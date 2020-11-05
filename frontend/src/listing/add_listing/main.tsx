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
    const [isEditing, setIsEditing] = React.useState<boolean>(true);
    const classes = AddListingStyles();
    const onSuccess = () => {
      setStatus("publishing");
      presenter.publishListing(
        store,
        () => {
          setOpen(true);
          setStatus("success");
          history.push("/listing/" + store.id);
        },
        () => {
          setOpen(true);
          setStatus("error");
        }
      );
    };

    const snackContent = (status: string) => {
      switch (status) {
        case "success":
          return <MuiAlert severity="success">Successfully published</MuiAlert>;
        case "publishing":
          return (
            <MuiAlert severity="info">Publishing your listing...</MuiAlert>
          );
        case "error":
          return (
            <MuiAlert severity="error">There was an error publishing</MuiAlert>
          );
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
      </>
    );
  }
);
