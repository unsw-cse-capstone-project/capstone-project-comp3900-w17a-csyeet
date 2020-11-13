import React from "react";
import { observer } from "mobx-react";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Logo from "../logo/Logo";
import { SignUpStore } from "./sign_up/SignUpStore";
import { SignIn } from "./sign_in/SignIn";
import { SignUp } from "./sign_up/SignUp";
import { SignInArgs, useStore, SignUpArgs, SignUpGoogleArgs } from '../../../AuthContext';
import { Hidden } from "@material-ui/core";
import { UserMenu } from "./user_menu/UserMenu";
import { MinimisedSearch } from "./minimised_search/MinimisedSearch";
import classNames from "classnames";
import { HeaderStyles } from "./Header.css";
import { Authentication } from "./authentication/Authentication";

export interface HeaderProps {
  signUpStore: SignUpStore;
}

const Header: React.FC<HeaderProps> = observer(({ signUpStore }) => {
  const history = useHistory();
  const [openModal, setOpenModal] = React.useState(false);
  const [signInMode, setSignInMode] = React.useState(true);
  const store = useStore();
  const classes = HeaderStyles();
  if (!store) throw Error("Store should never be null");
  const openSignUpModal = () => {
    setSignInMode(false);
    setOpenModal(true);
  };
  const openSignInModal = () => {
    setSignInMode(true);
    setOpenModal(true);
  };
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isSearch = location.pathname.startsWith("/search");

  const SignInWrapper = () => (
    <SignIn
      switchMode={() => setSignInMode(false)}
      onSubmit={(args: SignInArgs) => store.signIn(args)}
      closeModal={() => setOpenModal(false)}
    />
  );
  const SignUpWrapper = () => (
    <SignUp
      switchMode={() => setSignInMode(true)}
      store={signUpStore}
      onSubmitNormal={(args: SignUpArgs) => store.signUp(args)}
      onSubmitGoogle={(args: SignUpGoogleArgs) => store.signUpGoogle(args)}
      closeModal={() => setOpenModal(false)}
    />
  );
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
      <Authentication
        signInMode={signInMode}
        open={openModal}
        onClose={() => setOpenModal(false)}
        SignIn={SignInWrapper}
        SignUp={SignUpWrapper}
      />
    </div>
  );
});

export default Header;
