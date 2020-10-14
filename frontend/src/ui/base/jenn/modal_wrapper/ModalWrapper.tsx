import React from "react";
import { Modal, Backdrop, Fade } from "@material-ui/core";
import ModalStyles from "./ModalWrapper.css";

export interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  open,
  onClose,
  children,
}) => {
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
      <div className={classes.modalContent}>
        <Fade in={open}>
          <div className={classes.paper}>{children}</div>
        </Fade>
      </div>
    </Modal>
  );
};
