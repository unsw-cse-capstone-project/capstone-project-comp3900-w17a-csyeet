import { observable, action, makeObservable } from "mobx";

class SignUpStore {
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
  open: boolean = false;

  @observable
  success: boolean = false;

  constructor() {
    makeObservable(this);
  }
}

export default SignUpStore;
