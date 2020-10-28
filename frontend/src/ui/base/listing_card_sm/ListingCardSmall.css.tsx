import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const ListingCardSmallStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      [theme.breakpoints.up("xs")]: {
        display: "flex",
      },
      width: "250px",
      height: "300px",
      display: "flex",
      flexDirection: "column",
    },
    cardContent: {
      position: "relative",
      boxSizing: "border-box",
      padding: "10px",
    },
    imageContainer: {
      width: "100%",
      height: "170px",
      objectFit: "contain",
      backgroundColor: "rgba(0,0,0, 0.8)",
    },

    sliderContainer: {
      [theme.breakpoints.up("xs")]: {
        width: "100%",
      },
      height: "170px",
    },
    starContainer: {
      position: "absolute",
      top: theme.spacing(1.5),
      right: theme.spacing(1.5),
    },

    panelContainer: {
      [theme.breakpoints.up("xs")]: {
        width: "60%",
      },
      display: "flex",
      flexDirection: "row",
    },
    panelContent: {
      display: "flex",
      flexDirection: "row",
      margin: "5px",
    },
    iconStyle: {
      color: "#33333",
      marginRight: "3px",
    },

    reserve_met: {
      color: theme.palette.success.main,
    },
    reserve_not_met: {
      color: theme.palette.success.main,
    },
  })
);
