import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { Button, Typography, InputAdornment } from "@material-ui/core";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import SignUpStore from "./SignUpStore";
import AuthSuccessView from "../authSuccessView/AuthSuccessPage";
import TextFieldWrapper from "../textFieldWrapper/TextFieldWrapper";
import ModalWrapper from "../modalWrapper/ModalWrapper";
// import SignUpFormStyles from "./SignUpForm.css";

export interface SignUpFormProps {
  onSubmit: (
    usernm: string,
    email: string,
    phoneNo: string,
    passwd: string,
    passwdVerify: string
  ) => void; // (Jenn) TODO: Update with API call
  store: SignUpStore;
}

const SignUpForm: React.FC<SignUpFormProps> = observer(
  ({ onSubmit, store }) => {
    const onChange = action((value: string, name: string) => {
      (store as any)[name] = value;
    });

    const closeModal = action(() => {
      store.open = false;
    });

    // Temporary Function
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
                Sign Up
              </Typography>

              <TextFieldWrapper
                field="usernm"
                label="Full Name"
                onChange={onChange}
                adornment={
                  <InputAdornment position="end">
                    <PersonOutlineOutlinedIcon />
                  </InputAdornment>
                }
              />
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
                field="phoneNo"
                label="Phone Number"
                onChange={onChange}
                adornment={
                  <InputAdornment position="end">
                    <PhoneAndroidOutlinedIcon />
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
              <TextFieldWrapper
                field="passwdVerify"
                label="Confirm Password"
                onChange={onChange}
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
                Sign Up
              </Button>
            </>
          )}
        </div>
      </ModalWrapper>
    );
  }
);

export default SignUpForm;
