import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const BidderRegistrationStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      padding: theme.spacing(2, "15%", 0, "15%"),
      boxSizing: "border-box",
    },
    main: {
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    body: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
    address: {
      textTransform: "capitalize",
      color: theme.palette.grey[500],
      margin: theme.spacing(2, 0, 3, 0),
    },
    backToListingButton: {
      marginBottom: theme.spacing(2),
    },
  })
);
