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

export const Header: React.FC<HeaderProps> = observer(
  ({ signInStore, signUpStore }) => {
    const history = useHistory();
    const location = useLocation();
    const store = useStore();
    const theme = useTheme();
    if (!store) throw Error("Store should never be null");
    const openSignUpModal = action(() => {
      signUpStore.open = true;
    });
    const openSignInModal = action(() => {
      signInStore.open = true;
    });
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          verticalAlign: "center",
          alignItems: "center",
          paddingBottom: theme.spacing(0.5),
        }}
      >
        {location.pathname === "/" ? (
          <div></div>
        ) : (
          <Logo size="small" onClick={() => history.push("/")} />
        )}
        {!store.user ? (
          <div>
            <Button size="small" onClick={openSignInModal}>
              Log In
            </Button>
            <Button
              size="small"
              variant="outlined"
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
          onSubmit={(email: string, password: string) =>
            store.signIn(email, password)
          }
        />
        <SignUp
          store={signUpStore}
          onSubmit={(email: string, password: string, name: string) =>
            store.signUp(email, password, name)
          }
        />
      </div>
    );
  }
);
