import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import AuthStore from "../../../stores/AuthStore";
import "./AuthForm.css";
import { Button } from "@material-ui/core";
import Input from "../input/Input";

export type AuthFormType = "signin" | "signup";

export type FormData = {
  usernm: string | null;
  phoneNo: string | null;
  email: string | null;
  password: string | null;
};

export interface AuthFormProps {
  type: AuthFormType;
  onSubmit?: (formType: AuthFormType, formData: FormData) => void;
}

export const AuthForm: React.FC<AuthFormProps> = observer(
  ({ type, onSubmit }) => {
    const authStore = new AuthStore();
    return (
      <div className="formContainer">
        {type == "signin" && (
          <div>
            <h2>Sign In</h2>
            <Input
              label="Email"
              value={authStore.email}
              onChange={action((e: React.ChangeEvent<HTMLInputElement>) => {
                authStore.email = e.target.value;
              })}
            />
            <Input
              label="Password"
              value={authStore.passwd}
              onChange={action((e: React.ChangeEvent<HTMLInputElement>) => {
                authStore.passwd = e.target.value;
              })}
            />
            <div className="submitButton">
              <Button
                className="submitButton"
                variant="outlined"
                color="primary"
                onClick={() => {
                  authStore.userSignIn(authStore.email, authStore.passwd);
                }}
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
        {type == "signup" && (
          <div>
            <h1>Sign Up</h1>
            <br />
            <Input
              label="Full Name"
              value={authStore.usernm}
              onChange={action((e: React.ChangeEvent<HTMLInputElement>) => {
                authStore.usernm = e.target.value;
              })}
            />
            <Input
              label="Email"
              value={authStore.email}
              onChange={action((e: React.ChangeEvent<HTMLInputElement>) => {
                authStore.email = e.target.value;
              })}
            />
            <Input
              label="Phone Number"
              value={authStore.phoneNo}
              onChange={action((e: React.ChangeEvent<HTMLInputElement>) => {
                authStore.phoneNo = e.target.value;
              })}
            />
            <br />
            <Input
              label="Password"
              value={authStore.passwd}
              onChange={action((e: React.ChangeEvent<HTMLInputElement>) => {
                authStore.passwd = e.target.value;
              })}
            />
            <Input
              label="Confirm Password"
              value={authStore.passwdVerify}
              onChange={action((e: React.ChangeEvent<HTMLInputElement>) => {
                authStore.passwdVerify = e.target.value;
              })}
            />

            <div className="submitButton">
              <Button
                variant="outlined"
                color="primary"
                className="submitButton"
                onClick={() => {
                  authStore.userSignUp(
                    "Jennifer",
                    "12345",
                    "sth@email.com",
                    "password",
                    "password"
                  );
                }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default AuthForm;
