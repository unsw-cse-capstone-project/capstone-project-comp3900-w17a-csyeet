import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const AddListingStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    body: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  })
);
