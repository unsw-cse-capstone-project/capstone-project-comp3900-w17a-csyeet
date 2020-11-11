import React from "react";
import { TextField, Typography, IconButton, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
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

    blurbView: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      verticalAlign: "center",
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
  const [edit, setEdit] = React.useState<boolean>(false);
  const classes = BlurbStyle();
  return (
    <div className={classNames(classes.root, className)}>
      {edit ? (
        <EditBlurb
          blurb={blurb}
          onEdit={onEdit}
          onBack={() => setEdit(false)}
        />
      ) : (
        <div className={classes.blurbView}>
          <div style={{ position: "relative" }}>
            <Typography variant="body2">{blurb}</Typography>
            <IconButton
              onClick={() => {
                setEdit(true);
              }}
              style={{
                position: "absolute",
                right: "-40px",
                top: "-20px",
                color: "#a9a9a9",
              }}
            >
              <EditIcon fontSize={"small"} />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

const EditBlurb = ({
  blurb,
  onEdit,
  onBack,
  className,
}: {
  blurb: string;
  onEdit: (blurb: string) => void;
  onBack: () => void;
  className?: string;
}) => {
  const [value, setValue] = React.useState<string>(blurb);
  return (
<<<<<<< Updated upstream
    <div className={className}>
      <TextField
        size="small"
        style={{ display: "flex" }}
        variant={"outlined"}
        autoFocus={true}
        InputProps={{
          endAdornment: (
            <Button
              size={"small"}
              onClick={onBack}
              variant="contained"
              color="secondary"
            >
              Save
            </Button>
          ),
        }}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
=======
    <TextField
      size="small"
      className={className}
      style={{ display: "flex" }}
      variant={"outlined"}
      autoFocus={true}
      InputProps={{
        endAdornment: (
          <Button
            size={"small"}
            onClick={() => onEdit(value)}
            variant="contained"
            color="secondary"
          >
            Save
          </Button>
        ),
      }}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value)
      }
      onBlur={onBack}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onEdit(value);
          onBack();
>>>>>>> Stashed changes
        }
        onBlur={onBack}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onEdit(value);
          }
        }}
      />
    </div>
  );
};
