import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const SearchPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    resultContainer: {
      flexGrow: 1,
      padding: theme.spacing(2, "15%", "200px", "15%"),
      overflow: "hidden",
    },
    page: {
      display: "flex",
      flexDirection: "column",
      paddingBottom: theme.spacing(12),
    },
    searchContainer: {
      width: "60%",
    },
    searchHeader: {
      position: "sticky",
      backgroundColor: "white",
      padding: "20px",
      zIndex: 5,
      top: "0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);
