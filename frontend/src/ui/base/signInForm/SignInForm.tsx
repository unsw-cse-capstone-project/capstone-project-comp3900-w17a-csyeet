import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { Button, InputAdornment, Typography } from "@material-ui/core";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import SignInStore from "./SignInStore";
import AuthSuccessView from "../authSuccessView/AuthSuccessPage";
import TextFieldWrapper from "../textFieldWrapper/TextFieldWrapper";
import ModalWrapper from "../modalWrapper/ModalWrapper";
// import SignInFormStyles from "./SignInForm.css";

export interface SignInFormProps {
  onSubmit: (email: string, passwd: string) => void; // (Jenn) TODO: Update with API call
  store: SignInStore;
}

const SignInForm: React.FC<SignInFormProps> = observer(
  ({ onSubmit, store }) => {
    const onChange = action((value: string, name: string) => {
      (store as any)[name] = value;
    });

    const closeModal = action(() => {
      store.open = false;
    });

    // (Jenn) Temporary Function
    const setSuccess = action(() => {
      store.success = true;
    });

    return (
      <ModalWrapper open={store.open} onClose={closeModal}>
        <div className="formContainer">
          {store.success ? (
            <AuthSuccessView />
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
                adornment={
                  <InputAdornment position="end">
                    <AlternateEmailIcon />
                  </InputAdornment>
                }
              />
              <TextFieldWrapper
                field="passwd"
                label="Password"
                onChange={onChange}
                adornment={
                  <InputAdornment position="end">
                    <VpnKeyOutlinedIcon />
                  </InputAdornment>
                }
              />
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                style={{ marginTop: "10px" }}
                onClick={() => {
                  setSuccess(); // (Jenn) Run onSubmit(); instead of setting success to true.
                  setTimeout(() => {
                    closeModal();
                  }, 800);
                }}
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </ModalWrapper>
    );
  }
);

export default SignInForm;
