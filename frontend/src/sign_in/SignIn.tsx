import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { Button, Typography, IconButton } from "@material-ui/core";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import SignInStore from "./SignInStore";
import TextFieldWrapper from "../ui/base/textfield_wrapper/TextFieldWrapper";
import ModalWrapper from "../ui/base/modal_wrapper/ModalWrapper";
import PasswordInput from "../ui/base/password_input/PasswordInput";
// import SignInFormStyles from "./SignInForm.css";

const success = (
  <Typography variant="h3" align="center" style={{ margin: "35px" }}>
    Logging you in...
  </Typography>
);

export interface SignInProps {
  onSubmit: (email: string, passwd: string) => void; // (Jenn) TODO: Update with API call
  store: SignInStore;
}

const SignIn: React.FC<SignInProps> = observer(({ onSubmit, store }) => {
  const onChange = action((value: string, name: string) => {
    (store as any)[name] = value;
  });

  const closeModal = action(() => {
    store.open = false;
    store.success = false;
  });

  // (Jenn) Temporary Function
  const setSuccess = action(() => {
    store.success = true;
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
            <PasswordInput onChange={onChange} />
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              style={{ marginTop: "10px" }}
              onClick={() => {
                setSuccess();
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

export default SignIn;
