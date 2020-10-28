import * as React from "react";
import { useParams } from "react-router-dom";
import { ListingPageStore, ListingPagePresenter } from "./listingPagePresenter";
import { ListingPage as ListingPageBase } from "./listingPage";
import { observer } from "mobx-react";
import { listingPageStyle } from "./listingPage.css";
import { Typography, useTheme } from "@material-ui/core";
import { createSuburbPanelContent } from './suburb_panel/create';
import { useStore } from '../AuthContext';
import { OwnerHeader } from './owner_header/OwnerHeader';

export const ViewListingPage = () => {
  const { id } = useParams<{ id: string }>();
  const store = new ListingPageStore();
  const presenter = new ListingPagePresenter();
  presenter.loadInformation(store, parseInt(id));

  return <ListingPageWrapper store={store} id={parseInt(id)} presenter={presenter} />;
};

export const ListingPageWrapper = observer(
  ({ store, presenter }: { store: ListingPageStore; id: number; presenter: ListingPagePresenter }) => {
    const userStore = useStore();
    if (!store.loadingState) {
      return null;
    }

    // const userStore = useStore();
    const Container = ({ Header, Content }: { Header?: React.ComponentType, Content: React.ComponentType }) => {
      const classes = listingPageStyle();
      return (
        <div className={classes.page}>
          {Header && <Header />}
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
    
    const SuburbPanelContentWrapper = createSuburbPanelContent(listing);
    const Content = () => {
      return <ListingPageBase listing={listing} SuburbPanelContent={SuburbPanelContentWrapper}/>;
    };
    let Header: React.ComponentType | undefined;
    if (userStore && userStore.user && userStore.user.email === listing.owner.email) {
      // eslint-disable-next-line react/display-name
      Header = () => <OwnerHeader onDelete={presenter.deleteListing} id={listing.id}/>;
    }
    return <Container Content={Content} Header={Header}/>;
  }
);
