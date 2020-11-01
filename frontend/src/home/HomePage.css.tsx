import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const HomePageStyle = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(15, 0, 12, 0),
    },
    top: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      position: "relative",
    },
    background: {
      backgroundColor: "#f3f4f5",
      zIndex: -1,
      height: "calc(100% + 250px + 120px)",
      position: "absolute",
      top: theme.spacing(-15),
      width: "100%",
    },
    searchBar: {
      width: "80%",
      [theme.breakpoints.up("sm")]: {
        width: "70%",
      },
      [theme.breakpoints.up("md")]: {
        width: "50%",
      },
    },
    upcomingAuctionContainer: {
      width: "80%",
      paddingTop: theme.spacing(12),
    },
    upcomingAuctionTitle: {
      fontWeight: "bold",
      paddingBottom: theme.spacing(2),
    },
  })
);
