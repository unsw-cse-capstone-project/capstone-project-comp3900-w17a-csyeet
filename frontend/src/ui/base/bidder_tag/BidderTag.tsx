import * as React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import classNames from 'classnames';
import { useStore } from '../../../AuthContext';
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bidderChip: {
      borderRadius: "3px",
      backgroundColor: theme.palette.text.primary,
      color: theme.palette.background.default,
      minWidth: theme.spacing(5),
    },
    user: {
      backgroundColor: theme.palette.secondary.main,
    }
  })
);

export const BidderTag = observer(({ bidderNumber }: { bidderNumber: number }) => {
  const classes = useStyles();
  const userStore = useStore();
  let isUser = false;
  if (userStore && userStore.user && userStore.user.id === bidderNumber) {
    isUser = true;
  }
  return (
    <Chip
      size="small"
      label={"# " + bidderNumber}
      className={classNames(classes.bidderChip, {[classes.user]: isUser})}
    />
  );
});
