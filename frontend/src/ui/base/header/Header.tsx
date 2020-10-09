import React, { useState } from "react";
import { observer } from "mobx-react";
import { action } from "mobx";

import Button from "@material-ui/core/Button";
import Logo from "../logo/Logo";
import UserStore from "../../../stores/UserStore";
import AuthForm from "../authForm/AuthForm";
import AuthStore, { AuthFormType } from "../../../stores/AuthStore";
import "./header.css";

export const Header: React.FC<{
  userStore: UserStore;
  // (Jenn) TODO: add searchStore
}> = observer(({ userStore }) => {
  let authStore = new AuthStore();
  const openForm = action((type: AuthFormType) => {
    authStore.formType = type;
    authStore.formOpen = true;
  });

  return (
    <>
      <header>
        <Logo size="small" />
        {userStore.usernm == null ? (
          <>
            <Button
              size="small"
              onClick={() => {
                openForm("signin");
              }}
            >
              Log In
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => {
                openForm("signup");
              }}
            >
              Sign Up
            </Button>
          </>
        ) : (
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={userStore.userSignOut}
          >
            Sign out
          </Button>
        )}
      </header>
      <AuthForm
        onSubmit={() => console.log("Submitted form")}
        store={authStore}
      />
    </>
  );
});

export default Header;
