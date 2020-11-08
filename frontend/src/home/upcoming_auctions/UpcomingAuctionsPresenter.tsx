import { ListingActual } from "../../ui/util/types/listing";
import { makeObservable, observable, runInAction } from "mobx";
import { getListingFromResult } from "../../ui/util/helper";
export class UpcomingAuctionsStore {
  @observable
  state: "loading" | "loaded" | "error" = "loading";

  @observable
  listings: ListingActual[] = [];

  continuation?: string;

  constructor() {
    makeObservable(this);
  }
}

export class UpcomingAuctionPresenter {
  async loadUpcomingAuctions(store: UpcomingAuctionsStore) {
    const auctionStart = new Date(
      new Date().getTime() + 86400000
    ).toISOString();
    const continuation = store.continuation
      ? `&continuation=${store.continuation}`
      : "";
    try {
      const response = await fetch(
        `/listings/?auction_start=${auctionStart}&limit=6&include_closed_auctions=true${continuation}`
      );
      const results = await response.json();
      runInAction(() => {
        store.state = "loaded";
        store.listings = [
          ...store.listings,
          ...results.results.map((result: any) => getListingFromResult(result)),
        ];
        store.continuation = results.continuation;
      });
    } catch {
      runInAction(() => (store.state = "error"));
    }
  }
}
