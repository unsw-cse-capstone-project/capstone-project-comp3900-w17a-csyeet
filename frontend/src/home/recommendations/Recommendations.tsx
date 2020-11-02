import * as React from "react";
import { RecommendationsStore } from "./RecommendationsPresenter";
import {
  ListingCardSmall,
  ListingCardSmallPlaceholder,
} from "../../ui/base/listing_card_sm/ListingCardSmall";
import { observer } from "mobx-react";
import { Grid, IconButton, withWidth } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";
import { RecommendationsStyles } from "./Recommendations.css";

export const RecommendationNoWidth = observer(
  ({ store, width }: { store: RecommendationsStore; width: string }) => {
    const [page, setPage] = React.useState(0);
    const classes = RecommendationsStyles();
    if (store.state === "loading") {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ListingCardSmallPlaceholder />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ListingCardSmallPlaceholder />
          </Grid>
        </Grid>
      );
    }

    if (store.state === "error") {
      return <div>Error</div>;
    }

    const getNumOnPage = () => {
      switch (width) {
        case "xs":
          return 1;
        case "sm":
          return 2;
        case "md":
          return 3;
        case "lg":
          return 4;
        default:
          return 3;
      }
    };

    const numOnPage = getNumOnPage();

    if (page % numOnPage !== 0) {
      setPage((page) => page - (page % numOnPage));
    }

    return (
      <Grid container spacing={3} className={classes.root}>
        <IconButton
          className={classes.leftIcon}
          onClick={() => setPage((page) => page - numOnPage)}
          disabled={page - numOnPage < 0}
        >
          <ArrowBackIos></ArrowBackIos>
        </IconButton>
        <IconButton
          className={classes.rightIcon}
          disabled={page + numOnPage > store.recommendations.length - 1}
          onClick={() => setPage((page) => page + numOnPage)}
        >
          <ArrowForwardIos></ArrowForwardIos>
        </IconButton>
        <SwipeableViews
          index={page / numOnPage}
          className={classes.swipeableView}
        >
          {Array.from(
            Array(Math.ceil(store.recommendations.length / numOnPage))
          ).map((_, n) => (
            <div key={n}>
              {n === page / numOnPage ? (
                <Grid container spacing={3}>
                  {store.recommendations
                    .slice(page, page + numOnPage)
                    .map((listing, i) => (
                      <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                        <ListingCardSmall listing={listing} />
                      </Grid>
                    ))}
                </Grid>
              ) : null}
            </div>
          ))}
        </SwipeableViews>
      </Grid>
    );
  }
);

export const Recommendations = withWidth()(RecommendationNoWidth);
