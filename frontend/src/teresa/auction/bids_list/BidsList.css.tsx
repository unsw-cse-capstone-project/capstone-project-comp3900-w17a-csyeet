import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const bidsListStyle = makeStyles((theme: Theme) =>
  createStyles({
    bidContainer: {
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(2, 0),
    },
    bidTime: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-end",
      maxWidth: "40%",
      textAlign: "right",
    },
    reserveLabel: {
      color: theme.palette.success.main,
    },
    divider: {
      border: theme.palette.grey[700] + " solid 1px ",
      backgroundColor: theme.palette.grey[700],
    },
  })
);
