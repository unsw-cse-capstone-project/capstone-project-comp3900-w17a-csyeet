import { observable, action, makeObservable } from "mobx";
type FormErrorCheck = {
  usernmEmpty: boolean;
  phoneNoEmpty: boolean;
  passwdEmpty: boolean;
  emailNotValid: boolean;
  passwordNotMatch: boolean;
};

class AuthStore {
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

  @observable
  formErrors: FormErrorCheck = {
    usernmEmpty: false,
    phoneNoEmpty: false,
    passwdEmpty: false,
    emailNotValid: false,
    passwordNotMatch: false,
  };

  constructor() {
    makeObservable(this);
  }

  @action
  userSignIn = (usernm: string, passwd: string) => {
    console.log(usernm, " has signed in.");
  };

  @action
  userSignUp = (
    usernm: string,
    email: string,
    phoneNo: string,
    passwd: string,
    passwdVerify: string
  ) => {
    const tmp = this.formErrors;
    tmp.usernmEmpty = usernm.length == 0;
    tmp.phoneNoEmpty = phoneNo.length == 0;
    tmp.emailNotValid = !email.includes("@");
    tmp.passwdEmpty = passwd.length == 0;
    tmp.passwordNotMatch = passwd == passwdVerify;

    // has to all equal false to pass checks
    if (
      tmp.usernmEmpty ||
      tmp.phoneNoEmpty ||
      tmp.emailNotValid ||
      tmp.passwdEmpty ||
      tmp.passwordNotMatch
    ) {
      this.formErrors = tmp;
    } else {
      console.log(usernm, " has signed up.");
    }
  };
}

export default AuthStore;
