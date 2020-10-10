import React from "react";
import { Modal, Backdrop, Fade } from "@material-ui/core";
import ModalStyles from "./ModalWrapper.css";

interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
}
const ModalWrapper: React.FC<ModalWrapperProps> = ({
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
      closeAfterTransition
      BackdropComponent={Backdrop}
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

export default ModalWrapper;
