import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const AuthFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      height: "400px",
      width: "400px",
    },
  })
);

export default AuthFormStyles;
