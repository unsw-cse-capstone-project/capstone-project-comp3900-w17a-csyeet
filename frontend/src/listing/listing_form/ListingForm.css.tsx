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
      paddingTop: "30px",
      zIndex: 5,
      top: "0",
    },
    headerContent: {
      display: "flex",
      flexDirection: "column",
    },
    body: {
      width: "100%",
      height: "1000px",
      padding: theme.spacing(0, "15%", "200px", "15%"),
      boxSizing: "border-box",
      overflow: "auto",
      marginTop: "0px",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    backToEditingButton: {
      width: "fit-content",
      marginBottom: theme.spacing(2),
    },
    headerButtons: {
      display: "flex",
      justifyContent: "space-between",
    },
    footer: {
      marginTop: "30px",
      display: "flex",
      justifyContent: "center",
    },
  })
);
