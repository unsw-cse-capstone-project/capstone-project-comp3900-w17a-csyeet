import * as React from "react";
import { ListingPresenter } from "../ListingPresenter";
import { ListingStore } from "../ListingStore";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { Button, Snackbar } from "@material-ui/core";
import { ListingForm } from "../listing_form/ListingForm";
import { PreviewListing } from "../PreviewListing";
import { AddListingStyles } from "./AddListing.css";
import { ArrowBackIos } from "@material-ui/icons";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { wait } from "@testing-library/react";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const AddListingPage = () => {
  const presenter = new ListingPresenter();
  const store = new ListingStore();
  const history = useHistory();
  const [status, setStatus] = React.useState<string | null>(null);
  const [openSnack, setOpen] = React.useState<boolean>(false);
  const onSuccess = () => {
    setStatus("success");
    history.push("/listing/" + store.id);
  };

  const onError = () => {
    setStatus("error");
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
      <AddListingWrapper
        store={store}
        onPublish={() => {
          setStatus("publishing");
          presenter.publishListing(store, onSuccess, onError);
        }}
        onBack={() => history.push("/")}
      />
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
};

const AddListingWrapper = observer(
  ({
    store,
    onPublish,
    onBack,
  }: {
    store: ListingStore;
    onPublish: () => void;
    onBack: () => void;
  }) => {
    const [status, setStatus] = React.useState<string>("edit");
    const classes = AddListingStyles();
    return (
      <div className={classes.root}>
        <div className={classes.main}>
          <div className={classes.header}>
            <Button
              className={classes.backToEditingButton}
              onClick={() => {
                status === "edit" ? onBack() : setStatus("edit");
              }}
            >
              <ArrowBackIos />
              Back {status === "preview" && "to editing"}
            </Button>
          </div>
          {status === "edit" ? (
            <ListingForm store={store} onPreview={() => setStatus("preview")} />
          ) : (
            <PreviewListing store={store} onPublish={onPublish} />
          )}
        </div>
      </div>
    );
  }
);
