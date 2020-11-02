import { action, observable, runInAction } from "mobx";
import { ListingActual } from "../ui/util/types/listing";
import { getListingFromResult } from "../ui/util/helper";

export class ProfileStore {
  @observable
  myBidsResults: ListingActual[] = [];

  @observable
  myListingsResults: ListingActual[] = [];

  @observable
  starredResults: ListingActual[] = [];

  @observable
  loadingState?: "loading" | "loaded" | "error";
}

export class ProfilePresenter {
  @action
  async getProfileInfo(store: ProfileStore) {
    try {
      const response = await fetch(`/listings/`);
      const content = await response.json();
      if ("detail in content") {
        runInAction(() => {
          store.loadingState = "error";
        });
      } else {
        const results: ListingActual[] = content.map((result: any) =>
          getListingFromResult(result)
        );
        runInAction(() => {
          store.loadingState = "loaded";
          store.myBidsResults = [];
          store.myListingsResults = [];
          store.starredResults = [];
        });
      }
    } catch {
      console.log("error :(");
      runInAction(() => (store.loadingState = "error"));
    }
  }
}
