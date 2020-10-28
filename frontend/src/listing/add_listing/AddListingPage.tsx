import * as React from "react";
import { ListingPresenter } from "../ListingPresenter";
import { ListingStore, Status } from "../ListingStore";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { action, computed, runInAction } from "mobx";
import { Typography, Button, Paper } from "@material-ui/core";
import { ListingForm } from "../listing_form/ListingForm";
import { PreviewListing } from "../PreviewListing";
import { AddListingStyles } from "./AddListing.css";
import { ArrowBackIos, SentimentSatisfiedAlt } from "@material-ui/icons";

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
      onBack={() => history.push("/")}
    />
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
