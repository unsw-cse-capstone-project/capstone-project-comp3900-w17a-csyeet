import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const confirmationStepStyle = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
      justifyContent: "center",
    },
    text: {
      marginBottom: theme.spacing(3),
      width: "80%",
    },
  })
);
