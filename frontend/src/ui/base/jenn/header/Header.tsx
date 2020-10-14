import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { useHistory, useLocation } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import { useStore } from "../../../../AuthContext";
import { SignInStore } from "./sign_in/SignInStore";
import { SignUpStore } from "./sign_up/SignUpStore";
import { SignIn } from "./sign_in/SignIn";
import { SignUp } from "./sign_up/SignUp";
import logo from "../../../../images/logo.png";

export interface HeaderProps {
  signInStore: SignInStore;
  signUpStore: SignUpStore;
}

export const Header: React.FC<HeaderProps> = observer(
  ({ signInStore, signUpStore }) => {
    const history = useHistory();
    const location = useLocation();
    const store = useStore();
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
          marginLeft: "15px",
        }}
      >
        {location.pathname === "/" ? (
          <div></div>
        ) : (
          <img
            src={logo}
            style={{ width: "150px", margin: "15px" }}
            alt={"logo"}
            onClick={() => history.push("/")}
          />
        )}
        {!store.user ? (
          <div>
            {/* <Button
              size="medium"
              color="secondary"
              onClick={() => history.push("/add")}
            >
              Add a listing
            </Button> */}
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
