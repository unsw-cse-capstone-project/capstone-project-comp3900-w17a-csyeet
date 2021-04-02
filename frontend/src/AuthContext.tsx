import { action, makeObservable, observable, runInAction } from "mobx";
import React from "react";
import { AddressDetails } from "./ui/base/address_form/AddressForm";
import { AuthenticationService } from './backend/authentication/authentication_service';
import { allUsers } from './backend/users/users_services';

export type User = {
  name: string;
  email: string;
  id: number;
  avatar?: string,
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

/**
 * User Stoe
 */
export default class Store {
  @observable user?: User;
  @observable openSignUp: boolean = false;
  @observable openSignIn: boolean = false;
  authService: AuthenticationService = new AuthenticationService();

  /**
   * Sign in user
   * @param email
   * @param password
   * @param onError
   * @param onSuccess
   */
  @action
  async signIn({ email, password, onError, onSuccess }: SignInArgs) {
    try {
      const content = this.authService.login({email, password});
      runInAction(
        () =>
          (this.user = {
            name: content.name,
            id: content.id,
            email: content.email,
            avatar: content.avatar,
          })
      );
      console.log(this.user);
      onSuccess();
      window.localStorage.setItem("name", content.name);
      window.localStorage.setItem("email", content.email);
      window.localStorage.setItem("id", content.id.toString());
    } catch (e) {
      onError(e.message);
    }
  }

  /**
   * Sign in user with google
   * @param name
   * @param email
   * @param phone_number
   * @param address
   * @param googleId
   * @param onError
   * @param onSuccess
   */
  @action
  async signInGoogle({ email, token, onError, onSuccess }: SignInGoogleArgs) {
    try {
      const response = await fetch("/google_login", {
        method: "post",
        credentials: "include",
        body: JSON.stringify({ email, google_id_token: token }),
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

  /**
   * Sign up user
   * @param name
   * @param email
   * @param password
   * @param phone_number
   * @param address
   * @param onError
   * @param onSuccess
   */
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
      const content = this.authService.signUp({
          name: name,
          email: email,
          password: password,
          phoneNumber: phone_number,
          street: address.street,
          state: address.state,
          postcode: address.postcode,
          country: address.country,
          suburb: address.suburb,
      });
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
      window.localStorage.setItem("id", content.id.toString());
      onSuccess();
    } catch (e) {
      onError(e.message);
    }
  }

  /**
   * Sign out user
   */
  @action
  async signOut() {
    try {
      this.authService.logout();
      runInAction(() => (this.user = undefined));
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("id");
    } catch {
      
    }
  }

  constructor() {
    makeObservable(this);
  }
}

/**
 * Allows users to have persistent log in on page refresh
 * @param store
 */
const checkSession = async (store: Store) => {
  if (
    window.localStorage.getItem("id") &&
    window.localStorage.getItem("name") &&
    window.localStorage.getItem("email")
  ) {
    const id = parseInt(window.localStorage.getItem("id")as string)
    const user = store.authService.verifyInformation({email: window.localStorage.getItem("email") as string, id})
    if (!user) {
      return;
    }
    runInAction(() => {
      store.user = user;
    });
  }
};

export const AuthContext = React.createContext<Store | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const store = new Store();
  checkSession(store);
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

export const useStore = () => React.useContext(AuthContext);
