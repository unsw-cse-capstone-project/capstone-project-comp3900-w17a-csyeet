import { action, makeObservable, observable } from "mobx";
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
    // store.loadingState = "loading";
    // try {
    //   const listing = await fetch(`/registrations/${listing_id}`, {method: "post",
    //   body: JSON.stringify({ bid: store.initialBid, card_number: store.cardNumber}),
    // });
    //   const data = await listing.json
    //   runInAction(() => {
    //     store.listing = JSON.parse(listing.);
    //     store.loadingState = "loaded";
    //   });
    // } catch {
    //   runInAction(() => (store.loadingState = "error"));
    // }
  }
}
