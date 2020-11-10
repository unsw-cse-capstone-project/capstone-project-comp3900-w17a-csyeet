import { Snackbar, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  BidderRegistrationPresenter,
  BidderRegistrationStore,
} from "./BidderRegistrationPresenter";
import { BidderRegistration } from "./BidderRegistration";
import { BidderRegistrationStyle } from "./BidderRegistration.css";
import { ListingActual } from "../ui/util/types/listing";
import { formatAddress } from "../ui/util/helper";
import ReactPlaceholder from "react-placeholder/lib";
import MuiAlert from "@material-ui/lab/Alert";
import { useStore } from "../AuthContext";
import { BackButton } from "../ui/base/back_button/BackButton";

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
      id={parseInt(id)}
    />
  );
};

export const BidderRegistrationWrapper = observer(
  ({
    store,
    onSubmit,
    id,
  }: {
    store: BidderRegistrationStore;
    onSubmit: (afterSubmit: () => void) => void;
    id: number;
  }) => {
    const history = useHistory();
    const userStore = useStore();
    if (!store.loadingState) {
      return null;
    }

    const HeaderOnlyContainer = ({
      Content,
    }: {
      Content: React.ComponentType;
    }) => {
      const classes = BidderRegistrationStyle();
      return (
        <div className={classes.root}>
          <div className={classes.main}>
            <BackButton
              className={classes.backToListingButton}
              onClick={() => history.push(`/listing/${id}`)}
              text="Back to Listing"
            />
            <Content />
          </div>
        </div>
      );
    };

    if (store.loadingState === "loading") {
      const Content = () => (
        <ReactPlaceholder showLoadingAnimation={true} type="text" ready={false}>
          {null}
        </ReactPlaceholder>
      );
      return <HeaderOnlyContainer Content={Content} />;
    }

    const Content = ({ message }: { message: string }) => (
      <Snackbar
        open={true}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert elevation={6} severity="error">
          {message}
        </MuiAlert>
      </Snackbar>
    );

    if (
      store.loadingState === "error" ||
      !store.listing ||
      !userStore ||
      !userStore.user
    ) {
      return (
        <HeaderOnlyContainer
          Content={() => (
            <Content message="Error while loading the page, please try again" />
          )}
        />
      );
    }

    const BidderRego = () => (
      <BidderRegistration
        store={store}
        listingId={(store.listing as ListingActual).id}
        onSubmit={onSubmit}
      />
    );

    const {
      street,
      suburb,
      postcode,
      state,
      owner,
      registered_bidder,
    } = store.listing;
    const { streetAddress, remainingAddress } = formatAddress({
      street,
      suburb,
      postcode,
      state,
    });

    const Container = ({ Content }: { Content: React.ComponentType }) => {
      const classes = BidderRegistrationStyle();
      return (
        <div className={classes.root}>
          <div className={classes.main}>
            <BackButton
              className={classes.backToListingButton}
              onClick={() => history.push(`/listing/${id}`)}
              text="Back to Listing"
            />
            <Typography variant="h3" align="center">
              Register as a Bidder
            </Typography>
            <Typography variant="h5" align="center" className={classes.address}>
              {streetAddress + ", " + remainingAddress}
            </Typography>
            <Content />
          </div>
        </div>
      );
    };

    if (owner.id === userStore.user.id) {
      return (
        <Container
          Content={() => (
            <Content message="The owner of the property cannot register as a bidder." />
          )}
        />
      );
    }

    if (registered_bidder) {
      return (
        <Container
          Content={() => (
            <Content message="You have already registered as a bidder." />
          )}
        />
      );
    }

    if (new Date().getTime() >= store.listing.auction_end.getTime()) {
      return <Container Content={() => <Content message="Auction Closed" />} />;
    }

    if (new Date().getTime() >= store.listing.auction_start.getTime()) {
      return (
        <Container
          Content={() => <Content message="Auction has already commenced" />}
        />
      );
    }

    return <Container Content={BidderRego} />;
  }
);
