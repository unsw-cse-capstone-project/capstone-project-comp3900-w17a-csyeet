import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { Button, InputAdornment, Typography } from "@material-ui/core";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import SignInStore from "./SignInStore";
import SuccessView from "./SuccessView";
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
            <SuccessView />
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
  }
);

export default SignInForm;
