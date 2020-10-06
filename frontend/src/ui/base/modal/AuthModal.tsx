import React from "react";
import { observer } from "mobx-react";
import { ModalStore } from "../../../stores/ModalStore";
// import "./modal.css";

import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);
const classes = useStyles();

export interface AuthModalProps {
  store: ModalStore;
}

export const AuthModal: React.FC<AuthModalProps> = observer(({ store }) => (
  <Modal
    open={store.modalOpen}
    onClose={store.toggleModal}
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    className={classes.modal}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={store.modalOpen}>
      <div className={classes.paper}>
        <h2 id="transition-modal-title">Sign Up</h2>
        {store.modalType === "signup" && (
          <div>
            <h1>Sign Up</h1>
            <form noValidate autoComplete="off">
              <TextField id="standard-basic" label="Full Name" />
              <TextField id="standard-basic" label="Email" />
              <TextField id="standard-basic" label="Phone" />
              <br />
              <TextField id="standard-basic" label="Password" />
              <TextField id="standard-basic" label="Confirm Password" />
            </form>
          </div>
        )}

        {store.modalType === "signin" && (
          <div>
            <h1>Sign In</h1>
            <form noValidate autoComplete="off">
              <TextField id="standard-basic" label="Email" />
              <TextField id="standard-basic" label="Password" />
              <Button size="small" variant="outlined" color="primary">
                Sign in
              </Button>
            </form>
          </div>
        )}
      </div>
    </Fade>
  </Modal>
));
