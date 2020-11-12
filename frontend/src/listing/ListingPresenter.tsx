import { action, runInAction } from "mobx";
import { observable, makeObservable } from "mobx";
import { ImageListType } from "react-images-uploading";
import { AddressDetails } from "../ui/base/address_form/AddressForm";

export type ListingDetails = {
  id: number | null;
  title: string;
  description: string;
  type: string;
  num_bedrooms: number;
  num_bathrooms: number;
  num_car_spaces: number;
  images: string[];
  features: string[];
};

export type AuctionDetails = {
  confirmed_auction_start: Date | null;
  auction_start: Date | null;
  auction_end: Date | null;
  reserve_price: string;
};

export type PaymentDetails = {
  account_name: string;
  bsb: string;
  account_number: string;
};
const getAddressFromResult = (result: any) => ({
  street: result.street,
  suburb: result.suburb,
  postcode: result.postcode,
  state: result.state,
  country: result.country,
});
const getListingFromResult = (result: any) => ({
  id: parseInt(result.id),
  type: result.type,
  title: result.title,
  description: result.description,

  num_bedrooms: result.num_bedrooms,
  num_bathrooms: result.num_bathrooms,
  num_car_spaces: result.num_car_spaces,
  auction_start: new Date(result.auction_start),
  auction_end: new Date(result.auction_end),
  images: result["image_ids"].map(
    (id: any) => `/listings/${result.id}/images/${id}`
  ),
  features: result.features,
});

const getAuctionFromResult = (result: any) => ({
  confirmed_auction_start: result.auction_start,
  auction_start: result.auction_start,
  auction_end: result.auction_end,
  reserve_price: result.reserve_price.toString(),
});

const getPaymentFromResult = (result: any) => ({
  account_name: result.account_name || "Jane Doe",
  bsb: result.bsb || "123456",
  account_number: result.account_number || "12345678",
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
    num_bedrooms: 0,
    num_bathrooms: 0,
    num_car_spaces: 0,
    images: [],
    features: [],
  };

  @observable payment: PaymentDetails = {
    account_name: "",
    bsb: "",
    account_number: "",
  };

  @observable auction: AuctionDetails = {
    confirmed_auction_start: null,
    auction_start: null,
    auction_end: null,
    reserve_price: "",
  };

  @observable imageList: ImageListType = [];

  constructor() {
    makeObservable(this);
  }
}

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
      if ("detail" in result) {
        onError();
      } else {
        const listing: ListingDetails = getListingFromResult(result);
        const address: AddressDetails = getAddressFromResult(result);
        const auction: AuctionDetails = getAuctionFromResult(result);
        const payment: PaymentDetails = getPaymentFromResult(result);
        runInAction(() => {
          store.listing = listing;
          store.address = address;
          store.auction = auction;
          store.payment = payment;
        });
      }
    } catch (e) {
      console.log(e);
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
        store.imageList.map((image) =>
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

  @action
  async updateListing(
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
          state: store.address.state
            .split(" ")
            .map((word) => word[0])
            .join(""),
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
      });
      const result = await response.json();
      if ("detail" in result) {
        onError();
        return;
      }
      runInAction(() => {
        store.listing.id = result.id;
      });
      onSuccess();
    } catch {
      onError();
    }
  }
}
