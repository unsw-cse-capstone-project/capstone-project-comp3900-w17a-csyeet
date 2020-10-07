import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const paymentStepStyle = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
      justifyContent: "center",
      minHeight: theme.spacing(50),
    },
    currentBid: {
      margin: theme.spacing(4, 0),
      textAlign: "center",
    },
  })
);
