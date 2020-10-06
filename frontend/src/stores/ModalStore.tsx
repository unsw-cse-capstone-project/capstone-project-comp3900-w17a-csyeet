import { observable, action } from "mobx";
type AuthType = "signup" | "signin" | null;

export class ModalStore {
  @observable
  modalOpen: boolean = false;

  @observable
  modalType: AuthType = null;

  @action
  toggleModal = () => {
    this.modalOpen = !this.modalOpen;
  };

  @action
  setType = (type: AuthType) => {
    this.modalType = type;
  };
}
