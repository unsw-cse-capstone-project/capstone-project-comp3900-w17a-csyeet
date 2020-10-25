import { action, makeObservable, observable, runInAction } from "mobx";
import { ListingActual } from "../ui/util/types/listing";
import { createFakeListing } from "../ui/util/fakes/listing";
import { getListingFromResult } from '../ui/util/helper';

export class SearchStore {
  @observable
  input: string = "";

  @observable
  searchResults: ListingActual[] = [];

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
    try {
      const response = await fetch(`/listings/?location=${store.input}`);
      const content = await response.json();
      if ("detail" in content) {
        console.log("error", content.detail);
        runInAction(() => {
          store.searchState = "loaded";
        });
      } else {
        const results: ListingActual[] = content.results.map((result: any) => getListingFromResult(result));
        console.log(results);
        runInAction(() => {
          store.searchResults = results;
          store.searchState = "loaded";
        });
      }
    } catch {
      console.log("aww error");
    }
  }
}
