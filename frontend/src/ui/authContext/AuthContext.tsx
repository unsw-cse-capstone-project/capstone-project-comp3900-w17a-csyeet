import { action } from "mobx";
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

export const AuthProvider = (props: React.PropsWithChildren<{}>) => {
  const [isAuth, setIsAuth] = React.useState(false);

  const userSignIn = action(() => {
    // Setting timeout to mimic an async login
    console.log("login");
    setTimeout(() => setIsAuth(true), 1000);
  });

  const userSignUp = action(() => {
    // Setting timeout to mimic an async login
    console.log("sign up");
    setTimeout(() => setIsAuth(true), 1000);
  });

  const userSignOut = () => {
    console.log("logout");
    setTimeout(() => setIsAuth(false), 1000);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        userSignIn,
        userSignOut,
        userSignUp,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export const AuthConsumer = AuthContext.Consumer;
