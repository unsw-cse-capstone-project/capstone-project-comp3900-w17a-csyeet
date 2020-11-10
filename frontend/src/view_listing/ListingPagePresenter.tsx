import { observable, makeObservable, action, runInAction } from "mobx";
import { ListingActual } from "../ui/util/types/listing";
import { getListingFromResult } from "../ui/util/helper";

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
  /**
   * 
   * @param store 
   * @param id 
   * Load the listing information from backend
   */
  @action
  async loadInformation(store: ListingPageStore, id: number) {
    store.loadingState = "loading";
    try {
      const response = await fetch(`/listings/${id}`);
      const result = await response.json();

      if ("detail" in result) {
        runInAction(() => (store.loadingState = "error"));
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

  /**
   * 
   * @param id 
   * Delete a listing 
   */
  async deleteListing(id: number) {
    try {
      const response = await fetch(`/listings/${id}`, {
        method: "delete",
      });
      if (response.status !== 200) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }
}
