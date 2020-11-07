import { action, runInAction } from "mobx";
import { ListingStore } from "./ListingStore";

const setResultsInStore = action((store: ListingStore, result: any) => {});

export class ListingPresenter {
  @action
  async fetchListing(
    store: ListingStore,
    listing_id: number,
    onError: () => void
  ) {
    try {
      const response = await fetch(`/listings/${listing_id}`);
      const result = await response.json();

      // Error Handling
      if ("detail" in result) onError();
      else setResultsInStore(store, result);
    } catch {
      onError();
    }
  }

  @action
  async publishListing(
    store: ListingStore,
    onSuccess: () => void,
    onError: () => void
  ) {
    try {
      const response = await fetch(`/listings/`, {
        method: "post",
        body: JSON.stringify({
          type: store.type.toLowerCase(),
          title: store.descTitle,
          description: store.desc,
          street: store.street,
          suburb: store.suburb,
          postcode: store.postcode,
          state: store.state
            .split(" ")
            .map((word) => word[0])
            .join(""),
          country: store.country,
          num_bedrooms: store.nBedrooms,
          num_bathrooms: store.nBathrooms,
          num_car_spaces: store.nGarages,
          auction_start: store.auctionStart?.toISOString(), // Not null
          auction_end: store.auctionEnd?.toISOString(), // Not null
          features: store.features,
          reserve_price: store.reservePrice,
          account_name: store.accName,
          bsb: store.bsb,
          account_number: store.accNumber,
        }),
      });
      const result = await response.json();
      if ("detail" in result) {
        console.log(result);
        onError();
        return;
      }
      runInAction(() => {
        store.id = result.id;
      });
      onSuccess();
    } catch {
      onError();
    }
  }

  // Need function to upload images (Annisa said we could do multiple at a time)
  // Uploading Images, I'm not sure waht type she used...
  //
  // Currently it's stored as "ImageListType"
  //   export interface ImageType {
  //   dataURL?: string;
  //   file?: File;
  //   [key: string]: any;
  // }
  // export type ImageListType = Array<ImageType>;
  //
  // Later on, need a function for updating listing (not for the first time)
  // Later on, need a function for fetchListingData (by ID) i suppose.. which will be passed in as a prop
}
