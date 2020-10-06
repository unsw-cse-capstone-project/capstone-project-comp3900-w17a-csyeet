import * as React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import { Typography } from "@material-ui/core";

export type BidPriceState =
  | "reserve_met"
  | "reserve_not_met"
  | "current"
  | "past";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bidPrice: {
      borderRadius: theme.spacing(10000),
      padding: theme.spacing(2, 4),
      textAlign: "center",
      color: theme.palette.background.default,
      minWidth: "min-content",
    },
    reserve_met: {
      backgroundColor: theme.palette.success.main,
    },
    reserve_not_met: {
      backgroundColor: theme.palette.error.main,
    },
    current: {
      backgroundColor: theme.palette.info.main,
    },
    past: {
      backgroundColor: theme.palette.warning.main,
    },
    bidderTagContainer: {
      position: "absolute",
      right: theme.spacing(-3.5),
      height: "100%",
      display: "flex",
      alignItems: "center",
      top: "0px",
    },
  })
);

export const BidPrice = ({
  price,
  state,
  className,
  style,
}: {
  price: number;
  state: BidPriceState;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const classes = useStyles();
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const formattedPrice = formatter.format(price);
  return (
    <Paper
      className={classNames(classes.bidPrice, classes[state], className)}
      style={style}
    >
      <Typography variant="h4">{formattedPrice}</Typography>
    </Paper>
  );
};

export const BidPriceWithBidderTag = ({
  BidPrice,
  BidderTag,
}: {
  BidPrice: React.ComponentType;
  BidderTag: React.ComponentType;
}) => {
  const classes = useStyles();
  return (
    <div style={{ position: "relative", minWidth: "min-content" }}>
      <BidPrice />
      <div className={classes.bidderTagContainer}>
        <BidderTag />
      </div>
    </div>
  );
};
