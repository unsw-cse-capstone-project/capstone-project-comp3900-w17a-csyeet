import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const AddListingStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "1000px",
      padding: theme.spacing(0, "15%", "200px", "15%"),
      boxSizing: "border-box",
      marginTop: "0px",
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0, "5%", "200px", "5%"),
      },
    },
    main: {
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      position: "relative",
    },
    header: {
      position: "sticky",
      backgroundColor: "white",
      padding: "20px",
      zIndex: 10,
      top: "0",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
  })
);
