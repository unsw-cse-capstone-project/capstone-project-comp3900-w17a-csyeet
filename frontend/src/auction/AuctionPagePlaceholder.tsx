import * as React from "react";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import ReactPlaceholder from "react-placeholder/lib";

const AuctionPagePlaceholderStyle = makeStyles((theme: Theme) =>
  createStyles({
    photoGrid: {
      [theme.breakpoints.up("md")]: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        justifyContent: "space-between",
      },
      "& div": {
        objectFit: "cover",
        [theme.breakpoints.up("md")]: {
          width: "100% !important",
          height: "49% !important",
        },
        [theme.breakpoints.down("sm")]: {
          width: "49% !important",
          height: "200px !important",
        },
      },
    },
    root: { display: "flex !important", flexDirection: "column" },
    titleLoader: { height: "100px !important" },
    leftLoader: { width: "100% !important", height: "400px !important" },
    rightLoader: { width: "100% !important", height: "400px !important" },
  })
);

export const AuctionPagePlaceholder = () => {
  const classes = AuctionPagePlaceholderStyle();
  return (
    <div className={classes.root}>
      <ReactPlaceholder
        type="text"
        showLoadingAnimation={true}
        ready={false}
        className={classes.titleLoader}
        rows={2}
        color="#E0E0E0"
      >
        {null}
      </ReactPlaceholder>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5} xl={4}>
          <ReactPlaceholder
            type="rect"
            showLoadingAnimation={true}
            ready={false}
            className={classes.leftLoader}
            color="#E0E0E0"
          >
            {null}
          </ReactPlaceholder>
        </Grid>
        <Grid item xs={12} lg={7} xl={8}>
          <ReactPlaceholder
            type="rect"
            showLoadingAnimation={true}
            ready={false}
            className={classes.rightLoader}
            color="#E0E0E0"
          >
            {null}
          </ReactPlaceholder>
        </Grid>
      </Grid>
    </div>
  );
};
