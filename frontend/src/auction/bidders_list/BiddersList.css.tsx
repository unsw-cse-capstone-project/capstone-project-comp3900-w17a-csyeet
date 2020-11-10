import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const biddersListStyle = makeStyles((theme: Theme) =>
  createStyles({
    bidderContainer: {
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(2, 0),
    },
    you: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-end",
    },
    divider: {
      border: theme.palette.grey[700] + " solid 1px ",
      backgroundColor: theme.palette.grey[700],
    },
  })
);
