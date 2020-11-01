import { Typography } from "@material-ui/core";
import * as React from "react";
import logo from "../images/logo.png";
import { SearchBar } from "../ui/base/search_bar/SearchBar";
import { SearchStore } from "../search/SearchPresenter";
import { useHistory } from "react-router-dom";
import { HomePageStyle } from "./HomePage.css";
import { createUpcomingAuction } from './upcoming_auctions/create';

export const HomePage = () => {
  const store = new SearchStore();
  const history = useHistory();
  const onSubmit = () => history.push("/search?query=" + store.input);
  const classes = HomePageStyle();
  const UpcomingAuctions = createUpcomingAuction();
  return (
    <div className={classes.page}>
      <div className={classes.top}>
      <img width="250px" src={logo} alt="Adobe logo"></img>
      <Typography variant="h5" style={{ margin: "15px 0" }}>
        Find your next Abode
      </Typography>
      <div className={classes.searchBar}>
        <SearchBar store={store} onSubmit={onSubmit} />
      </div>
      <div className={classes.background}></div>
      </div>
      <div className={classes.upcomingAuctionContainer}>
        <Typography variant="h5" className={classes.upcomingAuctionTitle}>Upcoming Auctions</Typography>
        <UpcomingAuctions />
      </div>
    </div>
  );
};
