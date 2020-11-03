import { observable, makeObservable, action, runInAction } from "mobx";
import { ListingActual } from "../ui/util/types/listing";
import { delay, getListingFromResult } from '../ui/util/helper';

export class ListingPageStore {
  @observable
  loadingState?: "loading" | "loaded" | "error";

  @observable
  listing?: ListingActual;

  constructor() {
    makeObservable(this);
  }
}

export class ListingPagePresenter {
  @action
  async loadInformation(store: ListingPageStore, id: number) {
    store.loadingState = "loading";
    try {
      const response = await fetch(`/listings/${id}`);
      const result = await response.json();

      if ("detail" in result) {
        // handle error
        console.log("error " + result.detail);
      } else {
        const results: ListingActual = getListingFromResult(result);
        runInAction(() => {
          store.listing = results;
          store.loadingState = "loaded";
        });
      }
    } catch {
      runInAction(() => (store.loadingState = "error"));
    }
  }

  async deleteListing() {
    console.log('Deleting...');
    await delay(300);
    console.log('Deleting complete');
  }
}
