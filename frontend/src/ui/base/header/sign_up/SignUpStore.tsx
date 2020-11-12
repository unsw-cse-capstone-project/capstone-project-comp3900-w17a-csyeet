import { observable, makeObservable } from "mobx";
import { AddressDetails } from "../../address_form/AddressForm";

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
  phoneNo: string = "";

  @observable
  address: AddressDetails = {
    street: "",
    suburb: "",
    postcode: "",
    state: "NSW",
    country: "Australia",
  };

  @observable
  success: boolean = false;

  constructor() {
    makeObservable(this);
  }
}
