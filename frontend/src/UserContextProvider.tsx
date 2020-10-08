import React, { createContext, useContext } from "react";
import UserStore from "./stores/UserStore";

type UserContextProps = {
  userStore: UserStore;
};
const userStore = new UserStore();
const UserContext = createContext<UserContextProps>({ userStore });

export const UserContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <UserContext.Provider value={{ userStore }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserStore = () => useContext(UserContext);

export default UserContextProvider;
