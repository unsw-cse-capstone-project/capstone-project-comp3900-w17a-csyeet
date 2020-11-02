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

  @action
  async signIn(email: string, password: string, onError: () => void) {
    try {
      const response = await fetch("/login", {
        method: "post",
        body: JSON.stringify({ email: email, password: password }),
      });
      const content = await response.json();
      if ("detail" in content) {
        console.log("error", content.detail);
        onError();
      } else {
        runInAction(
          () =>
            (this.user = {
              name: 'Teresa',
              id: 5,
              email: 'teresa@example.com',
            })
        );
      }
    } catch {
      console.log("error T-T");
    }
  }

  @action
  async signUp(
    name: string,
    email: string,
    password: string,
    phone_number: string,
    street: string,
    suburb: string,
    postcode: string,
    state: string,
    country: string
  ) {
    try {
      // const response = await fetch("/signup", {
      //   method: "post",
      //   body: JSON.stringify({
      //     name: name,
      //     email: email,
      //     password: password,
      //     phone_number: phone_number,
      //     street: street,
      //     suburb: suburb,
      //     postcode: postcode,
      //     state: state,
      //     country: country,
      //   }),
      // });
      // const content = await response.json();
      runInAction(
        () =>
          (this.user = {
            name: 'Teresa',
            id: 5,
            email: 'teresa@example.com',
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
