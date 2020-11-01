import * as React from "react";
import { RecommendationsStore } from "./RecommendationsPresenter";
import { ListingCardSmall } from "../../ui/base/listing_card_sm/ListingCardSmall";
import { observer } from "mobx-react";
import { Grid, Icon, IconButton, withWidth } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";

export const RecommendationNoWidth = observer(
  ({ store, width }: { store: RecommendationsStore; width: string }) => {
    const [page, setPage] = React.useState(0);
    if (store.state === "loading") {
      return <div>Loading</div>;
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

    // if (page % numOnPage != 0) {
    //   setPage((page) => page - (page % numOnPage));
    // }

    return (
      <div style={{ position: "relative", padding: "0 75px" }}>
        <IconButton
          style={{
            position: "absolute",
            left: "0",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={() => setPage((page) => page - numOnPage)}
          disabled={page - numOnPage < 0}
        >
          <ArrowBackIos></ArrowBackIos>
        </IconButton>
        <IconButton
          style={{
            position: "absolute",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          disabled={page + numOnPage > store.recommendations.length - 1}
          onClick={() => setPage((page) => page + numOnPage)}
        >
          <ArrowForwardIos></ArrowForwardIos>
        </IconButton>
        <SwipeableViews
        index={page}>
          {Array.from(
            Array(Math.ceil(store.recommendations.length / numOnPage))
          ).map((_, n) => (
            <div key={n} style={{position: "relative"}}>
              {n === page ? (
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
          {/* {store.recommendations
            .slice(page, page + numOnPage)
            .map((listing, i) => (
              <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                <ListingCardSmall listing={listing} />
              </Grid>
            ))} */}
        </SwipeableViews>
      </div>
    );
  }
);

export const Recommendations = withWidth()(RecommendationNoWidth);
