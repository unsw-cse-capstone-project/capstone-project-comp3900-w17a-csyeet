import React from "react";
import {
  TextField,
  Typography,
  Paper,
  Button,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
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
    content: {
      position: "relative",
      boxSizing: "border-box",
      padding: "10px",
      minHeight: "150px",
    },
    editButton: {
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1),
    },
    editContent: {
      position: "relative",
      boxSizing: "border-box",
    },
  })
);

export const Blurb: React.FC<{
  blurb: string;
  onEdit: (blurb: string) => void;
  className?: string;
}> = ({ blurb, onEdit, className }) => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const classes = BlurbStyle();
  return (
    <div className={classNames(className, classes.root)}>
      <div className={classes.content}>
        {edit ? (
          <EditBlurb
            blurb={blurb}
            onEdit={onEdit}
            onBack={() => setEdit(false)}
            className={classes.editContent}
          />
        ) : (
          <>
            <IconButton
              style={{ position: "absolute", right: "0px", top: "0px" }}
              onClick={() => setEdit(true)}
              className={classes.editButton}
            >
              <EditIcon
                style={{ marginLeft: "2px", color: "#a9a9a9" }}
                fontSize={"small"}
              />
            </IconButton>
            <Typography>{blurb}</Typography>
          </>
        )}
      </div>
    </div>
  );
};

const EditBlurb: React.FC<{
  blurb: string;
  onEdit: (blurb: string) => void;
  onBack: () => void;
  className?: string;
}> = ({ blurb, onEdit, onBack, className }) => {
  const [value, setValue] = React.useState<string>(blurb);
  return (
    <div className={className}>
      <div
        style={{
          position: "relative",
          boxSizing: "border-box",
          padding: "10px",
          paddingLeft: "0px",
        }}
      >
        <IconButton
          onClick={onBack}
          style={{ position: "absolute", right: "0px", top: "0px" }}
        >
          <CloseIcon
            style={{ marginLeft: "2px", color: "#a9a9a9" }}
            fontSize={"small"}
          />
        </IconButton>
        <Typography variant="body1" style={{ marginBottom: "15px" }}>
          Update your bio
        </Typography>
        <TextField
          fullWidth
          label="User Blurb"
          variant="outlined"
          multiline
          rows="5"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setValue(e.target.value);
          }}
        />
      </div>
      <Button
        variant="contained"
        color={"primary"}
        // style={{ marginTop: "10px" }}
        onClick={() => {
          onEdit(value);
          onBack();
        }}
      >
        Update
      </Button>
    </div>
  );
};
