import { action, runInAction } from "mobx";
import { observable, makeObservable } from "mobx";
import { ImageListType } from "react-images-uploading";
import { AddressDetails } from "../ui/base/address_form/AddressForm";
import { resizeFile } from "../ui/util/helper";

export type ListingDetails = {
  id: number | null;
  title: string;
  description: string;
  type: string;
  num_bedrooms: number | null;
  num_bathrooms: number | null;
  num_car_spaces: number | null;
  images: string[];
  features: string[];
};

export type AuctionDetails = {
  auction_start: Date | null;
  auction_end: Date | null;
  reserve_price: string;
};

export type PaymentDetails = {
  account_name: string;
  bsb: string;
  account_number: string;
};

/**
 * Helper function to get the address of a listing
 * @param result
 */
const getAddressFromResult = (result: any) => ({
  street: result.street,
  suburb: result.suburb,
  postcode: result.postcode,
  state: result.state,
  country: result.country,
});

/**
 * Helper function to get listing details
 * @param result
 */
const getListingFromResult = (result: any) => ({
  id: parseInt(result.id),
  type: result.type,
  title: result.title,
  description: result.description,
  num_bedrooms: result.num_bedrooms,
  num_bathrooms: result.num_bathrooms,
  num_car_spaces: result.num_car_spaces,
  images: result["image_ids"].map(
    (id: any) => `/listings/${result.id}/images/${id}`
  ),
  features: result.features,
});

/**
 * Helper functino to get auction details
 * @param result
 */
const getAuctionFromResult = (result: any) => ({
  auction_start: new Date(result.auction_start),
  auction_end: new Date(result.auction_end),
  reserve_price: result.reserve_price.toString(),
});

/**
 * Helper function to get payment details
 * @param result
 */
const getPaymentFromResult = (result: any) => ({
  account_name: result.account_name,
  bsb: result.bsb,
  account_number: result.account_number,
});

export class ListingStore {
  // Initiate with Australia and NSW
  @observable address: AddressDetails = {
    street: "",
    suburb: "",
    postcode: "",
    state: "NSW",
    country: "Australia",
  };
  @observable listing: ListingDetails = {
    id: null,
    title: "",
    description: "",
    type: "",
    num_bedrooms: null,
    num_bathrooms: null,
    num_car_spaces: null,
    images: [],
    features: [],
  };

  @observable payment: PaymentDetails = {
    account_name: "",
    bsb: "",
    account_number: "",
  };

  @observable auction: AuctionDetails = {
    auction_start: null,
    auction_end: null,
    reserve_price: "",
  };

  @observable auctionState: string = "pre-auction";
  @observable imageList: ImageListType = [];
  @observable imagesToDelete: string[] = [];
  constructor() {
    makeObservable(this);
  }
}

export class ListingPresenter {
  /**
   * Get listing information from the backend given a listing ID
   * @param store
   * @param listing_id
   * @param onError
   */
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
      if ("detail" in result) {
        onError();
      } else {
        const listing: ListingDetails = getListingFromResult(result);
        const address: AddressDetails = getAddressFromResult(result);
        const auction: AuctionDetails = getAuctionFromResult(result);
        const payment: PaymentDetails = getPaymentFromResult(result);
        const auctionState =
          new Date().getTime() >= (auction.auction_start as Date).getTime()
            ? "ongoing-auction"
            : "pre-auction";
        runInAction(() => {
          store.listing = listing;
          store.address = address;
          store.auction = auction;
          store.payment = payment;
          store.auctionState = auctionState;
        });
      }
    } catch (e) {
      onError();
    }
  }

  /**
   * Send listing information to the backend when user creates a new listing
   * @param store
   * @param onSuccess
   * @param onError
   */
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
          type: store.listing.type.toLowerCase(),
          title: store.listing.title,
          description: store.listing.description,
          street: store.address.street,
          suburb: store.address.suburb,
          postcode: store.address.postcode,
          state: store.address.state,
          country: store.address.country,
          features: store.listing.features,
          num_bedrooms: store.listing.num_bedrooms,
          num_bathrooms: store.listing.num_bathrooms,
          num_car_spaces: store.listing.num_car_spaces,
          auction_start: store.auction.auction_start?.toISOString(),
          auction_end: store.auction.auction_end?.toISOString(),
          reserve_price: parseInt(store.auction.reserve_price),
          account_name: store.payment.account_name,
          bsb: store.payment.bsb,
          account_number: store.payment.account_number,
        }),
      });
      const result = await response.json();
      if ("detail" in result) {
        onError();
        return;
      }
      store.listing.id = result.id;

      let form = new FormData();
      const data = await Promise.all(
        store.imageList.map(async (image) => {
          const resized = await resizeFile(image.file as File);
          const buffer = await (resized as Blob).arrayBuffer();
          return {
            data: buffer,
            type: (image.file as any).type,
          };
        })
      );
      data.forEach((image) => {
        form.append("files", new Blob([image.data], { type: image.type }));
      });
      try {
        const response = await fetch(`/listings/${store.listing.id}/images`, {
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

  /**
   * Update backend to reflect changes made to listings made by users
   * @param store
   * @param onSuccess
   * @param onError
   */
  @action
  async updateListing(
    store: ListingStore,
    onSuccess: () => void,
    onError: () => void
  ) {
    try {
      // Update listing information
      const response = await fetch(
        `/listings/${store.listing.id?.toString()}`,
        {
          method: "post",
          body: JSON.stringify({
            type: store.listing.type.toLowerCase(),
            title: store.listing.title,
            description: store.listing.description,
            street: store.address.street,
            suburb: store.address.suburb,
            postcode: store.address.postcode,
            state: store.address.state,
            country: store.address.country,
            features: store.listing.features,
            num_bedrooms: store.listing.num_bedrooms,
            num_bathrooms: store.listing.num_bathrooms,
            num_car_spaces: store.listing.num_car_spaces,
            auction_start: store.auction.auction_start?.toISOString(),
            auction_end: store.auction.auction_end?.toISOString(),
            reserve_price: store.auction.reserve_price,
            account_name: store.payment.account_name,
            bsb: store.payment.bsb,
            account_number: store.payment.account_number,
          }),
        }
      );
      const result = await response.json();
      if ("detail" in result) {
        onError();
        return;
      }

      console.log("HERE??");
      if (store.imageList.length > 0) {
        let form = new FormData();
        const data = await Promise.all(
          store.imageList.map(async (image) => {
            const resized = await resizeFile(image.file as File);
            const buffer = await (resized as Blob).arrayBuffer();
            return {
              data: buffer,
              type: (image.file as any).type,
            };
          })
        );
        data.forEach((image) => {
          form.append("files", new Blob([image.data], { type: image.type }));
        });
        const imageResponse = await fetch(
          `/listings/${store.listing.id}/images`,
          {
            method: "post",
            body: form,
          }
        );
        if (imageResponse.status !== 200) {
          onError();
          return;
        }
      }
      // Upload new photos

      console.log(store.imagesToDelete, store.imagesToDelete.length);
      // Delete Images from previous publish
      for (var i = 0; i < store.imagesToDelete.length; ++i) {
        //  Get the image id from the string (eg listing/images/85 --> finds 85)
        var url_length = store.imagesToDelete[i].length;
        var j = url_length;
        while (store.imagesToDelete[i][j] !== "/") --j;
        const image_id = store.imagesToDelete[i].slice(j, url_length);
        console.log(image_id);
        const imageResponse = await fetch(
          `/listings/${store.listing.id}/images/${image_id}`,
          {
            method: "delete",
          }
        );
        if (imageResponse.status !== 200) {
          onError();
          return;
        }
      }

      // Everything has been done
      onSuccess();
    } catch {
      onError();
      return;
    }
  }
}
