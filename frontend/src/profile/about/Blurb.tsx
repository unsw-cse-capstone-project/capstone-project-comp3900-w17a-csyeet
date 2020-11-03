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
      alignItems: "flexStart",
      verticalAlign: "center",
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
      {edit ? (
        <EditBlurb
          blurb={blurb}
          onEdit={onEdit}
          onBack={() => setEdit(false)}
        />
      ) : (
        <div className={classes.blurbView}>
          <Typography variant="body2">{blurb}</Typography>
          <div style={{ marginBottom: "10px" }}>
            <IconButton onClick={() => setEdit(true)}>
              <EditIcon
                style={{
                  color: "#a9a9a9",
                }}
                fontSize={"small"}
              />
            </IconButton>
          </div>
        </div>
      )}
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
      <TextField
        size="small"
        style={{ display: "flex" }}
        variant={"outlined"}
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
