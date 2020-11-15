import { ListingActual } from "../../ui/util/types/listing";
import { makeObservable, observable, runInAction } from "mobx";
import { getListingFromResult } from "../../ui/util/helper";

/**
 * Store for upcoming auctions component
 */
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
  /**
   * @param store 
   * @param numCardsPerRow 
   * 
   * Loads the upcoming auctions and sets the listing in the store
   * in ascending order of auction_start
   */
  async loadUpcomingAuctions(
    store: UpcomingAuctionsStore,
    numCardsPerRow: number
  ) {
    const auctionStart = new Date().toISOString();
    const continuation = store.continuation
      ? `&continuation=${store.continuation}`
      : "";
    try {
      const response = await fetch(
        `/listings/?auction_start=${auctionStart}&limit=5&is_user_query=false${continuation}`
      );
      const results = await response.json();
      runInAction(() => {
        store.state = "loaded";
        store.listings = [
          ...store.listings,
          ...results.results.map((result: any) => getListingFromResult(result)),
        ];
        store.listings = store.listings.sort((a, b) => a.auction_start.getTime() - b.auction_start.getTime());
        store.continuation = results.continuation;
      });
    } catch {
      runInAction(() => (store.state = "error"));
    }
  }
}
