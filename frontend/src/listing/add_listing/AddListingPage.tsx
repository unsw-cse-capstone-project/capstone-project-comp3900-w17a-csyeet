import * as React from "react";
import { ListingPresenter } from "../ListingPresenter";
import { ListingStore } from "../ListingStore";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { action, computed } from "mobx";
import { Typography, Button } from "@material-ui/core";
import { ListingForm } from "../listing_form/ListingForm";
import { PreviewListing } from "../PreviewListing";
import { AddListingStyles } from "./AddListing.css";
import { ArrowBackIos } from "@material-ui/icons";

export const AddListingPage = () => {
  const presenter = new ListingPresenter();
  const store = new ListingStore();
  return (
    <AddListingWrapper
      store={store}
      onPublish={() => {
        //   presenter.publishListing();
        console.log("Publishing...");
      }}
    />
  );
};

const AddListingWrapper = observer(
  ({ store, onPublish }: { store: ListingStore; onPublish: () => void }) => {
    // const history = useHistory();
    const onStatusChange = action((status: string) => {
      store.status = "editing";
    });

    const onPreview = () => onStatusChange("preview");

    const classes = AddListingStyles();
    return (
      <div>
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
                  onPublish(); // TODO: Update props
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
            <ListingForm store={store} onPreview={onPreview} />
          </>
        )}
      </div>
    );
  }
);
