import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const AddListingStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      padding: theme.spacing(0, "15%", "200px", "15%"),
      boxSizing: "border-box",
      overflow: "scroll",
      marginTop: "0px",
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
