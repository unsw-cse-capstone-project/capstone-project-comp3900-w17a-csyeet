import { createStyles } from "@material-ui/core/styles";
import { Theme, makeStyles } from "@material-ui/core";
export const HeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      verticalAlign: "center",
      alignItems: "center",
      paddingBottom: theme.spacing(0.5),
      backgroundColor: "white",
    },
    home: {
      justifyContent: "flex-end",
      backgroundColor: "#f3f4f5",
    },
    signUpButton: {
      margin: "15px",
    },
    loggedInHeader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
    },
    addListingButton: {
      marginRight: "12px",
    },
  })
);
