import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Logo from "../logo/Logo";
import { SignInStore } from "./sign_in/SignInStore";
import { SignUpStore } from "./sign_up/SignUpStore";
import { SignIn } from "./sign_in/SignIn";
import { SignUp } from "./sign_up/SignUp";
import { useStore } from "../../../AuthContext";
import { Typography, useTheme } from "@material-ui/core";

export interface HeaderProps {
  signInStore: SignInStore;
  signUpStore: SignUpStore;
}

const Header: React.FC<HeaderProps> = observer(
  ({ signInStore, signUpStore }) => {
    const history = useHistory();
    // const location = useLocation();
    const store = useStore();
    const theme = useTheme();
    if (!store) throw Error("Store should never be null");
    const openSignUpModal = action(() => {
      signUpStore.open = true;
    });
    const openSignInModal = action(() => {
      signInStore.open = true;
    });
    const location = useLocation();
    const isHome = location.pathname === '/';
    return (
      <div
        style={{
          display: "flex",
          justifyContent: isHome? "flex-end": "space-between",
          verticalAlign: "center",
          alignItems: "center",
          paddingBottom: theme.spacing(0.5),
          backgroundColor: isHome? "#f3f4f5": "none",
        }}
      >
        {!isHome && <Logo size="small" onClick={() => history.push("/")} />}
        {!store.user ? (
          <div>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              onClick={openSignInModal}
            >
              Log In
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              style={{ margin: "15px" }}
              onClick={openSignUpModal}
            >
              Sign Up
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">{store.user.name}</Typography>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              style={{ marginLeft: "15px" }}
              onClick={() => history.push("/messages")}
            >
              Message
            </Button>
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
          </div>
        )}
        <SignIn
          store={signInStore}
          onSubmit={(email: string, password: string, onError: () => void) =>
            store.signIn(email, password, onError)
          }
        />
        <SignUp
          store={signUpStore}
          onSubmit={(
            name: string,
            email: string,
            password: string,
            phone_number: string,
            street: string,
            suburb: string,
            postcode: string,
            state: string,
            country: string
          ) => {
            store.signUp(
              name,
              email,
              password,
              phone_number,
              street,
              suburb,
              postcode,
              state,
              country
            );
          }}
        />
      </div>
    );
  }
);

export default Header;
