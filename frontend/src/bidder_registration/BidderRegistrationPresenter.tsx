import { action, makeObservable, observable, runInAction } from "mobx";
import { delay } from "../ui/util/helper";
import { fetchListing } from "../ui/util/fakes/listing";
import { createFakeBid } from "../ui/util/fakes/bid";
import { Bid } from "../ui/util/types/bid";
import { Listing } from "../ui/util/types/listing";
export class BidderRegistrationStore {
  @observable
  initialBid: number = 0;

  @observable
  cardNumber: string = "";

  @observable
  expiryDate: string = "";

  @observable
  ccv: string = "";

  @observable
  agreeToTerms: boolean = false;

  @observable
  loadingState?: "loading" | "loaded" | "error";

  @observable
  listing?: Listing;

  @observable
  currentBid?: number;

  constructor() {
    makeObservable(this);
  }
}

export class BidderRegistrationPresenter {
  @action
  async loadInformation(store: BidderRegistrationStore, listing_id: number) {
    store.loadingState = "loading";
    try {
      const [listing, bid] = await Promise.all([
        this.fetchListing(listing_id),
        this.fetchBid(listing_id),
      ]);
      runInAction(() => {
        store.listing = listing;
        store.currentBid = bid.bid;
        store.loadingState = "loaded";
      });
    } catch {
      runInAction(() => (store.loadingState = "error"));
    }
  }

  private fetchListing(listingId: number): Promise<Listing> {
    return delay(400).then(() => fetchListing(listingId));
  }

  private fetchBid(listingId: number): Promise<Bid> {
    return delay(300).then(() => createFakeBid({ listing_id: listingId }));
  }
}
