import { action, makeObservable, observable, runInAction } from "mobx";
import React from "react";
import { User, ListingType } from "./types";

export default class Store {
  @observable user?: User;
  @observable openSignUp: boolean = false;
  @observable openSignIn: boolean = false;
  @observable userListings: Array<ListingType> = [];
  @observable userStarred: Array<ListingType> = [];
  @observable userBids: Array<ListingType> = [];

  @action
  async signIn(email: string, password: string) {
    try {
      const response = await fetch("/login", {
        method: "post",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const content = await response.json();
      if ("detail" in content) {
        console.log("error", content.detail);
      } else {
        runInAction(
          () =>
            (this.user = {
              name: content.name,
              id: content.id,
              email: content.email,
            })
        );
        console.log(this.user);
      }
    } catch {
      console.log("error T-T");
    }
  }

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
      runInAction(
        () =>
          (this.user = {
            name: content.name,
            id: content.id,
            email: content.email,
          })
      );
      console.log(this.user);
    } catch {
      console.log("error T-T");
    }
  }

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
