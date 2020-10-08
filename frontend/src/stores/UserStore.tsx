import { createContext } from "react";
import { observable, action } from "mobx";
import { FormData } from "../ui/base/authForm/AuthForm";

export default class UserStore {
  @observable
  usernm: string | null = "";

  // Potentially can store/cache user dashboard information herew

  @action
  submitForm = (formType: string, formData: FormData) => {
    if ((formType = "signin")) {
      this.usernm = formData.usernm;
      console.log("User sign in API call...");
    } else if ((formType = "signup")) {
      this.usernm = formData.usernm;
      console.log("User sign up API call...");
    }
  };

  @action
  userSignOut = () => {
    this.usernm = null;
    console.log("User sign out API call...");
  };
}
