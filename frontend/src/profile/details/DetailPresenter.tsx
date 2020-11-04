import { observable, action, runInAction } from "mobx";

export class DetailStore {
  id: number = 0;
  @observable name: string = "";
  @observable email: string = "";
  @observable phone_number: string = "";
  @observable street: string = "";
  @observable suburb: string = "";
  @observable postcode: string = "";
  @observable state: string = "";
  @observable country: string = "";
  @observable currPasswd: string = "";
  @observable newPasswd: string = "";
  @observable newPasswdConfirm: string = "";
}

export class DetailPresenter {
  @action
  async updateUserDetails(
    store: DetailStore,
    onSuccess: () => void,
    onError: () => void
  ) {
    try {
      const response = await fetch(`/user/profile/update`, {
        method: "post",
        body: JSON.stringify({
          name: store.name,
          email: store.email,
          phone_number: store.phone_number,
          street: store.street,
          suburb: store.suburb,
          postcode: store.postcode,
          state: store.state,
          country: store.country,
        }),
      });
      const result = await response.json();
      if ("detail" in result) {
        onError();
      } else {
        onSuccess();
      }
    } catch {
      onError();
    }
  }

  @action
  async updateUserPassword(
    store: DetailStore,
    onPasswordIncorrect: () => void,
    onError: () => void,
    onSuccess: () => void
  ) {
    try {
      const response = await fetch(`user/profile/changepassword`, {
        method: "post",
        body: JSON.stringify({
          password: store.currPasswd,
          new_password: store.newPasswd,
        }),
      });
      const result = response.json();
      if ("detail" in result) {
        onError();
        onPasswordIncorrect();
      } else onSuccess();
    } catch {
      onError();
    }
  }
}
