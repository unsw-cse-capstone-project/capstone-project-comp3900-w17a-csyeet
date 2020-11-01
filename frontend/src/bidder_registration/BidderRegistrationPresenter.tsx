import { action, makeObservable, observable, runInAction } from "mobx";
import { ListingActual } from "../ui/util/types/listing";
import { getListingFromResult } from "../ui/util/helper";
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
  submitState?: "submitting" | "error" | "success";

  @observable
  listing?: ListingActual;

  constructor() {
    makeObservable(this);
  }
}

export class BidderRegistrationPresenter {
  @action
  async loadInformation(store: BidderRegistrationStore, listing_id: number) {
    store.loadingState = "loading";
    try {
      const response = await fetch(`/listings/${listing_id}`);
      const result = await response.json();

      if ("detail" in result) {
        // handle error
        runInAction(() => (store.loadingState = "error"));
        console.log("error " + result.detail);
      } else {
        const results: ListingActual = getListingFromResult(result);

        runInAction(() => {
          store.listing = results;
          store.loadingState = "loaded";
        });
      }
    } catch {
      runInAction(() => (store.loadingState = "error"));
    }
  }

  @action
  async submit(store: BidderRegistrationStore, afterSubmit: () => void) {
    store.submitState = "submitting";
    const expiryDate = new Date(
      parseInt(store.expiryDate.slice(2)) + 2000,
      parseInt(store.expiryDate.slice(0, 2)) - 1,
      0
    );
    try {
      const response = await fetch(`/registrations/${store.listing?.id}`, {
        method: "post",
        body: JSON.stringify({
          bid: store.initialBid,
          card_number: store.cardNumber,
          expiry: expiryDate.toISOString(),
          ccv: store.ccv,
        }),
      });
      const result = await response.json();
      if ("detail" in result) {
        // handle error
        runInAction(() => (store.loadingState = "error"));
        console.log("error " + result.detail);
      } else {
        runInAction(() => {
          store.submitState = "success";
          if (store.listing) {
            store.listing.auction_end = new Date(result.auction_end);
          }
        });
        afterSubmit();
      }
    } catch {
      runInAction(() => (store.submitState = "error"));
    }
  }
}
