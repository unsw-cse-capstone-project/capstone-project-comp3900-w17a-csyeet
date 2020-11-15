import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const ListingMessagesPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      display: "flex",
      flexDirection: "column",
      paddingBottom: "200px",
      minHeight: "calc(100vh - 480px)",
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
