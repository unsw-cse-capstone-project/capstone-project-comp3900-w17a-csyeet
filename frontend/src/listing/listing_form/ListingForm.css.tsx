import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const ListingFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    tabContainer: {
      flexGrow: 1,
      marginTop: "15px",
      marginBottom: "15px",
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
