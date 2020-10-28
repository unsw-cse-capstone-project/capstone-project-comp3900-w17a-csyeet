import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { Button, Typography } from "@material-ui/core";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { SignInStore } from "./SignInStore";
import { TextFieldWrapper } from "../../textfield_wrapper/TextFieldWrapper";
import { ModalWrapper } from "../../modal_wrapper/ModalWrapper";
import { PasswordInput } from "../../password_input/PasswordInput";
import logo from "../../../../images/logo.png";
import { SignInStyles } from "./SignIn.css";

const success = (
  <Typography variant="h3" align="center" style={{ margin: "35px" }}>
    Logging you in...
  </Typography>
);

export interface SignInProps {
  onSubmit: (email: string, passwd: string) => void;
  store: SignInStore;
}

export const SignIn = observer(({ onSubmit, store }: SignInProps) => {
  const onChange = action((value: string, name: string) => {
    (store as any)[name] = value;
  });

  const closeModal = action(() => {
    store.open = false;
    store.success = false;
  });

  const classes = SignInStyles();
  return (
    <ModalWrapper open={store.open} onClose={closeModal}>
      <div className={classes.root}>
        <img
          width="200px"
          src={logo}
          alt="Adobe logo"
          style={{ marginBottom: "15px" }}
        />
        <Typography>Welcome back</Typography>

        <TextFieldWrapper
          field="email"
          label="Email"
          onChange={onChange}
          adornment={<AlternateEmailIcon style={{ color: "#7b7b7b" }} />}
        />
        <PasswordInput value={store.passwd} onChange={onChange} />
        <Button
          style={{ marginTop: "30px" }}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => {
            onSubmit(store.email, store.passwd);
            closeModal();
          }}
        >
          Sign In
        </Button>
      </div>
    </ModalWrapper>
  );
});
