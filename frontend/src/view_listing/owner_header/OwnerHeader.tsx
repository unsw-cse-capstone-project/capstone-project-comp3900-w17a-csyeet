import * as React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Theme,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MessageIcon from "@material-ui/icons/Message";
import { useHistory } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { createStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

const OwnerStyle = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textAlign: "center",
    },
    listingHeader: {
      display: "flex",
      justifyContent: "flex-end",
    },
    messageButton: {
        marginRight: theme.spacing(1.5),
    }
  })
);

export const OwnerHeader = ({
  onDelete,
  id,
}: {
  onDelete(): Promise<boolean>;
  id: number;
}) => {
  const history = useHistory();
  const classes = OwnerStyle();
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
  return (
    <div className={classes.listingHeader}>
      <Button
        onClick={onMessageClick}
        variant="contained"
        color="primary"
        size="small"
        startIcon={<MessageIcon />}
        className={classes.messageButton}
      >
        Messages
      </Button>
      <Button
        onClick={onDeleteClick}
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <Dialog open={confirmDelete} onClick={() => setConfirmDelete(false)}>
        <DialogTitle className={classes.title}>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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
