import { action, makeObservable, observable } from "mobx";
import React from "react";
export type AuthContextType = {
  isAuth: boolean;
  login(): void;
  logout(): void;
};
export type User = {
  displayName: string | undefined;
  isAuth: boolean;
};

export default class Store {
  @observable isAuth: boolean = false;

  @action
  login() {
    this.isAuth = true;
  }

  @action
  logout() {
    this.isAuth = false;
  }

  constructor() {
    makeObservable(this);
  }
}

export const AuthContext = React.createContext<Store | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const store = new Store();
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

export const useStore = () => React.useContext(AuthContext);
