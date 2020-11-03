import { action, makeObservable, observable, runInAction } from "mobx";
import React from "react";

export type User = {
  name: string;
  email: string;
  id: number;
  // avatar: string;
  phone_number?: string;
  street?: string;
  suburb?: string;
  postcode?: string;
  state?: string;
  country?: string;
};

export default class Store {
  @observable user?: User;
  @observable avatar: string =
    "https://avatarfiles.alphacoders.com/791/79102.png";
  @observable openSignUp: boolean = false;
  @observable openSignIn: boolean = false;

  @action
  async signIn(email: string, password: string, onError: () => void) {
    runInAction(
      () =>
        (this.user = {
          name: "jenn",
          email: "jenn@gmail.com",
          id: 5,
        })
    );
  }
  // try {
  //   const response = await fetch("/login", {
  //     method: "post",
  //     body: JSON.stringify({ email: email, password: password }),
  //   });
  //   const content = await response.json();
  //   if ("detail" in content) {
  //     console.log("error", content.detail);
  //     onError();
  //   } else {
  //     runInAction(
  //       () =>
  //         (this.user = {
  //           name: content.name,
  //           id: content.id,
  //           email: content.email,
  //           phone_number: "0412345678",
  //           street: "12 Street St",
  //           suburb: "Fairfield",
  //           postcode: "2194",
  //           state: "NSW",
  //           country: "Australia",
  //         })
  //     );
  //   }
  // } catch {
  //   console.log("error T-T");
  // }
  // }

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
      const response = await fetch("/signup", {
        method: "post",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          phone_number: phone_number,
          street: street,
          suburb: suburb,
          postcode: postcode,
          state: state,
          country: country,
        }),
      });
      const content = await response.json();
      runInAction(
        () =>
          (this.user = {
            name: content.name,
            id: content.id,
            email: content.email,
            phone_number: "0412345678",
            street: "12 Street St",
            suburb: "Fairfield",
            postcode: "2194",
            state: "NSW",
            country: "Australia",
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

  convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  @action
  async getAvatar() {
    try {
      const response = await fetch(`users/avatar`);
      const result = await response.blob();
      const avatar = await this.convertBlobToBase64(result);
      runInAction(() => (this.avatar = avatar as string));
    } catch {
      console.log("error :(");
    }
  }
}

export const AuthContext = React.createContext<Store | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const store = new Store();
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

export const useStore = () => React.useContext(AuthContext);
