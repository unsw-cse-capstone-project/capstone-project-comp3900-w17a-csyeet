import { makeStyles } from "@material-ui/core/styles";

export const SignInStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(2, "10%", 0, "10%"),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2, "5%", 0, "5%"),
    },
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  message: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
