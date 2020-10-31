import { action, makeObservable, observable, runInAction } from "mobx";
import { ListingStore } from "./ListingStore";
import { getListingFromResult } from "../ui/util/helper";
import { ListingActual } from "../ui/util/types/listing";

const setResultsInStore = action((store: ListingStore, result: any) => {});

export class ListingPresenter {
  @action
  async fetchListing(store: ListingStore, listing_id: number) {
    store.status = "loading";
    try {
      const response = await fetch(`/listings/${listing_id}`);
      const result = await response.json();

      // Error Handling
      if ("detail" in result) {
        runInAction(() => (store.state = "error"));
      } else {
        setResultsInStore(store, result);
        runInAction(() => (store.state = "edit"));
      }
    } catch {
      runInAction(() => (store.state = "error"));
    }
  }

  @action
  async publishListing(store: ListingStore, onSuccess: () => void) {
    store.status = "publishing";
    try {
      const response = await fetch(`/listings/`, {
        method: "post",
        body: JSON.stringify({
          type: store.type,
          title: store.descTitle,
          description: store.desc,
          street: store.street,
          suburb: store.suburb,
          postcode: store.postcode,
          state: store.state,
          country: store.country,
          num_bedrooms: store.nBedrooms,
          num_bathrooms: store.nBathrooms,
          num_car_spaces: store.nGarages,
          auction_start: store.auctionStart?.toString(), // Not null
          auction_end: store.auctionEnd?.toString(), // Not null
          features: store.features,
          reserve_price: store.reservePrice,
          account_name: store.accName,
          bsb: store.bsb,
          account_number: store.accNumber,
        }),
      });
      const result = await response.json();
      if ("detail" in result) {
        runInAction(() => (store.status = "error"));
      } else {
        runInAction(() => {
          store.status = "success";
          store.id = result.id;
        });
        onSuccess();
      }
    } catch {
      runInAction(() => (store.state = "error"));
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
}
