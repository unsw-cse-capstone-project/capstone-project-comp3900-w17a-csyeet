import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const ListingMessagesPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 400px)",
      minHeight: "900px",
      [theme.breakpoints.down("sm")]: {
        minHeight: "800px",
      },
      marginBottom: "100px",
    },
    backButton: {
      width: "fit-content",
    },
    messageBox: {
      height: "70%",
      width: "100%",
    },
    title: {
      margin: theme.spacing(2),
      textAlign: "center",
      width: "100%",
    },
    buttonContainer: {
      padding: theme.spacing(2, "15%", 0, "15%"),
      width: "100%",
    },
  })
);
