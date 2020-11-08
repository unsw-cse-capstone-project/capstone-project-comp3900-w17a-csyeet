import * as React from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { ListingPageStore, ListingPagePresenter } from "./ListingPagePresenter";
import { ListingPage as ListingPageBase } from "./ListingPage";
import { observer } from "mobx-react";
import { listingPageStyle } from "./ListingPage.css";
import { Snackbar } from "@material-ui/core";
import { createSuburbPanelContent } from "./suburb_panel/create";
import { useStore } from "../AuthContext";
import { OwnerHeader } from "./owner_header/OwnerHeader";
import MuiAlert from "@material-ui/lab/Alert";
import { ListingPagePlaceholder } from "./ListingPagePlaceholder";
import { BackButton } from "../ui/base/back_button/BackButton";

export const ViewListingPage = () => {
  const { id } = useParams<{ id: string }>();
  const store = new ListingPageStore();
  const presenter = new ListingPagePresenter();
  presenter.loadInformation(store, parseInt(id));

  return (
    <ListingPageWrapper store={store} presenter={presenter} />
  );
};

export const ListingPageWrapper = observer(
  ({
    store,
    presenter,
  }: {
    store: ListingPageStore;
    presenter: ListingPagePresenter;
  }) => {
    const userStore = useStore();
    if (!store.loadingState) {
      return null;
    }
    const location = useLocation();
    const history = useHistory();

    const Container = ({
      Header,
      Content,
    }: {
      Header?: React.ComponentType;
      Content: React.ComponentType;
    }) => {
      const classes = listingPageStyle();
      return (
        <div className={classes.page}>
          {/* If the previous location state is search, show a back to search button */}
          {location.state && (
            <BackButton
              onClick={() => history.push((location as any).state.from)}
              text="Back to Search"
            />
          )}
          {Header && <Header />}
          <Content />
        </div>
      );
    };

    if (store.loadingState === "loading") {
      return <Container Content={() => <ListingPagePlaceholder />} />;
    }

    if (store.loadingState === "error" || !store.listing) {
      const Content = () => (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
        >
          <MuiAlert elevation={6} severity="error">
            Error occurred while loading the page, please try again
          </MuiAlert>
        </Snackbar>
      );
      return <Container Content={Content} />;
    }

    const listing = store.listing;

    const SuburbPanelContentWrapper = createSuburbPanelContent(listing);
    const Content = () => {
      return (
        <ListingPageBase
          listing={listing}
          SuburbPanelContent={SuburbPanelContentWrapper}
        />
      );
    };

    let Header: React.ComponentType | undefined;

    /**
     * Show the owner header is the current user is the same as the owner
     */
    if (
      userStore &&
      userStore.user &&
      userStore.user.id === listing.owner.id
    ) {
      // eslint-disable-next-line react/display-name
      Header = () => (
        <OwnerHeader
          onDelete={() => presenter.deleteListing(listing.id)}
          id={listing.id}
        />
      );
    }
    return <Container Content={Content} Header={Header} />;
  }
);
