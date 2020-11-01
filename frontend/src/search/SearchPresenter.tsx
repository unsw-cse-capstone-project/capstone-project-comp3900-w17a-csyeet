import { action, makeObservable, observable, runInAction } from "mobx";
import { ListingActual } from "../ui/util/types/listing";
import { getListingFromResult } from '../ui/util/helper';

export class SearchStore {
  @observable
  input: string = "";

  @observable
  searchResults: ListingActual[] = [];

  @observable
  searchState?: "loading" | "loaded" | "error";

  continuation?: string;

  constructor(query?: string) {
    makeObservable(this);
    this.input = query ? query : "";
  }
}

export class SearchPresenter {
  @action
  async search(store: SearchStore) {
    if (!store.continuation) {
      runInAction(() => {store.searchState = "loading"});
    }
    // console.log('searching...')
    const continuation = store.continuation? `&continuation=${store.continuation}`: ""; 
    try {
      const response = await fetch(`/listings/?location=${store.input}${continuation}&limit=2`);
      const content = await response.json();
      console.log(content);
      if ("detail" in content) {
        runInAction(() => {
          store.searchState = "error";
        });
      } else {
        const results: ListingActual[] = content.results.map((result: any) => getListingFromResult(result));
        runInAction(() => {
          store.searchResults = [...store.searchResults, ...results];
          store.searchState = "loaded";
          store.continuation = content.continuation;
        });
      }
    } catch {
      console.log("aww error");
    }
  }
}
