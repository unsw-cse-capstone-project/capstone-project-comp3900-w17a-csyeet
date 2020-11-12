import { action, makeObservable, observable, runInAction } from "mobx";
import React from "react";
import { AddressDetails } from "./ui/base/address_form/AddressForm";

export type User = {
  name: string;
  email: string;
  id: number;
};

export type SignInArgs = {
  email: string;
  password: string;
  onError: (error: string) => void;
  onSuccess: () => void;
};

export type SignUpArgs = {
  name: string,
  email: string,
  password: string,
  phone_number: string,
  address: AddressDetails,
  onError: (error: string) => void,
  onSuccess: () => void,
}

export default class Store {
  @observable user?: User;
  @observable openSignUp: boolean = false;
  @observable openSignIn: boolean = false;

  @action
  async signIn({
    email,
    password,
    onError,
    onSuccess,
  }: SignInArgs) {
    try {
      const response = await fetch("/login", {
        method: "post",
        credentials: "include",
        body: JSON.stringify({ email: email, password: password }),
      });
      const content = await response.json();
      if ("detail" in content) {
        onError(content.detail);
      } else {
        runInAction(
          () =>
            (this.user = {
              name: content.name,
              id: content.id,
              email: content.email,
            })
        );
        onSuccess();
      }
    } catch {
      onError("Error occurred please try again");
    }
  }

  @action
  async signUp({
    name,
    email,
    password,
    phone_number,
    address,
    onError,
    onSuccess,
  }: SignUpArgs) {
    try {
      const response = await fetch("/signup", {
        method: "post",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          phone_number: phone_number,
          street: address.street,
          state: address.state,
          postcode: address.postcode,
          country: address.country,
          suburb: address.suburb,
        }),
      });
      const content = await response.json();
      if ('detail' in content) {
        onError(content.detail);
        return;
      }
      runInAction(
        () =>
          (this.user = {
            name: content.name,
            id: content.id,
            email: content.email,
          })
      );
      onSuccess();
    } catch {
      onError("Error occurred when signing up");
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

const checkSession = async (store: Store) => {
  let session = document.cookie
    .split(" ")
    .find((cookie) => cookie.startsWith("session="));
  if (session) {
    try {
      const response = await fetch("/users/profile", {
        headers: {
          Cookie: session.split("=")[1],
        },
      });
      const result = await response.json();
      runInAction(
        () =>
          (store.user = {
            id: result.id,
            name: result.name,
            email: result.email,
          })
      );
    } catch {
      console.log("error T-T");
    }
  }
};

export const AuthContext = React.createContext<Store | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const store = new Store();
  checkSession(store);
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

export const useStore = () => React.useContext(AuthContext);
