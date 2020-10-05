import * as React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    countBox: {
      padding: theme.spacing(2),
      borderRadius: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    countBoxContainer: {
      margin: theme.spacing(2),
      textAlign: "center",
    },
  })
);

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
  const classes = useStyles();
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

  const timeStuff = getTimeStuff(timeLeftMs);

  return (
    <div style={{ display: "flex" }}>
      {Object.keys(timeStuff).map((label) => (
        <div className={classes.countBoxContainer} key={label}>
          <Paper className={classes.countBox}>
            <Typography variant="body1">
              {label === "days"
                ? timeStuff[label]
                : maybePrependZero(timeStuff[label])}
            </Typography>
          </Paper>
          <Typography variant="body2">{label}</Typography>
        </div>
      ))}
    </div>
  );
});
