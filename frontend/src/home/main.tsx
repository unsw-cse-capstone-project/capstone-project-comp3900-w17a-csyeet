import { Typography } from "@material-ui/core";
import * as React from "react";
import logo from "../images/logo.png";
import { SearchBar } from "../ui/base/search_bar/SearchBar";
import { SearchStore } from "../search/SearchPresenter";
import { useHistory } from "react-router-dom";
import { HomePageStyle } from "./HomePage.css";

export const HomePage = () => {
  const store = new SearchStore();
  const history = useHistory();
  const onSubmit = () => history.push("/search?query=" + store.input);
  const classes = HomePageStyle();
  return (
    <div className={classes.page}>
      <img width="250px" src={logo} alt="Adobe logo"></img>
      <Typography variant="h4" style={{ margin: "15px 0" }}>
        Find your next Abode
      </Typography>
      <div className={classes.searchBar}>
        <SearchBar store={store} onSubmit={onSubmit} />
      </div>
    </div>
  );
};
