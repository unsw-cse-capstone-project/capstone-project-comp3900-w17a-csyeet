import { observable, makeObservable } from "mobx";

class SignInStore {
  @observable
  email: string = "";

  @observable
  passwd: string = "";

  @observable
  success: boolean = false;

  @observable
  open: boolean = false;
  constructor() {
    makeObservable(this);
  }
}

export default SignInStore;
