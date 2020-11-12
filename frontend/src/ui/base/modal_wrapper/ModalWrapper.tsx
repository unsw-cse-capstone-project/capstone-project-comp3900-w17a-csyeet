import React from "react";
import { Modal, Backdrop, Fade } from "@material-ui/core";
import ModalStyles from "./ModalWrapper.css";

type ModalWrapperProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const ModalWrapper = ({
  open,
  onClose,
  children,
}: ModalWrapperProps) => {
  const classes = ModalStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>{children}</div>
      </Fade>
    </Modal>
  );
};
