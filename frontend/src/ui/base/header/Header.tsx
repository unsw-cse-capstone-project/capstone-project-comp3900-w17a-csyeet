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
import { useTheme, Hidden } from "@material-ui/core";
import { UserMenu } from "./user_menu/UserMenu";
import { MinimisedSearch } from "./minimised_search/MinimisedSearch";
import classNames from "classnames";
import { HeaderStyles } from "./Header.css";

export interface HeaderProps {
  signInStore: SignInStore;
  signUpStore: SignUpStore;
}

const Header: React.FC<HeaderProps> = observer(
  ({ signInStore, signUpStore }) => {
    const history = useHistory();
    const store = useStore();
    const classes = HeaderStyles();
    if (!store) throw Error("Store should never be null");
    const openSignUpModal = action(() => {
      signUpStore.open = true;
    });
    const openSignInModal = action(() => {
      signInStore.open = true;
    });
    const location = useLocation();
    const isHome = location.pathname === "/";
    const isSearch = location.pathname.startsWith("/search");
    return (
      <div className={classNames(classes.root, { [classes["home"]]: isHome })}>
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
              className={classes.signUpButton}
              onClick={openSignUpModal}
            >
              Sign Up
            </Button>
          </div>
        ) : (
          <div className={classes.loggedInHeader}>
            <Hidden only="xs">{!isSearch && <MinimisedSearch />}</Hidden>
            <Hidden only="xs">
              <Button
                variant={"contained"}
                color={"secondary"}
                size="medium"
                className={classes.addListingButton}
                onClick={() => history.push("/add")}
              >
                Add Listing
              </Button>
            </Hidden>
            <UserMenu />
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
