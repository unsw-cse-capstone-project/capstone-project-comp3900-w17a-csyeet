import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import { ListingPageStore, ListingPagePresenter } from "./listingPagePresenter";
import { ListingPage as ListingPageBase } from "./listingPage";
import { observer } from "mobx-react";
import { listingPageStyle } from "./listingPage.css";
import { Button, Typography, useTheme } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import { useStore } from "../AuthContext";

export const ViewListingPage = () => {
  const { query } = useParams<{ query: string }>();
  const store = new ListingPageStore();
  const presenter = new ListingPagePresenter();
  presenter.loadInformation(store);

  return <ListingPageWrapper store={store} query={query} />;
};

export const ListingPageWrapper = observer(
  ({ store, query }: { store: ListingPageStore; query: string }) => {
    if (!store.loadingState) {
      return null;
    }

    const userStore = useStore();
    const Container = ({ Content }: { Content: React.ComponentType }) => {
      const classes = listingPageStyle();
      const history = useHistory();
      return (
        <div className={classes.page}>
          <Button
            className={classes.backButton}
            onClick={() => history.push(`/search?query=${query}`)}
          >
            <ArrowBackIos />
            Back to Search
          </Button>
          <Content />
        </div>
      );
    };

    if (store.loadingState === "loading") {
      const Content = () => <Typography>Loading...</Typography>;
      return <Container Content={Content} />;
    }

    if (store.loadingState === "error" || !store.listing) {
      const theme = useTheme();
      const Content = () => (
        <Typography
          style={{ textAlign: "center", color: theme.palette.error.main }}
        >
          Error loading the listing page
        </Typography>
      );
      return <Container Content={Content} />;
    }

    const listing = store.listing;

    const Content = () => {
      return <ListingPageBase listing={listing} />;
    };

    return <Container Content={Content} />;
  }
);
