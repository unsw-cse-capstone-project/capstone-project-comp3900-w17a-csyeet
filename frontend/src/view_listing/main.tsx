import * as React from "react";
import { useParams } from "react-router-dom";
import { ListingPageStore, ListingPagePresenter } from "./listingPagePresenter";
import { ListingPage as ListingPageBase } from "./listingPage";
import { observer } from "mobx-react";
import { listingPageStyle } from "./listingPage.css";
import { Typography, useTheme } from "@material-ui/core";
import { SuburbPanelPresenter, SuburbPanelStore } from './suburb_panel/suburbPanelPresenter';
import { SuburbPanelContent } from './suburb_panel/suburbPanelContent';

export const ViewListingPage = () => {
  const { id } = useParams<{ id: string }>();
  const store = new ListingPageStore();
  const presenter = new ListingPagePresenter();
  presenter.loadInformation(store, parseInt(id));

  return <ListingPageWrapper store={store} id={parseInt(id)} />;
};

export const ListingPageWrapper = observer(
  ({ store, id }: { store: ListingPageStore; id: number }) => {
    if (!store.loadingState) {
      return null;
    }

    // const userStore = useStore();
    const Container = ({ Content }: { Content: React.ComponentType }) => {
      const classes = listingPageStyle();
      // const history = useHistory();
      return (
        <div className={classes.page}>
          {/* <Button
            className={classes.backButton}
            onClick={() => history.push(`/search?query=}`)}
          >
            <ArrowBackIos />
            Back to Search
          </Button> */}
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

    const suburbPanelStore = new SuburbPanelStore();
    const suburbPanelPresenter = new SuburbPanelPresenter();
    suburbPanelPresenter.loadSuburbInformation(suburbPanelStore, listing.suburb, listing.state, listing.postcode, listing.num_bedrooms);

    const SuburbPanelContentWrapper = observer(() => <SuburbPanelContent store={suburbPanelStore}/>);
    const Content = () => {
      return <ListingPageBase listing={listing} SuburbPanelContent={SuburbPanelContentWrapper}/>;
    };

    return <Container Content={Content} />;
  }
);
