import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const auctionDetailsStyle = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginTop: theme.spacing(2)
    },
    divider: {
      border: theme.palette.grey[700] + " solid 1px ",
      backgroundColor: theme.palette.grey[700],
      marginBottom: theme.spacing(1)
    }
  })
);
