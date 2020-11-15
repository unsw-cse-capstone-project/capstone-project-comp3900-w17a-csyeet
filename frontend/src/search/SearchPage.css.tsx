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
      flex: 1,
      flexDirection: "column",
    },
    searchContainer: {
      width: "60%",
    },
    searchHeader: {
      position: "sticky",
      backgroundColor: "white",
      padding: theme.spacing(0.5, 2),
      zIndex: 5,
      top: "0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    searchFilters: {
      backgroundColor: "white",
    },
  })
);
