import React from "react";

import Button from "@material-ui/core/Button";
import "./header.css";

export interface HeaderProps {
  user?: string | null;
  search?: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  search = false,
  onLogin,
  onLogout,
  onCreateAccount,
}) => (
  <header>
    <div className="wrapper">
      {search ? (
        <div></div>
      ) : (
        <div className="logo">
          <h1>LOGO</h1>
        </div>
      )}

      <div>
        {user ? (
          <Button size="small" variant="outlined">
            Sign Out
          </Button>
        ) : (
          <>
            <Button size="small">Log In</Button>
            <Button size="small" variant="outlined" color="primary">
              Sign Up
            </Button>
          </>
        )}
      </div>
    </div>
  </header>
);
