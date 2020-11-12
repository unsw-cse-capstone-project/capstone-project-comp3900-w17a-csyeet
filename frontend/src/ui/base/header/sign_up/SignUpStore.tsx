import { observable, makeObservable } from "mobx";
import { AddressDetails } from "../../../../listing/listing_form/ListingForm";

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
  googleId: string = "";

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
