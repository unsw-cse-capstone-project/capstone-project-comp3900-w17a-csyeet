import { makeStyles } from "@material-ui/core/styles";

export const SignUpStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "15px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
    height: "250px",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
}));
