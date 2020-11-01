import { observable, makeObservable } from "mobx";

export class SignInStore {
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
