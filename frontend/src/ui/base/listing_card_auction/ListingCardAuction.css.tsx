import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const ListingCardAuctionStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      [theme.breakpoints.up("xs")]: {
        display: "flex",
      },
      display: "flex",
      flexDirection: "column",
      position: "relative",
    },
    cardContent: {
      position: "relative",
      boxSizing: "border-box",
      padding: "10px",
    },
    imageContainer: {
      width: "100%",
      height: "160px",
      objectFit: "contain",
      backgroundColor: "rgba(0,0,0, 0.8)",
    },

    sliderContainer: {
      [theme.breakpoints.up("xs")]: {
        width: "100%",
      },
      height: "160px",
    },
    starContainer: {
      position: "absolute",
      top: theme.spacing(1.5),
      right: theme.spacing(1.5),
    },
    bidPriceContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    bidPriceStyle: {
      width: "100%",
      borderRadius: theme.spacing(200),
      padding: theme.spacing(1, 1),
      marginTop: "5px",
    },
    auctionTagStyle: {
      position: "absolute",
      top: theme.spacing(2),
      left: theme.spacing(2),
      marginTop: "2px",
      marginBottom: "2px",
    },
    reserve_met: {
      color: theme.palette.success.main,
    },
    reserve_not_met: {
      color: theme.palette.success.main,
    },
    link: {
      cursor: "pointer",
      "&:hover": {
        color: theme.palette.primary.main,
        textDecoration: "none",
        "& p": {
          color: theme.palette.primary.main,
        },
      },
      textDecoration: "none",
    },
  })
);
