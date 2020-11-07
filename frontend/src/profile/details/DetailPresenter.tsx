import { observable, action } from "mobx";

export class DetailStore {
  id: number = 0;
  @observable name: string = "";
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
    user_id: number,
    store: DetailStore,
    onSuccess: () => void,
    onError: () => void
  ) {
    try {
      // Check path when merged into master
      const response = await fetch(`/user/${user_id}`, {
        method: "post",
        body: JSON.stringify({
          name: store.name,
          phone_number: store.phone_number,
          street: store.street,
          suburb: store.suburb,
          postcode: store.postcode,
          state: store.state,
          country: store.country,
        }),
      });
      const result = await response.json();
      if ("detail" in result) onError();
      else onSuccess();
    } catch {
      onError();
    }
  }

  @action
  async updateUserPassword(
    user_id: number,
    store: DetailStore,
    onSuccess: () => void,
    onError: () => void,
    onIncorrectPassword: () => void
  ) {
    try {
      // CHeck path when merged into master
      const response = await fetch(`/user/${user_id}`, {
        method: "post",
        body: JSON.stringify({
          password: store.currPasswd,
          new_password: store.newPasswd,
        }),
      });
      const result = await response.json();
      if ("detail" in result) onIncorrectPassword();
      else onSuccess();
    } catch {
      onError();
    }
  }
}
