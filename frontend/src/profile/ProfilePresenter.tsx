import { action, observable, runInAction, makeObservable } from 'mobx';
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

  constructor() {
    makeObservable(this);
  }
}

export class ProfilePresenter {
  @action
  async getProfileInfo(store: ProfileStore) {
    console.log("here");
    try {
      const response = await fetch(`/users/profile`);
      const content = await response.json();
      if ("detail" in content) {
        runInAction(() => {
          store.loadingState = "error";
          console.log("error T-T");
        });
      } else {
        console.log("profile presenter", content);
        const ListingResults: ListingActual[] = content.listings.map(
          (result: any) => getListingFromResult(result)
        );
        console.log(ListingResults)
        const BidsResults: ListingActual[] = content.registrations.map(
          (result: any) => getListingFromResult(result)
        );
        const StarredResults: ListingActual[] = content.starred_listings.map(
          (result: any) => getListingFromResult(result)
        );
        runInAction(() => {
          store.loadingState = "loaded";
          store.myBidsResults = BidsResults;
          store.myListingsResults = ListingResults;
          store.starredResults = StarredResults;
        });
      }
    } catch {
      console.log("error :(");
      runInAction(() => (store.loadingState = "error"));
    }
  }
}
