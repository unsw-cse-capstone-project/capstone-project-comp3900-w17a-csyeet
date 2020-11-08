import { action, observable, runInAction, makeObservable } from "mobx";
import { ListingActual } from "../ui/util/types/listing";
import { getListingFromResult } from "../ui/util/helper";

export class ProfileStore {
  @observable blurb: string = "Update your bio"; // Tempporary
  @observable avatar: string;

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
        console.log("profile presenter", content);
        const ListingResults: ListingActual[] = content.listings.map(
          (result: any) => getListingFromResult(result)
        );
        console.log(ListingResults);
        const BidsResults: ListingActual[] = content.registrations.map(
          (result: any) => getListingFromResult(result)
        );
        const StarredResults: ListingActual[] = content.starred_listings.map(
          (result: any) => getListingFromResult(result)
        );

        runInAction(() => {
          store.loadingState = "loaded";
          store.blurb = !!content["blurb"]? content["blurb"]: "Update your bio";
          store.myBidsResults = BidsResults;
          store.myListingsResults = ListingResults;
          store.starredResults = StarredResults;
        });
      }
    } catch {
      console.log("Error :( ");
    }
  }

  @action
  async updateBlurb(blurb: string, store: ProfileStore) {
    store.loadingState = "updating";
    try {
      // ENDPOINT NOT UP YET
      const response = await fetch(`users/update`, {
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
      console.log("Error updating about me");
      runInAction(() => (store.loadingState = "error"));
    }
  }

  @action
  async updateAvatar(image: File, img_url: string, store: ProfileStore) {
    store.loadingState = "updating";
    let form = new FormData();
    form.append("avatar", image);
    try {
      const response = await fetch(`/users/avatar`, {
        method: "post",
        body: form,
      });
      const result = await response.json();
      if ("detail" in result) runInAction(() => (store.loadingState = "error"));
      else {
        runInAction(() => {
          store.loadingState = "success";
          store.avatar = img_url;
        })
      }
    } catch {
      console.log("Error updating avatar");
      runInAction(() => (store.loadingState = "error"));
    }
  }
}
