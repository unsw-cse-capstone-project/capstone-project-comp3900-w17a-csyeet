import { observable, action, runInAction, makeObservable } from "mobx";
import { ListingActual } from "../../ui/util/types/listing";
import { getListingFromResult } from "../../ui/util/helper";

export class RecommendationsStore {
  @observable
  state?: "loading" | "loaded" | "error";

  @observable
  recommendations: ListingActual[] = [];

  constructor() {
    makeObservable(this);
  }
}

export class RecommendationsPresenter {
  /**
   * 
   * @param store 
   * Load recommendations from the backend
   */
  @action
  async loadRecommendations(store: RecommendationsStore) {
    try {
      store.state = "loading";
      const response = await fetch("/recommendations/interactions");
      const results = await response.json();
      runInAction(() => {
        store.recommendations = results.recommendations.map((result: any) =>
          getListingFromResult(result)
        );
        store.recommendations = [
          ...store.recommendations,
          ...store.recommendations,
          ...store.recommendations,
          ...store.recommendations,
          ...store.recommendations,
        ];
        store.state = "loaded";
      });
    } catch {
      runInAction(() => (store.state = "error"));
    }
  }
}
