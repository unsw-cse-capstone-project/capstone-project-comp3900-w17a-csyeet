import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const ListingFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabContainer: {
      flexGrow: 1,
      marginTop: "15px",
      marginBottom: "15px",
    },
    header: {
      position: "sticky",
      backgroundColor: "white",
      padding: "20px",
      zIndex: 5,
      top: "0",
    },
    headerContent: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "30px",
    },
    body: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
  })
);
