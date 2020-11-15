import * as React from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { ListingPageStore, ListingPagePresenter } from "./ListingPagePresenter";
import { ListingPage as ListingPageBase } from "./ListingPage";
import { observer } from "mobx-react";
import { createSuburbPanelContent } from "./suburb_panel/create";
import { useStore } from "../AuthContext";
import { OwnerHeader } from "./owner_header/OwnerHeader";
import { ListingPagePlaceholder } from "./ListingPagePlaceholder";
import { BackButton } from "../ui/base/back_button/BackButton";
import { NotFoundPage } from "../error/main";
import { listingPageStyle } from "./ListingPage.css";
import {
  ErrorBoundaryComponent,
  ErrorBoundaryPage,
} from "../ui/base/error_boundary/ErrorBoundary";

export const ViewListingPage = () => {
  const { id } = useParams<{ id: string }>();
  const store = new ListingPageStore();
  const presenter = new ListingPagePresenter();
  presenter.loadInformation(store, parseInt(id));

  return (
    <ErrorBoundaryPage>
      <ListingPageWrapper store={store} presenter={presenter} />
    </ErrorBoundaryPage>
  );
};

/**
 * Page Component to show the details for a listing
 */
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
      return <NotFoundPage />;
    }

    const listing = store.listing;

    const Content = () => (
      <ListingPageBase
        listing={listing}
        SuburbPanelContent={createSuburbPanelContent(listing)}
      />
    );

    let Header: React.ComponentType | undefined;

    /**
     * Show the owner header is the current user is the same as the owner
     */
    if (userStore && userStore.user && userStore.user.id === listing.owner.id) {
      // eslint-disable-next-line react/display-name
      Header = () => (
        <ErrorBoundaryComponent>
          <OwnerHeader
            onDelete={() => presenter.deleteListing(listing.id)}
            id={listing.id}
            hasAuctionStarted={
              new Date().getTime() >= listing.auction_start.getTime()
            }
            isAuctionClosed={
              new Date().getTime() >= listing.auction_end.getTime()
            }
          />
        </ErrorBoundaryComponent>
      );
    }
    return <Container Content={Content} Header={Header} />;
  }
);
