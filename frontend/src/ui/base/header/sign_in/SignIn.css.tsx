import { makeStyles } from "@material-ui/core/styles";

export const SignInStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(2, "15%", 0, "15%"),
    boxSizing: "border-box",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  message: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
