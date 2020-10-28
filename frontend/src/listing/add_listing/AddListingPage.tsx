import * as React from "react";
import { ListingPresenter } from "../ListingPresenter";
import { ListingStore } from "../ListingStore";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { action, computed } from "mobx";
import { Typography, Button, Container, Paper } from "@material-ui/core";
import { ListingForm } from "../listing_form/ListingForm";
import { PreviewListing } from "../PreviewListing";
import { AddListingStyles } from "./AddListing.css";
import { ArrowBackIos } from "@material-ui/icons";

export const AddListingPage = () => {
  const presenter = new ListingPresenter();
  const store = new ListingStore();
  const history = useHistory();
  const onSuccess = () => {
    history.push("/listing/" + store.id);
  };
  return (
    <AddListingWrapper
      store={store}
      onPublish={() => {
        presenter.publishListing(store, onSuccess);
        console.log("Publishing...");
      }}
    />
  );
};

const AddListingWrapper = observer(
  ({ store, onPublish }: { store: ListingStore; onPublish: () => void }) => {
    const onStatusChange = action((status: string) => {
      store.status = "editing";
    });

    const onPreview = () => onStatusChange("preview");

    const classes = AddListingStyles();
    return (
      <div className={classes.root}>
        {store.status === "preview" ? (
          <>
            <div className={classes.header}>
              <Button onClick={() => onStatusChange("editing")}>
                <ArrowBackIos />
                Back to Editing
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ margin: "10px" }}
                onClick={() => {
                  onStatusChange("publish");
                  onPublish();
                }}
              >
                Publish
              </Button>
              <PreviewListing store={store} />
            </div>
          </>
        ) : (
          <>
            <div className={classes.header}>
              <Typography variant="h3" style={{ marginBottom: "20px" }}>
                Add Listing
              </Typography>
              {store.canPreview ? (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: "10px" }}
                  onClick={onPreview}
                  disabled={store.canPreview}
                >
                  Preview
                </Button>
              ) : (
                <></>
              )}
            </div>
            <Paper className={classes.form}>
              <ListingForm store={store} />
            </Paper>
          </>
        )}
      </div>
    );
  }
);
