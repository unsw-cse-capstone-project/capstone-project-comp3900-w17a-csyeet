import { observable, action, makeObservable } from "mobx";

export type AuthFormType = "signin" | "signup";
type FormErrors = {
  usernmEmpty: boolean;
  phoneNoEmpty: boolean;
  passwdEmpty: boolean;
  emailNotValid: boolean;
  passwordNotMatch: boolean;
};

class AuthStore {
  @observable
  formOpen: boolean = false;

  @observable
  formType: AuthFormType = "signup";

  @observable
  usernm: string = "";

  @observable
  email: string = "";

  @observable
  phoneNo: string = "";

  @observable
  passwd: string = "";

  @observable
  passwdVerify: string = "";

  constructor() {
    makeObservable(this);
  }

  // (Jenn) TODO: Implement Form Error Checking
  // @observable
  // formErrors: FormErrors = {
  //   usernmEmpty: false,
  //   phoneNoEmpty: false,
  //   passwdEmpty: false,
  //   emailNotValid: false,
  //   passwordNotMatch: false,
  // };

  // @action
  // formCheck = () => {
  //   const tmp = this.formErrors;
  //   tmp.usernmEmpty = this.usernm.length == 0;
  //   tmp.phoneNoEmpty = this.phoneNo.length == 0;
  //   tmp.emailNotValid = !this.email.includes("@");
  //   tmp.passwdEmpty = this.passwd.length == 0;
  //   tmp.passwordNotMatch = this.passwd == this.passwdVerify;

  //   // has to all equal false to pass checks
  //   if (
  //     tmp.usernmEmpty ||
  //     tmp.phoneNoEmpty ||
  //     tmp.emailNotValid ||
  //     tmp.passwdEmpty ||
  //     tmp.passwordNotMatch
  //   ) {
  //     this.formErrors = tmp;
  //     return false;
  //   }
  //   return true;
  // };
}

export default AuthStore;
