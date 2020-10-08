import React, { useState } from "react";
import { observer } from "mobx-react";
import { action } from "mobx";

import Button from "@material-ui/core/Button";
import Logo from "../logo/Logo";
import UserStore from "../../../stores/UserStore";
import { AuthForm, AuthFormType } from "../authForm/AuthForm";
import { Modal } from "@material-ui/core";
import "./header.css";

export interface HeaderProps {
  userStore: UserStore;
  search?: boolean;
}

export const Header: React.FC<HeaderProps> = observer(
  ({ userStore, search = false }) => {
    // const [modalState, setModalState] = useState<boolean>(true);
    const openModal = action((formType: AuthFormType) => {
      console.log("Opening modal...");
      return (
        <div>
          Hellooooo
          {/* <Modal
            open={modalState}
            onClose={() => setModalState(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <AuthForm type={formType} onSubmit={userStore.submitForm} />
          </Modal> */}
        </div>
      );
    });

    return (
      <header>
        <div className="headerContainer">
          {search ? <div></div> : <Logo size="small" />}
          <div>
            {userStore.usernm == null ? (
              <Button
                size="small"
                variant="outlined"
                onClick={action(() => {
                  userStore.userSignOut();
                })}
              >
                Sign Out
              </Button>
            ) : (
              <>
                {/* <SearchBar size="mini" onSearch={onSearch} */}
                {/* <Button size="small" variant="contained" color="secondary">
              Add a listing
              </Button> */}
                {/* <SearchBar size="mini" searchStore={searchStore} /> */}
                <Button size="small" onClick={() => openModal("signin")}>
                  Log In
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => openModal("signup")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
    );
  }
);

export default Header;
