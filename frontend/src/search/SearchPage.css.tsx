import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const SearchPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    resultContainer: {
      flexGrow: 1,
      padding: theme.spacing(2, "15%", 0, "15%"),
      overflow: "hidden",
    },
    page: {
      display: "flex",
      flexDirection: "column",
    },
  })
);
