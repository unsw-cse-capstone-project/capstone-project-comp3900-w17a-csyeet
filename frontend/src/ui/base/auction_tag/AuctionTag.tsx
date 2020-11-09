import { makeStyles, Theme, createStyles, Chip } from "@material-ui/core";
import React from "react";
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bidderChip: {
      borderRadius: "3px",
      color: theme.palette.background.default,
      minWidth: theme.spacing(7),
    },
    preAuction: {
      backgroundColor: theme.palette.warning.main,
    },
    inAuction: {
      backgroundColor: theme.palette.success.main,
    },
    closedAuction: {
      backgroundColor: theme.palette.error.main,
    },
  })
);

/**
 * Tag that labels a property to show the state of the auction
 */
export const AuctionTag = ({
  start,
  end,
  className,
  style,
}: {
  start: Date;
  end: Date;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const classes = useStyles();
  let label = "Auction In Progress";
  let state = "inAuction";
  if (new Date().getTime() < start.getTime()) {
    state = "preAuction";
    label = "Pre-Auction";
  }

  if (new Date().getTime() >= end.getTime()) {
    state = "closedAuction";
    label = "Auction Closed";
  }
  return (
    <div className={className} style={style}>
      <Chip
        size="small"
        label={label}
        className={classNames(classes.bidderChip, (classes as any)[state])}
      />
    </div>
  );
};
