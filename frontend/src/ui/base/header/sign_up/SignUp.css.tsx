import { makeStyles } from "@material-ui/core/styles";

export const SignUpStyles = makeStyles((theme) => ({
  logo: {
    margin: "auto",
    marginTop: theme.spacing(2),
    width: "60%",
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  main: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
    height: "250px",
  },
  backButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(-1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepper: {
    padding: theme.spacing(2, 0, 0, 0),
  },
  actionButtons: {
    display: "flex",
    justifyContent: "center",
  },
  switch: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
