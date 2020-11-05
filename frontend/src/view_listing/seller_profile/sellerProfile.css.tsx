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
      alignItems: "flexStart",
      margin: theme.spacing(0, 0, 0, 4),
    },
    name: {
      padding: theme.spacing(2, 0, 3, 0),
    },
    listings: {
      width: "95%",
      margin: theme.spacing(4, "auto", 0, "auto"),
    },
    listingTitle: {
      padding: theme.spacing(4, 0, 0, 0),
      margin: theme.spacing(0, 0, 0, 4),
    },
    meta: {
      display: "flex",
      flexDirection: "column",
    },
    modalImage: {
      width: "200px",
      height: "200px",
      margin: theme.spacing(0, 5, 0, 0),
    },
  })
);
