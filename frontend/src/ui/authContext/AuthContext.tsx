import { action, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
export type AuthContextType = {
  isAuth: boolean;
  userSignIn: () => void;
  userSignOut: () => void;
  userSignUp: () => void;
};

export type User = {
  displayName: string | undefined;
  isAuth: boolean;
};

export const AuthContext: React.Context<AuthContextType> = React.createContext(
  {} as AuthContextType
);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const [isAuth, setIsAuth] = React.useState(false);

  const userSignIn = action(() => {
    // Setting timeout to mimic an async login
    console.log("login");
    setTimeout(() => setIsAuth(true), 1000);
  });

  const userSignUp = action(() => {
    // Setting timeout to mimic an async login
    console.log("login");
    setTimeout(() => setIsAuth(true), 1000);
  });

  const userSignOut = () => setIsAuth(false);

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        userSignIn: userSignIn,
        userSignOut: userSignOut,
        userSignUp: userSignUp,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export const AuthConsumer = AuthContext.Consumer;
