import { action, makeObservable, observable, runInAction } from "mobx";
import {
  createFakeListing,
  createFakeActualListing,
} from "../ui/util/fakes/listing";
import { Listing, ListingActual } from "../ui/util/types/listing";
import { delay } from "../ui/util/helper";
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
        const results: ListingActual = {
          type: result.type,
          id: parseInt(result.id),
          owner: {
            email: result.owner.email,
            name: result.owner.name,
          },
          title: result.title,
          description: result.description,
          street: result.street,
          suburb: result.suburb,
          postcode: result.postcode,
          state: result.state,
          country: result.country,
          num_bedrooms: parseInt(result.num_bedrooms),
          num_bathrooms: parseInt(result.num_bathrooms),
          num_car_spaces: parseInt(result.num_car_spaces),
          auction_start: new Date(result.auction_start),
          auction_end: new Date(result.auction_end),
          images: createFakeListing().images,
          landmarks: result.landmarks,
          features: result.features,
          starred: false,
          registered_bidder: false,
        };

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
        runInAction(() => (store.submitState = "success"));
        afterSubmit();
      }
    } catch {
      runInAction(() => (store.submitState = "error"));
    }
  }
}
