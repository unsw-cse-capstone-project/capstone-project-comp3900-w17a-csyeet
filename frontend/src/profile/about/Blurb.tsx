import React from "react";
<<<<<<< HEAD
import { TextField, Typography, IconButton, Fab } from "@material-ui/core";
=======
import {
  TextField,
  Typography,
  IconButton,
  Button,
  Fab,
} from "@material-ui/core";
>>>>>>> e4436e63a5979a7596a89401b67f5303257c044a
import EditIcon from "@material-ui/icons/Edit";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import classNames from "classnames";

export const BlurbStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up("xs")]: {
        display: "flex",
      },
      display: "flex",
      flexDirection: "column",
    },

    blurbView: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      verticalAlign: "center",
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

export const Blurb = ({
  blurb,
  onEdit,
  className,
}: {
  blurb: string;
  onEdit: (blurb: string) => void;
  className?: string;
}) => {
  const onBack = () => setEdit(false);
  const [value, setValue] = React.useState<string>(blurb);
  const [edit, setEdit] = React.useState<boolean>(false);
  const classes = BlurbStyle();
  return (
    <div className={classNames(classes.root, className)}>
      {edit ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TextField
            size="small"
            variant={"outlined"}
            autoFocus={true}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "enter") {
                e.preventDefault();
                onEdit(value);
                onBack();
              }
            }}
          />
          <Fab
            size="small"
            color="primary"
            style={{ marginLeft: "5px" }}
            onClick={() => {
              onEdit(value);
              onBack();
            }}
          >
            <DoneIcon fontSize={"small"} />
          </Fab>
          <Fab
            style={{ marginLeft: "5px" }}
            size="small"
            color="default"
            onClick={onBack}
          >
            <CloseIcon fontSize="small" />
          </Fab>
        </div>
      ) : (
        <div className={classes.blurbView}>
          <div className={classes.blurbContainer}>
            <Typography variant="body2">{blurb}</Typography>
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
};
