import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const sellerProfileStyle = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(4, 0, 0, 0),
    },
    divider: {
      border: theme.palette.grey[700] + " solid 1px ",
      backgroundColor: theme.palette.grey[700],
      marginBottom: theme.spacing(1),
    },
    about: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: theme.spacing(0, 0, 2, 0),
    },
    name: {
      padding: theme.spacing(2, 0, 1, 0),
    },
    listings: {
      margin: theme.spacing(4, 2, 0, 2),
    },
    listingTitle: {
      margin: theme.spacing(0, 0, 0, 2),
    },
    modalImage: {
      width: "200px",
      height: "200px",
      margin: 0,
    },
    summaryInfo: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: theme.spacing(2, 0, 0, 0),
    },
    displayname: { paddingTop: "10px" },
    largeAvatar: {
      height: "100%",
      width: "100%",
      position: "absolute",
      top: 0,
    },
    avatarContainer: {
      width: "50%",
      paddingTop: "50%",
      position: "relative",
      [theme.breakpoints.only("sm")]: {
        width: "20%",
        paddingTop: "20%",
      },
    },
  })
);
