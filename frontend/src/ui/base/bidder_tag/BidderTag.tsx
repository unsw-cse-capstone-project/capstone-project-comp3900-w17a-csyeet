import * as React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bidderChip: {
      borderRadius: "3px",
      backgroundColor: theme.palette.text.primary,
      color: theme.palette.background.default,
      minWidth: theme.spacing(7),
    },
  })
);

export const BidderTag = ({ bidderNumber }: { bidderNumber: number }) => {
  const classes = useStyles();
  return (
    <Chip
      size="small"
      label={"#" + bidderNumber}
      className={classes.bidderChip}
    />
  );
};
