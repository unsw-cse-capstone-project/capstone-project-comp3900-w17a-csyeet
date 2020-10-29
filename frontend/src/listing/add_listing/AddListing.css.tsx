import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { PlayCircleFilledWhite } from "@material-ui/icons";

let height = window.innerHeight;
export const AddListingStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      padding: theme.spacing(2, "15%", "200px", "15%"),
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

    backToEditingButton: {
      width: "fit-content",
      marginBottom: theme.spacing(2),
    },
  })
);
