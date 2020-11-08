import { action } from "mobx";
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
        onError();
        return;
      }
      store.id = result.id;

      let form = new FormData();
      const data = await Promise.all(
        store.images.map((image) =>
          (image.file as any).arrayBuffer().then((buffer: any) => ({
            data: buffer,
            type: (image.file as any).type,
          }))
        )
      );
      data.forEach((image) => {
        form.append("files", new Blob([image.data], { type: image.type }));
      });
      try {
        const response = await fetch(`/listings/${store.id}/images`, {
          method: "post",
          body: form,
        });
        if (response.status !== 200) {
          onError();
          return;
        }
        onSuccess();
      } catch (e) {
        onError();
        return;
      }
    } catch (e) {
      onError();
    }
  }
}
