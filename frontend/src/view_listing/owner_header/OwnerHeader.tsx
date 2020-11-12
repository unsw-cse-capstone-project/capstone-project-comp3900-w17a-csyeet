import * as React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Theme,
  DialogActions,
  DialogContent,
  DialogContentText,
  useMediaQuery,
  Fab,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MessageIcon from "@material-ui/icons/Message";
import { useHistory } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { createStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar, useTheme } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import classNames from "classnames";

const OwnerStyle = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textAlign: "center",
    },
    listingHeader: {
      display: "flex",
      justifyContent: "flex-end",
    },
    deleteButton: {
      marginLeft: theme.spacing(1.5),
    },
    editButton: {
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.background.paper,
      marginLeft: theme.spacing(1.5),
      "&:hover": {
        backgroundColor: theme.palette.warning.dark,
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

/**
 * Header for actions that can be performed by the owner
 * including editing, deleting and viewing messages
 */
export const OwnerHeader = ({
  onDelete,
  id,
  isAuctionClosed,
  hasAuctionStarted,
}: {
  onDelete(): Promise<boolean>;
  isAuctionClosed: boolean;
  hasAuctionStarted: boolean;
  id: number;
}) => {
  const history = useHistory();
  const classes = OwnerStyle();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const onDeleteClick = () => {
    setConfirmDelete(true);
  };
  const onDeleteConfirmed = async () => {
    const isSuccessful = await onDelete();
    if (isSuccessful) {
      history.push("/");
    } else {
      setError("Error occurred while deleting listing, please try again");
    }
  };
  const onMessageClick = () => {
    history.push(`/listing/${id}/messages`);
  };
  const onEditClick = () => {
    // (jenn) Can update path
    history.push(`/listing/${id}/edit`);
  };
  return (
    <div className={classes.listingHeader}>
      <Fab
        color="primary"
        onClick={onMessageClick}
        variant={matches ? "extended" : undefined}
      >
        <MessageIcon
          className={classNames({ [classes["extendedIcon"]]: matches })}
        />
        {matches && "Messages"}
      </Fab>
      {!isAuctionClosed && (
        <Fab
          variant={matches ? "extended" : undefined}
          onClick={onEditClick}
          className={classes.editButton}
        >
          <EditIcon
            className={classNames({ [classes["extendedIcon"]]: matches })}
          />
          {matches && "Edit"}
        </Fab>
      )}
      {!hasAuctionStarted && (
        <Fab
          color="secondary"
          onClick={onDeleteClick}
          className={classes.deleteButton}
          variant={matches ? "extended" : undefined}
        >
          <DeleteIcon
            className={classNames({ [classes["extendedIcon"]]: matches })}
          />
          {matches && "Delete"}
        </Fab>
      )}
      <Dialog open={confirmDelete} onClick={() => setConfirmDelete(false)}>
        <DialogTitle className={classes.title}>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this listing?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={onDeleteConfirmed}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={!!error}
        onClose={() => setError(undefined)}
        autoHideDuration={2000}
      >
        <MuiAlert elevation={6} severity="error">
          {error}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
