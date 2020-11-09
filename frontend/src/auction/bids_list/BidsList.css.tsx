import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const bidsListStyle = makeStyles((theme: Theme) =>
  createStyles({
    bidContainer: {
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(2, 0),
      [theme.breakpoints.only("xs")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    bidTime: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-end",
      maxWidth: "40%",
      textAlign: "right",
      [theme.breakpoints.only("xs")]: {
        flexDirection: "column",
        maxWidth: "100%",
        marginTop: theme.spacing(1),
        textAlign: "center",
        alignItems: "center",
      },
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
