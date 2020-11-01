import { Button, Typography, useTheme } from "@material-ui/core";
import { observer } from "mobx-react";
import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  BidderRegistrationPresenter,
  BidderRegistrationStore,
} from "./BidderRegistrationPresenter";
import { BidderRegistration } from "./BidderRegistration";
import { bidderRegistrationStyle } from "./BidderRegistration.css";
import { ArrowBackIos } from "@material-ui/icons";
import { ListingActual } from "../ui/util/types/listing";

export const BidderRegistrationPage = () => {
  const { id } = useParams<{ id: string }>();
  const store = new BidderRegistrationStore();
  const presenter = new BidderRegistrationPresenter();
  presenter.loadInformation(store, parseInt(id));
  return (
    <BidderRegistrationWrapper
      store={store}
      onSubmit={(afterSubmit: () => void) =>
        presenter.submit(store, afterSubmit)
      }
    />
  );
};

export const BidderRegistrationWrapper = observer(
  ({
    store,
    onSubmit,
  }: {
    store: BidderRegistrationStore;
    onSubmit: (afterSubmit: () => void) => void;
  }) => {
    const theme = useTheme();
    const history = useHistory();
    if (!store.loadingState) {
      return null;
    }

    if (store.loadingState === "loading") {
      return <div>Loading</div>;
    }

    if (store.loadingState === "error" || !store.listing) {
      return <div>Error loading</div>;
    }

    const BidderRego = () => (
      <BidderRegistration
        store={store}
        listingId={(store.listing as ListingActual).id}
        onSubmit={onSubmit}
      />
    );

    const { id, street, suburb, postcode, state } = store.listing;
    const Container = ({ Content }: { Content: React.ComponentType }) => {
      const classes = bidderRegistrationStyle();
      return (
        <div className={classes.root}>
          <div className={classes.main}>
            <Button
              className={classes.backToListingButton}
              onClick={() => history.push("/listing/" + id)}
            >
              <ArrowBackIos />
              Back to Listing
            </Button>
            <Typography variant="h3" align="center">
              Register as a Bidder
            </Typography>
            <Typography variant="h5" align="center" className={classes.address}>
              {street}
              {", "}
              {suburb}
              {", "}
              <span style={{ textTransform: "uppercase" }}>{state}</span>{" "}
              {postcode}
            </Typography>
            <Content />
          </div>
        </div>
      );
    };

    if (new Date().getTime() >= store.listing.auction_end.getTime()) {
      const Content = () => (
        <Typography
          style={{ textAlign: "center", color: theme.palette.error.main }}
        >
          Auction Closed
        </Typography>
      );
      return <Container Content={Content} />;
    }

    if (new Date().getTime() >= store.listing.auction_start.getTime()) {
      const Content = () => (
        <Typography
          style={{ textAlign: "center", color: theme.palette.error.main }}
        >
          Auction has already commenced
        </Typography>
      );
      return <Container Content={Content} />;
    }

    return <Container Content={BidderRego} />;
  }
);
