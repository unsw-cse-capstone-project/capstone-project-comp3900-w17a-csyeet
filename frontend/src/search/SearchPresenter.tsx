import { action, makeObservable, observable, runInAction } from "mobx";
import { delay } from "../ui/util/helper";
import { createFakeListing } from "../ui/util/fakes/listing";
import { Listing } from "../ui/util/types/listing";

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
    await delay(400);
    runInAction(() => {
      store.searchResults = [
        createFakeListing({ street: "1 Street St" }),
        createFakeListing({ street: "2 Street St" }),
        createFakeListing({ street: "3 Street St" }),
      ];
      console.log(store.searchResults);
      store.searchState = "loaded";
    });
  }
}
