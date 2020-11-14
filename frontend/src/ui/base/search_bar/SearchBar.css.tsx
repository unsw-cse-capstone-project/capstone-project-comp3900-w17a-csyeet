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
      [theme.breakpoints.only('xs')]: {
        flexDirection: 'column',
        alignItems: "center",
      },
      position: "relative",
    },
    formButton: {
      borderRadius: "1000px !important",
      padding: "0 30px",
      marginLeft: theme.spacing(1),
      [theme.breakpoints.only('xs')]: {
        height: theme.spacing(6),
        width: 'fit-content',
        marginLeft: theme.spacing(0),
        marginTop: theme.spacing(1),
      },
      textTransform: "capitalize",
    },
    formControl: {
      margin: theme.spacing(1, 1),
      minWidth: 120,
      backgroundColor: theme.palette.background.paper,
    },
    dateInput: {
      margin: theme.spacing(1, 1),
      minWidth: 120,
    },
    selectControl: {
      minWidth: "45%",
    },
    filterDropdown: {
      marginRight: "auto",
      marginTop: theme.spacing(2),
    },
    filters: {
      flexDirection: 'column',
    },
    filterRows: {
      width: "100%",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "space-between",
      display: 'flex',
      flexDirection: 'row',
    },
  })
);
