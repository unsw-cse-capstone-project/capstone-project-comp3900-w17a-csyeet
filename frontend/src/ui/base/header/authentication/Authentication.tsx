import * as React from "react";
import { ModalWrapper } from "../../modal_wrapper/ModalWrapper";

export const Authentication = ({
  signInMode,
  open,
  onClose,
  SignIn,
  SignUp,
}: {
  signInMode: boolean;
  open: boolean;
  onClose: () => void;
  SignIn: React.ComponentType;
  SignUp: React.ComponentType;
}) => (
  <ModalWrapper open={open} onClose={onClose}>
    {signInMode ? <SignIn /> : <SignUp />}
  </ModalWrapper>
);
