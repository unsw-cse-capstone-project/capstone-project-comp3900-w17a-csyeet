import React from "react";
import {
  TextField,
  Typography,
  IconButton,
  Fab,
  CircularProgress,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import classNames from "classnames";
import { ProfileStore } from "../ProfilePresenter";
import { action } from "mobx";
import { observer } from "mobx-react";

/**
 * Blurb component which displays the user's blurb on the profile. Allows
 * users to update and change blurb.
 * @param store
 * @param onEdit
 * @param className
 */
export const Blurb = observer(
  ({
    store,
    onEdit,
    className,
  }: {
    store: ProfileStore;
    onEdit: () => void;
    className?: string;
  }) => {
    const [edit, setEdit] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<string>(store.blurb);
    const classes = BlurbStyle();
    const onChange = action((value: string) => {
      (store as any).tmpBlurb = value;
    });

    if (store.loadingState === "loading") {
      return (
        <div className={classes.loadingView}>
          <CircularProgress color={"inherit"} size={20} />
        </div>
      );
    }

    return (
      <div className={classNames(classes.root, className)}>
        {edit ? (
          <div className={classes.editView}>
            <TextField
              size="small"
              variant={"outlined"}
              autoFocus={true}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
            />
            <Fab
              size="small"
              color="primary"
              style={{ marginLeft: "5px" }}
              onClick={() => {
                onEdit();
                setEdit(false);
              }}
            >
              <DoneIcon fontSize={"small"} />
            </Fab>
            <Fab
              style={{ marginLeft: "5px" }}
              size="small"
              color="default"
              onClick={() => setEdit(false)}
            >
              <CloseIcon fontSize="small" />
            </Fab>
          </div>
        ) : (
          <div className={classes.blurbView}>
            <div className={classes.blurbContainer}>
              <Typography variant="body2">{store.blurb}</Typography>
              <IconButton
                onClick={() => setEdit(true)}
                className={classes.editIcon}
              >
                <EditIcon fontSize={"small"} />
              </IconButton>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export const BlurbStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up("xs")]: {
        display: "flex",
      },
      display: "flex",
      flexDirection: "column",
    },
    loadingView: {
      alignItems: "center",
      marginTop: "10px",
    },

    blurbView: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      verticalAlign: "center",
    },
    editView: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    blurbContainer: {
      position: "relative",
    },
    editIcon: {
      position: "absolute",
      right: "-40px",
      top: "-20px",
      color: "#a9a9a9",
    },
  })
);
