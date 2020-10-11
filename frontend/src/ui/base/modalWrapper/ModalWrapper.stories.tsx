import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import ModalWrapper from "./ModalWrapper";
import Button from "@material-ui/core/Button";

export default {
  title: "ui/base/Modal",
  component: ModalWrapper,
} as Meta;

export const Overview = () => {
  const onClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <ModalWrapper open={open} onClose={onClose}>
        <p>Modal Content</p>
      </ModalWrapper>
    </>
  );
};
