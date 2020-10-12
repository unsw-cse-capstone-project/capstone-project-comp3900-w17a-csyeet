import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import Button from "@material-ui/core/Button";
import Logo from "../logo/Logo";
import SignInStore from "../../../sign_in/SignInStore";
import SignIn from "../../../sign_in/SignIn";
import SignUpStore from "../../../sign_up/SignUpStore";
import SignUp from "../../../sign_up/SignUp";
import { AuthConsumer } from "./AuthContext";

export interface HeaderProps {
  signInStore: SignInStore;
  signUpStore: SignUpStore;
}

const Header: React.FC<HeaderProps> = observer(
  ({ signInStore, signUpStore }) => {
    const openSignInForm = action(() => {
      signInStore.open = true;
    });

    const openSignUpForm = action(() => {
      signUpStore.open = true;
    });

    return (
      <AuthConsumer>
        {({ isAuth, userSignIn, userSignOut, userSignUp }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              verticalAlign: "center",
            }}
          >
            <Logo size="small" />
            {!isAuth ? (
              <div>
                <Button size="small" onClick={openSignInForm}>
                  Log In
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  style={{ margin: "15px" }}
                  onClick={openSignUpForm}
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <Button
                size="small"
                variant="outlined"
                color="primary"
                style={{ margin: "15px" }}
                onClick={userSignOut}
              >
                Sign out
              </Button>
            )}
            <SignIn store={signInStore} onSubmit={userSignIn} />
            <SignUp store={signUpStore} onSubmit={userSignUp} />
          </div>
        )}
      </AuthConsumer>
    );
  }
);

export default Header;
