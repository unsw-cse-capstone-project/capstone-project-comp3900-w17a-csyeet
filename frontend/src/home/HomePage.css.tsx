import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const HomePageStyle = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flex: 1,
    },
    logo: {
      width: "200px",
    },
    top: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      position: "relative",
      padding: theme.spacing(15, 0, 25, 0),
    },
    background: {
      backgroundColor: "#f3f4f5",
      zIndex: -1,
      height: "calc(100% + 100px)",
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
      paddingBottom: theme.spacing(10)
    },
    upcomingAuctionTitle: {
      fontWeight: "bold",
      paddingBottom: theme.spacing(2),
    },
    recommendations: {
      display: "flex",
      paddingBottom: theme.spacing(12),
      width: "80%",
      "& .react-swipeable-view-container > div": {
        overflow: "visible !important",
      },

      "& > div > div": {
        overflow: "visible !important",
      }
    },
    recommendationsTitle: {
      paddingBottom: theme.spacing(2),
      width: "80%",
      "& h5": {
        fontWeight: "bold",
      }
    }
  })
);
