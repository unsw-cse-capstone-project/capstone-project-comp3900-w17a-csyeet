import { observable, makeObservable, action, runInAction } from "mobx";
import { createFakeListing } from "../ui/util/fakes/listing";
import { ListingActual } from "../ui/util/types/listing";
import { delay } from '../ui/util/helper';

export class ListingPageStore {
  @observable
  loadingState?: "loading" | "loaded" | "error";

  @observable
  listing?: ListingActual;

  constructor() {
    makeObservable(this);
  }
}

export class ListingPagePresenter {
  @action
  async loadInformation(store: ListingPageStore, id: number) {
    store.loadingState = "loading";
    try {
      const response = await fetch(`/listings/${id}`);
      const result = await response.json();

      if ("detail" in result) {
        // handle error
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

  async deleteListing() {
    console.log('Deleting...');
    await delay(300);
    console.log('Deleting complete');
  }
}
