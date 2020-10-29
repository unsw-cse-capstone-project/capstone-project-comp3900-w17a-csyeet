import { observable } from "mobx";

export class DetailStore {
  id: number = 0;
  @observable name: string = "";
  @observable email: string = "";
  @observable phoneNo: string = "";
  @observable street: string = "";
  @observable suburb: string = "";
  @observable postcode: string = "";
  @observable state: string = "";
  @observable country: string = "";
  @observable currPasswd: string = "";
  @observable newPasswd: string = "";
  @observable newPasswdConfirm: string = "";
}
