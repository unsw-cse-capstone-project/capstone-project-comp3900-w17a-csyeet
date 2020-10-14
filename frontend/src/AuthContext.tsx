import { action, makeObservable, observable, runInAction } from "mobx";
import React from "react";

export type User = {
  name: string;
  email: string;
  id: number;
};

export default class Store {
  @observable user?: User;
  @observable openSignUp: boolean = false;
  @observable openSignIn: boolean = false;

  // (Jenn TOOD: Hook API call)
  @action
  async signIn(email: string, password: string) {
    try {
      const response = await fetch("/login", {
        method: "post",
        body: JSON.stringify({ email: email, password: password }),
      });
      const content = await response.json();
      console.log(content);
      if ("detail" in content) {
        console.log("error", content.detail);
      } else {
        runInAction(
          () =>
            (this.user = { name: content.name, id: 1, email: content.email })
        );
      }
    } catch {
      console.log("error T-T");
    }
  }

  // (Jenn TOOD: Hook API call)
  @action
  async signUp(email: string, password: string, name: string) {
    try {
      const response = await fetch("/signup", {
        method: "post",
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
      });
      const content = await response.json();
      console.log(content);
      runInAction(
        () => (this.user = { name: content.name, id: 1, email: content.email })
      );
    } catch {
      console.log("error T-T");
    }
  }

  // (Jenn TOOD: Hook API call)
  @action
  async signOut() {
    try {
      await fetch("/logout", {
        method: "post",
      });
      runInAction(() => (this.user = undefined));
    } catch {
      console.log("error T-T");
    }
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
