import { observable, makeObservable } from "mobx";
type AuthType = "signup" | "signin" | null;

class ModalStore {
  @observable
  modalOpen: boolean = false;

  constructor() {
    makeObservable(this);
  }
}

export default ModalStore;
