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

const Header = observer(() => {
  let signInStore = new SignInStore();
  const openSignInForm = action(() => {
    signInStore.open = true;
  });

  let signUpStore = new SignUpStore();
  const openSignUpForm = action(() => {
    signUpStore.open = true;
  });

  return (
    <AuthConsumer>
      {({ isAuth, userSignIn, userSignOut, userSignUp }) => (
        <>
          <header>
            <Logo size="small" />
            {isAuth ? (
              <>
                <Button size="small" onClick={openSignInForm}>
                  Log In
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={openSignUpForm}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <Button
                size="small"
                variant="outlined"
                color="primary"
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
});
