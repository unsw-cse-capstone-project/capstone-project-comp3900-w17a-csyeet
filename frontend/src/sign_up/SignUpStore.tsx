import { observable, makeObservable } from "mobx";

class SignUpStore {
  @observable
  usernm: string = "";

  @observable
  email: string = "";

  @observable
  passwd: string = "";

  @observable
  passwdVerify: string = "";

  @observable
  phoneNo: string = "";

  @observable
  addressLine: string = "";

  @observable
  suburb: string = "";

  @observable
  state: string = "";

  @observable
  postcode: string = "";

  @observable
  open: boolean = false;

  @observable
  success: boolean = false;

  constructor() {
    makeObservable(this);
  }
}

export default SignUpStore;
