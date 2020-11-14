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

export type SignInGoogleArgs = {
  email: string;
  token: string;
  onError: (error: string) => void;
  onSuccess: () => void;
};

export type SignUpArgs = {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  address: AddressDetails;
  onError: (error: string) => void;
  onSuccess: () => void;
};

export type SignUpGoogleArgs = {
  name: string;
  email: string;
  phone_number: string;
  address: AddressDetails;
  token: string;
  onError: (error: string) => void;
  onSuccess: () => void;
};

export default class Store {
  @observable user?: User;
  @observable openSignUp: boolean = false;
  @observable openSignIn: boolean = false;

  @action
  async signIn({ email, password, onError, onSuccess }: SignInArgs) {
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
        window.localStorage.setItem("name", content.name);
        window.localStorage.setItem("email", content.email);
        window.localStorage.setItem("id", content.id);
      }
    } catch {
      onError("Error occurred please try again");
    }
  }

  @action
  async signInGoogle({ email, token, onError, onSuccess }: SignInGoogleArgs) {
    try {
      const response = await fetch("/google_login", {
        method: "post",
        credentials: "include",
        body: JSON.stringify({ email, google_id_token: token }),
      });
      const content = await response.json();
      console.log(content)
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
        window.localStorage.setItem("name", content.name);
        window.localStorage.setItem("email", content.email);
        window.localStorage.setItem("id", content.id);
      }
    } catch {
      onError("Error occurred please try again");
    }
  }

  @action
  async signUpGoogle({
    name,
    email,
    phone_number,
    address,
    token,
    onError,
    onSuccess,
  }: SignUpGoogleArgs) {
    try {
      const response = await fetch("/google_signup", {
        method: "post",
        body: JSON.stringify({
          name: name,
          email: email,
          google_id_token: token,
          phone_number: phone_number,
          street: address.street,
          state: address.state,
          postcode: address.postcode,
          country: address.country,
          suburb: address.suburb,
        }),
      });
      const content = await response.json();
      if ("detail" in content) {
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
      window.localStorage.setItem("name", content.name);
      window.localStorage.setItem("email", content.email);
      window.localStorage.setItem("id", content.id);
      onSuccess();
    } catch {
      onError("Error occurred when signing up");
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
      if ("detail" in content) {
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
      window.localStorage.setItem("name", content.name);
      window.localStorage.setItem("email", content.email);
      window.localStorage.setItem("id", content.id);
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
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("id");
    } catch {
      console.log("error T-T");
    }
  }

  constructor() {
    makeObservable(this);
  }
}

const checkSession = async (store: Store) => {
  if (
    window.localStorage.getItem("id") &&
    window.localStorage.getItem("name") &&
    window.localStorage.getItem("email")
  ) {
    runInAction(() => {
      store.user = {
        name: window.localStorage.getItem("name") as string,
        id: parseInt(window.localStorage.getItem("id") as string),
        email: window.localStorage.getItem("email") as string,
      };
    });
  }
  let session = document.cookie
    .split(" ")
    .find((cookie) => cookie.startsWith("session="));
  if (session) {
    try {
      const response = await fetch("/users/me", {
        headers: {
          Cookie: session.split("=")[1],
        },
      });
      const result = await response.json();
      const user = {
        id: result.id,
        name: result.name,
        email: result.email,
      };
      if (
        (store.user as any).id !== user.id ||
        (store.user as any).name !== user.name ||
        (store.user as any).email !== user.name
      ) {
        runInAction(
          () =>
            (store.user = {
              id: result.id,
              name: result.name,
              email: result.email,
            })
        );
      }
    } catch {
      runInAction(() => (store.user = undefined));
    }
  } else {
    runInAction(() => (store.user = undefined));
  }
};

export const AuthContext = React.createContext<Store | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const store = new Store();
  checkSession(store);
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

export const useStore = () => React.useContext(AuthContext);
