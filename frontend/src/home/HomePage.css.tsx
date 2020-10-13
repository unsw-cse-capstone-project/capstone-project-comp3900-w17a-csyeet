import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const HomePageStyle = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "70%",
    },
    searchBar: {
      width: "50%",
    },
  })
);
