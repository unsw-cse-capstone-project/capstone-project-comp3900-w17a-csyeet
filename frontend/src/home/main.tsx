import { Typography } from "@material-ui/core";
import * as React from "react";
import logo from "../images/logo.png";
import { SearchBar } from "../ui/base/search_bar/SearchBar";
import { SearchStore } from "../search/SearchPresenter";
import { HomePageStyle } from "./HomePage.css";
import { createUpcomingAuction } from "./upcoming_auctions/create";
import { observer } from "mobx-react";
import { useStore } from "../AuthContext";
import { Recommendations as RecommendationsBase } from "./recommendations/create";
import {
  ErrorBoundaryComponent,
  ErrorBoundaryPage,
} from "../ui/base/error_boundary/ErrorBoundary";

/**
 * Home page for Abode
 * Includes search bar with filters, upcoming auctions and recommendations
 */

export const HomePage = () => {
  const Recommendations = ({ isLoggedIn }: { isLoggedIn: boolean }) => (
    <ErrorBoundaryComponent>
      <RecommendationsBase isLoggedIn={isLoggedIn} />
    </ErrorBoundaryComponent>
  );
  const UpcomingAuctions = createUpcomingAuction();
  return (
    <ErrorBoundaryPage>
      <HomePageBase
        Recommendations={Recommendations}
        UpcomingAuctions={UpcomingAuctions}
      />
    </ErrorBoundaryPage>
  );
};

export const HomePageBase = observer(
  ({
    Recommendations,
    UpcomingAuctions,
  }: {
    Recommendations: React.ComponentType<{ isLoggedIn: boolean }>;
    UpcomingAuctions: React.ComponentType;
  }) => {
    const store = new SearchStore();
    const classes = HomePageStyle();
    const userStore = useStore();
    return (
      <div className={classes.page}>
        <div className={classes.top}>
          <img
            width="250px"
            src={logo}
            alt="Adobe logo"
            className={classes.logo}
          ></img>
          <Typography
            variant="h5"
            color="textSecondary"
            style={{ margin: "15px 0" }}
          >
            Find your next Abode
          </Typography>
          <div className={classes.searchBar}>
            <SearchBar store={store} />
          </div>
          <div className={classes.background}></div>
        </div>
        {userStore?.user && (
          <div className={classes.recommendationsTitle}>
            <Typography variant="h5">Recommended For You</Typography>
          </div>
        )}
        <div className={classes.recommendations}>
          <Recommendations isLoggedIn={!!userStore?.user} />
        </div>
        <div className={classes.upcomingAuctionContainer}>
          <Typography variant="h5" className={classes.upcomingAuctionTitle}>
            Upcoming Auctions
          </Typography>
          <UpcomingAuctions />
        </div>
      </div>
    );
  }
);
