import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { Button, Typography } from "@material-ui/core";
import { SignInStore } from "./SignInStore";
import { TextFieldWrapper } from "../../textfield_wrapper/TextFieldWrapper";
import { ModalWrapper } from "../../modal_wrapper/ModalWrapper";
import { PasswordInput } from "../../password_input/PasswordInput";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";

const success = (
  <Typography variant="h3" align="center" style={{ margin: "35px" }}>
    Logging you in...
  </Typography>
);

export interface SignInProps {
  onSubmit: (email: string, passwd: string) => void; // (Jenn) TODO: Update with API call
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

  return (
    <ModalWrapper open={store.open} onClose={closeModal}>
      <div className="formContainer">
        {store.success ? (
          <>{success} </>
        ) : (
          <>
            <Typography
              variant="h3"
              align="center"
              style={{ margin: "15px", marginBottom: "35px" }}
            >
              Sign In
            </Typography>
            <TextFieldWrapper
              field="email"
              label="Email"
              onChange={onChange}
              adornment={<AlternateEmailIcon />}
            />
            <PasswordInput value={store.passwd} onChange={onChange} />
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              style={{ marginTop: "10px" }}
              onClick={() => {
                onSubmit(store.email, store.passwd);
                closeModal();
              }}
            >
              Sign In
            </Button>
          </>
        )}
      </div>
    </ModalWrapper>
  );
});
