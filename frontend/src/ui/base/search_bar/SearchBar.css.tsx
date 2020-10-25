import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const SearchBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    textInput: {
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
    formControl: {
      margin: theme.spacing(3, 1, 1, 1),
      minWidth: 120,
    },
    selectControl: {
      margin: theme.spacing(3, 1, 1, 1),
      minWidth: "47%",
    },
    filterDropdown: {
      marginRight: "auto",
      marginTop: theme.spacing(2),
    },
    filters: {
      width: "100%",
      justifyContent: "space-between",
    },
  })
);
