import { observable, makeObservable, action, runInAction } from "mobx";
import { fetchListing, createFakeListing } from "../ui/util/fakes/listing";
import { delay } from "../ui/util/helper";
import { Listing } from "../ui/util/types/listing";

export class ListingPageStore {
  @observable
  loadingState?: "loading" | "loaded" | "error";

  @observable
  listing?: Listing;

  constructor() {
    makeObservable(this);
  }
}

export class ListingPagePresenter {
  @action
  async loadInformation(store: ListingPageStore) {
    store.loadingState = "loading";
    try {
      const listing = await delay(400).then(() => createFakeListing());
      runInAction(() => {
        store.listing = listing;
        store.loadingState = "loaded";
      });
    } catch {
      runInAction(() => (store.loadingState = "error"));
    }
  }
}
