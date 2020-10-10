import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const listingPageStyle = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      padding: theme.spacing(2, "15%", 0, "15%"),
      display: "flex",
      flexDirection: "column",
    },
    backButton: {
      width: "fit-content",
    },
    streetAddress: {
      textTransform: "capitalize",
      marginTop: theme.spacing(2),
    },
    secondaryAddress: {
      textTransform: "capitalize",
      color: theme.palette.grey[500],
    },
    auctionTime: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(3, 0, 5, 0),
    },
    auctionText: {
      marginBottom: theme.spacing(1),
      color: theme.palette.grey[700],
    },
    mainImage: {
      width: "100%",
      height: "100%",
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
    biddingInfo: {
      marginTop: theme.spacing(3),
    },
    auctionClosed: {
      color: theme.palette.error.main,
      padding: theme.spacing(3, 0, 3, 0),
    },
  })
);
