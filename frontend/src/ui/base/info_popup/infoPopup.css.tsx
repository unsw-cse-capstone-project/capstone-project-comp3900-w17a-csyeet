import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
export const infoStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
    },
    popupContent: {
      padding: theme.spacing(1, "10%", 1, "10%"),
      display: "flex",
      flexDirection: "column",
    },
  })
);
