import React, { useContext } from "react";
import { observer } from "mobx-react";

import Header from "../base/header/Header";
import { useUserStore } from "../../UserContextProvider";
import SearchBar from "../base/searchBar/SearchBar";
import UserStore from "../../stores/UserStore";
import ModalStore from "../../stores/ModalStore";
import AuthForm from "../base/authForm/AuthForm";

const SearchPage = observer(() => {
  const { userStore } = useUserStore();
  return (
    <div>
      <Header userStore={userStore} />
    </div>
  );
});

export default SearchPage;
