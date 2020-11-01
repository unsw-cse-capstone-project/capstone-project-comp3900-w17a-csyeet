import * as React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import { Typography } from "@material-ui/core";
import { priceFormatter } from "../../util/helper";
import { InfoPopup } from "../info_popup/InfoPopup";

export type BidPriceState =
  | "reserve_met"
  | "reserve_not_met"
  | "current"
  | "past";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    infoStyle: {
      position: "absolute",
      top: "0",
      right: "0",
    },
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
  bid,
  state,
  className,
  style,
  textType = "h4",
}: {
  bid?: number;
  state: BidPriceState;
  className?: string;
  style?: React.CSSProperties;
  textType?: "h4" | "h1" | "h2" | "h3" | "h5" | "h6";
}) => {
  const classes = useStyles();
  const formattedPrice = bid ? priceFormatter.format(bid) : "Unknown";
  const getInfo = () => {
    switch (state) {
      case "reserve_met":
        return "The current bid has met the reserve price";
      case "reserve_not_met":
        return "The current bid has not met the reserve price";
      case "current":
        return "There is no current bid";
      case "past":
        return "The final bid has met the reserve price";
      default:
        return "Unknown T-T";
    }
  };
  return (
    <div className={classes.root}>
      <Paper
        className={classNames(classes.bidPrice, classes[state], className)}
        style={style}
      >
        <Typography variant={textType}>{formattedPrice}</Typography>
      </Paper>
      <InfoPopup size="small" data={getInfo()} className={classes.infoStyle} />
    </div>
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
