import * as React from "react";
import { Button, Dialog, DialogTitle, Typography, Theme, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createStyles } from '@material-ui/core/styles';

const OwnerStyle = makeStyles((theme: Theme) => createStyles({
})); 

export const OwnerHeader = ({ onDelete }: { onDelete(): void }) => {
  const history = useHistory();
  const classes = OwnerStyle();
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const onDeleteClick = () => {
    setConfirmDelete(true);
  };
  const onDeleteConfirmed = async () => {
    await onDelete();
    history.push("/");
  };
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        onClick={onDeleteClick}
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <Dialog open={confirmDelete} onClick={() => setConfirmDelete(false)}>
        <DialogTitle style={{textAlign: "center"}}>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this listing?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={onDeleteConfirmed} color="secondary" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
