import { action, makeObservable, observable, runInAction } from "mobx";
import { Listing } from "../ui/util/types/listing";
import { delay } from "../ui/util/helper";
import { createFakeListing } from "../ui/util/fakes/listing";
export class SearchStore {
  @observable
  input: string = "";

  @observable
  searchResults: Listing[] = [];

  @observable
  searchState?: "loading" | "loaded" | "error";

  constructor() {
    makeObservable(this);
  }
}

export class SearchPresenter {
  @action
  async search(store: SearchStore) {
    store.searchState = "loading";
    await delay(200);
    runInAction(() => {
      store.searchResults = Array(3).map((i) =>
        createFakeListing({ street: i + " Street St" })
      );
      store.searchState = "loaded";
    });
  }
}
