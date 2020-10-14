import { makeStyles } from "@material-ui/core/styles";

export const SignUpStyles = makeStyles((theme) => ({
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
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
