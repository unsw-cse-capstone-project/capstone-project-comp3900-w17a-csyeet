import { action, makeObservable, observable, runInAction } from "mobx";
import { delay } from "../ui/util/helper";
import {
  createFakeListingPreAuction,
  createFakeListingDuringAuction,
  createFakeListingClosedAuction,
} from "../ui/util/fakes/listing";
import { Listing } from "../ui/util/types/listing";

export class SearchStore {
  @observable
  input: string = "";

  @observable
  searchResults: Listing[] = [];

  @observable
  searchState?: "loading" | "loaded" | "error";

  constructor(query?: string) {
    makeObservable(this);
    this.input = query ? query : "";
  }
}

export class SearchPresenter {
  @action
  async search(store: SearchStore) {
    store.searchState = "loading";
    await delay(400);
    runInAction(() => {
      store.searchResults = [
        createFakeListingPreAuction(),
        createFakeListingDuringAuction(),
        createFakeListingClosedAuction(),
      ];
      store.searchState = "loaded";
    });
  }
}
