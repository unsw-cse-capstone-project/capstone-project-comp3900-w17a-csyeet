import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const SignInStyle = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      margin: "auto",
      marginTop: theme.spacing(2),
      width: "60%",
      [theme.breakpoints.down("xs")]: {
        width: "80%",
      },
    },
    dividerContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    divider: {
      flex: 1,
    },
    text: {
      padding: theme.spacing(0, 1),
    },
  })
);
