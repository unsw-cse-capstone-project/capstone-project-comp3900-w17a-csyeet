import * as React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    countDownContainer: { display: "flex", alignItems: "center" },
    countBox: {
      padding: theme.spacing(2, 3),
      [theme.breakpoints.only("xs")]: {
        padding: theme.spacing(1, 2),
      },
      borderRadius: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    countBoxContainer: {
      margin: theme.spacing(0, 2),
      [theme.breakpoints.only("xs")]: {
        margin: theme.spacing(0, 1),
      },
      textAlign: "center",
      position: "relative",
    },
    countBoxContainerWithSeparator: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),

      textAlign: "center",
      display: "flex",
    },
    separatorBox: {
      padding: theme.spacing(1, 0),
      background: "none",
    },
    labelText: {
      position: "absolute",
      bottom: "-20px",
      width: "100%",
      textAlign: "center",
    },
  })
);

/** 
 * Countdown Component that will countdown by itself
 */
export const Countdown = observer((props: { date: Date }) => {
  let store: { currentTime: number } = observable({
    currentTime: new Date().getTime(),
  });
  React.useEffect(() => {
    const interval = setInterval(
      action(() => (store.currentTime = new Date().getTime())),
      1000
    );
    return () => clearInterval(interval);
  });
  let timeLeftMs = props.date.getTime() - store.currentTime;

  const maybePrependZero = (num: number) => {
    return ("0" + num).slice(-2);
  };
  const getTimeStuff = (ms: number) => {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    ms -= days * 24 * 60 * 60 * 1000;
    const hours = Math.floor(ms / (60 * 60 * 1000));
    ms -= hours * 60 * 60 * 1000;
    const minutes = Math.floor(ms / (60 * 1000));
    ms -= minutes * 60 * 1000;
    const seconds = Math.floor(ms / 1000);
    ms -= seconds * 1000;
    return { days, hours, minutes, seconds };
  };
  const classes = useStyles();
  if (timeLeftMs < 0) {
    timeLeftMs = 0;
  }
  const timeStuff = getTimeStuff(timeLeftMs);

  return (
    <div className={classes.countDownContainer}>
      <CountdownBox num={timeStuff.days} label="days" />
      <CountdownBox num={maybePrependZero(timeStuff.hours)} label="hours" />
      <Paper
        elevation={0}
        className={classNames(classes.countBox, classes.separatorBox)}
      >
        <Typography variant="h5">:</Typography>
      </Paper>
      <CountdownBox num={maybePrependZero(timeStuff.minutes)} label="minutes" />
      <Paper
        elevation={0}
        className={classNames(classes.countBox, classes.separatorBox)}
      >
        <Typography variant="h5">:</Typography>
      </Paper>
      <CountdownBox num={maybePrependZero(timeStuff.seconds)} label="seconds" />
    </div>
  );
});

const CountdownBox = ({
  num,
  label,
}: {
  num: number | string;
  label: string;
}) => {
  const classes = useStyles();
  return (
    <div className={classes.countBoxContainer}>
      <Paper className={classes.countBox}>
        <Typography variant="body1">{num}</Typography>
      </Paper>
      <Typography className={classes.labelText} variant="body2">
        {label}
      </Typography>
    </div>
  );
};
