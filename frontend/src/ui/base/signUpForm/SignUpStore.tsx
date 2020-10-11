import { observable, action, makeObservable } from "mobx";

class SignUpStore {
  @observable
  usernm: string = "";

  @observable
  email: string = "";

  @observable
<<<<<<< HEAD
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
=======
  phoneNo: string = "";

  @observable
  passwd: string = "";

  @observable
  passwdVerify: string = "";
>>>>>>> 29986f12a4570f6e2909ece56c9e34c3b742b32d

  @observable
  open: boolean = false;

  @observable
  success: boolean = false;

  constructor() {
    makeObservable(this);
  }
}

export default SignUpStore;
