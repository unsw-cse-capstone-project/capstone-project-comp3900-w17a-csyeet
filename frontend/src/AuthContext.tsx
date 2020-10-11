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

// export const AuthProvider: React.FC = (props: React.PropsWithChildren<{}>) => {
//   const [isAuth, setIsAuth] = React.useState(false);

//   const login = action(() => {
//     // setting timeout to mimic an async login
//     console.log("login");
//     setTimeout(() => setIsAuth(true), 1000);
//   });
//   const logout = () => setIsAuth(false);

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuth: isAuth,
//         login: login,
//         logout: logout,
//       }}
//     >
//       {props.children}
//     </AuthContext.Provider>
//   );
// };
// export const AuthConsumer = AuthContext.Consumer;

export const useStore = () => React.useContext(AuthContext);

/* HOC to inject store to any functional or class component */
// eslint-disable-next-line react/display-name
export const withStore = (Component: React.ComponentType) => (props: any) => {
  return <Component {...props} store={useStore()} />;
};
