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
      // Publish Listing
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
          auction_start: store.auctionStart?.toISOString(),
          auction_end: store.auctionEnd?.toISOString(),
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

      // Upload Images
      let form = new FormData();
      for (let i = 0; i < store.images.length; ++i) {
        form.append("listing-img-" + { i }, store.images[i].file as File);
      }
      const img_response = await fetch(`/listings/${result.id}/images`, {
        method: "post",
        body: form,
      });
      const img_result = await img_response.json();
      if ("detail" in img_result) {
        console.log(result);
        onError();
        return;
      }
      // Success
      onSuccess();
    } catch {
      onError();
    }
  }
}
