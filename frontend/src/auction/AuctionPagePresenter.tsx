import { observable, makeObservable, action, runInAction } from "mobx";
import { createFakeBid } from "../ui/util/fakes/bid";
import { fetchListing, createFakeActualListing, createFakeListing } from '../ui/util/fakes/listing';
import { delay } from "../ui/util/helper";
import { Bid } from "../ui/util/types/bid";
import { ListingActual } from '../ui/util/types/listing';

export class AuctionPageStore {
  @observable
  loadingState?: "loading" | "loaded" | "error";

  @observable
  listing?: ListingActual;

  @observable
  bids: Bid[] = [];

  constructor() {
    makeObservable(this);
  }
}

export class AuctionPagePresenter {
  @action
  async loadInformation(store: AuctionPageStore, listing_id: number) {
    store.loadingState = "loading";
    try {
      const [listing, bids] = await Promise.all([
        this.fetchListing(listing_id),
        this.fetchBids(listing_id),
      ]);
      if (listing === undefined || bids === undefined)
      runInAction(() => {
        store.listing = listing;
        store.bids = bids;
        store.loadingState = "loaded";
      });
    } catch {
      runInAction(() => (store.loadingState = "error"));
    }
  }

  private async fetchListing(listingId: number): Promise<ListingActual | undefined> {
    const response = await fetch(`/listings/${listingId}`);
    const result = await response.json();
    if ("detail" in result) {
      return undefined;
    }
    const listing: ListingActual = {
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
    return listing;
  }

  private fetchBids(listingId: number): Promise<Bid[]> {
    return delay(300).then(() =>
      [0, 1, 2].map((i) =>
        createFakeBid({
          listing_id: listingId,
          bidder_id: 100 + i,
          bid: 1000000 - 50000 * i,
          submitted: new Date("October 9, 2020 " + (11 - i) + ":00:00"),
        })
      )
    );
  }

  @action
  placeBid(store: AuctionPageStore, bid: Bid) {
    store.bids = [bid, ...store.bids];
  }
}
