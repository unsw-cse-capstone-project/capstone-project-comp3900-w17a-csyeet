import { action, observable, runInAction, makeObservable } from "mobx";
import { ListingActual } from "../ui/util/types/listing";
import { getListingFromResult } from "../ui/util/helper";

export class ProfileStore {
  @observable userDetails = {
    name: "",
    email: "",
    phone_number: "",
    street: "",
    suburb: "",
    postcode: "",
    state: "",
    country: "",
  };

  @observable blurb: string = "Update your bio";
  @observable avatar: string;

  @observable old_password: string = "";
  @observable new_password: string = "";
  @observable new_password_confirm: string = "";

  @observable
  myBidsResults: ListingActual[] = [];

  @observable
  myListingsResults: ListingActual[] = [];

  @observable
  starredResults: ListingActual[] = [];

  @observable
  loadingState?: "loading" | "loaded" | "error" | "updating" | "success";

  constructor(id: number) {
    this.avatar = `/users/${id}/avatar`;
    makeObservable(this);
  }
}

export class ProfilePresenter {
  @action
  async getProfileInfo(store: ProfileStore) {
    store.loadingState = "loading";
    try {
      const response = await fetch(`/users/profile`);
      const content = await response.json();
      if ("detail" in content) {
        runInAction(() => {
          store.loadingState = "error";
        });
      } else {
        const ListingResults: ListingActual[] = content.listings.map(
          (result: any) => getListingFromResult(result)
        );
        const BidsResults: ListingActual[] = content.registrations.map(
          (result: any) => getListingFromResult(result)
        );
        const StarredResults: ListingActual[] = content.starred_listings.map(
          (result: any) => getListingFromResult(result)
        );

        runInAction(() => {
          store.loadingState = "loaded";
          store.userDetails = {
            name: content.name,
            email: content.email,
            phone_number: content.phone_number,
            street: content.street,
            suburb: content.suburb,
            postcode: content.postcode,
            state: content.state,
            country: content.country,
          };
          store.blurb = !!content["blurb"]
            ? content["blurb"]
            : "Update your bio";
          store.myBidsResults = BidsResults.sort(
            (a, b) => b.auction_start.getTime() - a.auction_start.getTime()
          );
          store.myListingsResults = ListingResults.sort(
            (a, b) => b.auction_start.getTime() - a.auction_start.getTime()
          );
          store.starredResults = StarredResults.sort(
            (a, b) => b.auction_start.getTime() - a.auction_start.getTime()
          );
        });
      }
    } catch {
      runInAction(() => {
        store.loadingState = "error";
      });
    }
  }

  @action
  async updateUserDetails(store: ProfileStore) {
    store.loadingState = "updating";
    try {
      const response = await fetch(`users/profile`, {
        method: "post",
        body: JSON.stringify({
          name: store.userDetails.name,
          phone_number: store.userDetails.phone_number,
          street: store.userDetails.street,
          suburb: store.userDetails.suburb,
          postcode: store.userDetails.postcode,
          state: store.userDetails.state,
          country: store.userDetails.country,
        }),
      });
      const result = await response.json();
      if ("detail" in result) runInAction(() => (store.loadingState = "error"));
      else runInAction(() => (store.loadingState = "success"));
    } catch {
      runInAction(() => {
        store.loadingState = "error";
        window.location.reload();
      });
    }
  }

  @action
  async updateUserPassword(
    store: ProfileStore,
    onPasswordIncorrect: () => void
  ) {
    store.loadingState = "updating";
    try {
      const response = await fetch(`users/profile`, {
        method: "post",
        body: JSON.stringify({
          old_password: store.old_password,
          new_password: store.new_password,
        }),
      });
      const result = await response.json();
      if ("detail" in result) onPasswordIncorrect();
      else runInAction(() => (store.loadingState = "success"));
    } catch {
      runInAction(() => {
        store.loadingState = "error";
        window.location.reload();
      });
    }
  }

  @action
  async updateBlurb(blurb: string, store: ProfileStore) {
    store.loadingState = "updating";
    console.log("Updating blurb");
    try {
      const response = await fetch(`users/profile`, {
        method: "post",
        body: JSON.stringify({
          blurb: blurb,
        }),
      });
      const result = await response.json();
      if ("detail" in result) runInAction(() => (store.loadingState = "error"));
      else {
        runInAction(() => {
          store.loadingState = "success";
          store.blurb = blurb;
        });
      }
    } catch {
      runInAction(() => (store.loadingState = "error"));
    }
  }

  @action
  async updateAvatar(image: File, img_url: string, store: ProfileStore) {
    runInAction(() => (store.loadingState = "updating"));
    let form = new FormData();
    let data = await image.arrayBuffer();
    form.append("file", new Blob([data], { type: image.type }));
    try {
      const response = await fetch(`/users/avatar`, {
        method: "post",
        body: form,
      });
      if (response.status !== 200) {
        runInAction(() => (store.loadingState = "error"));
        return;
      }
      runInAction(() => {
        store.loadingState = "success";
        store.avatar = "/users/avatar";
        window.location.reload();
      });
    } catch (e) {
      runInAction(() => (store.loadingState = "error"));
    }
  }
}
