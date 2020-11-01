import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const ListingCardAuctionStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
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
      flexDirection: "column",
    },
    bidPriceStyle: {
      borderRadius: theme.spacing(200),
      padding: theme.spacing(1, 1),
    },
    auctionTagStyle: {
      position: "absolute",
      top: theme.spacing(1),
      left: theme.spacing(1),
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
