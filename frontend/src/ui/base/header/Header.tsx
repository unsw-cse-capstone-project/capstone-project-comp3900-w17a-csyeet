import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import Button from "@material-ui/core/Button";
import Logo from "../logo/Logo";
import SignInStore from "../sign_in/SignInStore";
import SignUpStore from "../sign_up/SignUpStore";
import SignIn from "../sign_in/SignIn";
import SignUp from "../sign_up/SignUp";
import { useStore } from "../../../AuthContext";
import { useHistory, useLocation } from "react-router-dom";

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

    const location = useLocation();
    const store = useStore();
    if (!store) throw Error("Store should never be null");
    const history = useHistory();
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          verticalAlign: "center",
        }}
      >
        {location.pathname === "/" ? <div></div> : <Logo size="small" />}
        {!store.user ? (
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
            onClick={() => {
              store.signOut();
              history.push("/");
            }}
          >
            Sign out
          </Button>
        )}
        <SignIn store={signInStore} onSubmit={() => store.signIn} />
        <SignUp store={signUpStore} onSubmit={() => store.signUp} />
      </div>
    );
  }
);

export default Header;
