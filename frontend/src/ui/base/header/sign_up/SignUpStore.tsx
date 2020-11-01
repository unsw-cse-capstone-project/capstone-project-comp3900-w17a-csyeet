import { observable, makeObservable } from "mobx";

export class SignUpStore {
  @observable
  usernm: string = "";

  @observable
  email: string = "";

  @observable
  passwd: string = "";

  @observable
  passwdVerify: string = "";

  @observable
  phone_number: string = "";

  @observable
  street: string = "";

  @observable
  suburb: string = "";

  @observable
  state: string = "";

  @observable
  country: string = "Australia";

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
