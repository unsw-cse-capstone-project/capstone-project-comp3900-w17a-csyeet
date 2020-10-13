import { observable, makeObservable } from "mobx";

class SignInStore {
  @observable
  email: string = "";

  @observable
  passwd: string = "";

  @observable
  open: boolean = false;

  @observable
  success: boolean = false;

  constructor() {
    makeObservable(this);
  }
}

export default SignInStore;
