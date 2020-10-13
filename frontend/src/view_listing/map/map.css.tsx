import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const mapStyle = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(4, 0, 0, 0)
    },
    divider: {
      border: theme.palette.grey[700] + " solid 1px ",
      backgroundColor: theme.palette.grey[700],
      margin: theme.spacing(0, 0, 1, 0)
    }
  })
);
