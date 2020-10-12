import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import Button from "@material-ui/core/Button";
import Logo from "../logo/Logo";
import SignInStore from "../signInForm/SignInStore";
import SignInForm from "../signInForm/SignInForm";
import SignUpStore from "../signUpForm/SignUpStore";
import SignUpForm from "../signUpForm/SignUpForm";
import { AuthConsumer } from "../../authContext/AuthContext";
// import "./header.css";
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
          <>
            <header>
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
            </header>
            <SignInForm store={signInStore} onSubmit={userSignIn} />
            <SignUpForm store={signUpStore} onSubmit={userSignUp} />
          </>
        )}
      </AuthConsumer>
    );
  }
);

export default Header;
