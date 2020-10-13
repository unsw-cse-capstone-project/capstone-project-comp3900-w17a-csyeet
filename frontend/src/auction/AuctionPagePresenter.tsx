import { observable, makeObservable, action, runInAction } from "mobx";
import { createFakeBid } from "../ui/util/fakes/bid";
import { fetchListing } from "../ui/util/fakes/listing";
import { delay } from "../ui/util/helper";
import { Bid } from "../ui/util/types/bid";
import { Listing } from "../ui/util/types/listing";

export class AuctionPageStore {
  @observable
  loadingState?: "loading" | "loaded" | "error";

  @observable
  listing?: Listing;

  @observable
  bids: Bid[] = [];

  constructor() {
    makeObservable(this);
  }
}

export class AuctionPagePresenter {
  @action
  async loadInformation(store: AuctionPageStore, listing_id: number) {
    store.loadingState = "loading";
    try {
      const [listing, bids] = await Promise.all([
        this.fetchListing(listing_id),
        this.fetchBids(listing_id),
      ]);
      runInAction(() => {
        store.listing = listing;
        store.bids = bids;
        store.loadingState = "loaded";
      });
    } catch {
      runInAction(() => (store.loadingState = "error"));
    }
  }

  private fetchListing(listingId: number): Promise<Listing> {
    return delay(400).then(() => fetchListing(listingId));
  }

  private fetchBids(listingId: number): Promise<Bid[]> {
    return delay(300).then(() =>
      [0, 1, 2].map((i) =>
        createFakeBid({
          listing_id: listingId,
          bidder_id: 100 + i,
          bid: 1000000 - 50000 * i,
          submitted: new Date("October 9, 2020 " + (11 - i) + ":00:00"),
        })
      )
    );
  }

  @action
  placeBid(store: AuctionPageStore, bid: Bid) {
    store.bids = [bid, ...store.bids];
  }
}
