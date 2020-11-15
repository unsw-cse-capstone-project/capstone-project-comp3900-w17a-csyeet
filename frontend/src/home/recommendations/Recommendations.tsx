import * as React from "react";
import { RecommendationsStore } from "./RecommendationsPresenter";
import { ListingCardSmall } from "../../ui/base/listing_card_sm/ListingCardSmall";
import { observer } from "mobx-react";
import {
  Grid,
  IconButton,
  withWidth,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";
import { RecommendationsStyles } from "./Recommendations.css";
import { getNumCards } from "../../ui/util/helper";
import { ListingCardSmallLoadingRow } from "../../ui/base/loading_state/ListingCardSmallLoadingRow";
import MuiAlert from "@material-ui/lab/Alert";

/**
 * Recommendations slider
 * @param store
 * @param width
 */
export const Recommendations = withWidth()(
  observer(
    ({ store, width }: { store: RecommendationsStore; width: string }) => {
      const [page, setPage] = React.useState(0);
      const classes = RecommendationsStyles();
      if (store.state === "loading") {
        return <ListingCardSmallLoadingRow />;
      }

      if (store.state === "error") {
        return (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={true}
            autoHideDuration={2000}
          >
            <MuiAlert elevation={6} severity="error">
              Error occurred while fetching your recommendations.
            </MuiAlert>
          </Snackbar>
        );
      }

      const numOnPage = getNumCards(width);

      if (page % numOnPage !== 0) {
        setPage((page) => page - (page % numOnPage));
      }

      if (store.recommendations.length === 0) {
        return (
          <Typography variant="body1" align="center" color="textSecondary" className={classes.emptyStateText}>
            Currently no recommendations, check back later
          </Typography>
        );
      }

      return (
        <Grid container spacing={3} className={classes.root}>
          <IconButton
            className={classes.leftIcon}
            onClick={() => setPage((page) => page - numOnPage)}
            disabled={page - numOnPage < 0}
          >
            <ArrowBackIos />
          </IconButton>
          <IconButton
            className={classes.rightIcon}
            disabled={page + numOnPage > store.recommendations.length - 1}
            onClick={() => setPage((page) => page + numOnPage)}
          >
            <ArrowForwardIos />
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
  )
);
