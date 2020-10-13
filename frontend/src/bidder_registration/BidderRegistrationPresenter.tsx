import { action, makeObservable, observable, runInAction } from "mobx";
import { delay } from "../ui/util/helper";
import { fetchListing } from "../ui/util/fakes/listing";
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

  constructor() {
    makeObservable(this);
  }
}

export class BidderRegistrationPresenter {
  @action
  async loadInformation(store: BidderRegistrationStore, listing_id: number) {
    store.loadingState = "loading";
    try {
      const listing = await this.fetchListing(listing_id);
      runInAction(() => {
        store.listing = listing;
        store.loadingState = "loaded";
      });
    } catch {
      runInAction(() => (store.loadingState = "error"));
    }
  }

  private fetchListing(listingId: number): Promise<Listing> {
    return delay(400).then(() => fetchListing(listingId));
  }
}
