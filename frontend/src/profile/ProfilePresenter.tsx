import { action, makeObservable, observable, runInAction } from "mobx";
import { ListingActual } from "../ui/util/types/listing";
import { getListingFromResult } from "../ui/util/helper";
import { User } from "../AuthContext";

export class ProfileStore {
  @observable
  user?: User;

  @observable
  myBidsResults: ListingActual[] = [];

  @observable
  myListingsResults: ListingActual[] = [];

  @observable
  starredResults: ListingActual[] = [];
}

export class ProfilePresenter {
  @action
  async getProfileInfo(store: ProfileStore) {
    try {
      const response = await fetch(`/listings/`);
      const content = await response.json();
      if ("detail in content") {
        runInAction(() => {
          console.log("failed to load");
        });
      } else {
        const results: ListingActual[] = content.map((result: any) =>
          getListingFromResult(result)
        );
        runInAction(() => {
          store.myBidsResults = [];
          store.myListingsResults = [];
          store.starredResults = [];
        });
      }
    } catch {
      console.log("error :(");
    }
  }
}
