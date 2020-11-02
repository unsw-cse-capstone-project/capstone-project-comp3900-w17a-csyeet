import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const SearchBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    textInput: {
      borderRadius: "1000px",
      backgroundColor: theme.palette.background.paper,
      "& *": {
        borderRadius: "1000px",
      },
    },
    form: {
      display: "flex",
      position: "relative",
    },
    formButton: {
      borderRadius: "1000px",
      padding: "0 30px",
      marginLeft: theme.spacing(1),
      textTransform: "capitalize",
    },
  })
);
