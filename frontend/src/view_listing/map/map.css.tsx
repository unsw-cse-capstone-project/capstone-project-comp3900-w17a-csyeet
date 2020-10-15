import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const mapStyle = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(4, 0, 0, 0),
    },
    divider: {
      border: theme.palette.grey[700] + " solid 1px ",
      backgroundColor: theme.palette.grey[700],
      margin: theme.spacing(0, 0, 1, 0),
    },
    mapContainer: {
      display: "inline-block",
      height: 0,
      paddingBottom: "100%",
      width: "100%",
      position: "relative",
    },
    map: {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
    }
  })
);
