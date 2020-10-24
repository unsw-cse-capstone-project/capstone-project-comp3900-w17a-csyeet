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
      if (listing === undefined || bids === undefined) {
        console.log('here')
        runInAction(() => (store.loadingState = "error"));
        return;
      }
      runInAction(() => {
        store.listing = listing;
        store.bids = bids;
        store.loadingState = "loaded";
      });
    } catch (e){
      console.log(e)
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

  private async fetchBids(listingId: number): Promise<Bid[] | undefined> {
    const response = await fetch(`/listings/${listingId}/auction`);
    const result = await response.json();
    if ("detail" in result) {
      return undefined;
    }
    const bids: Bid[] = result.bids.map((b: any) => ({
      bid: b.bid,
      bidder_id: b.bidder_id,
      placed_at: new Date(b.placed_at),
      reserve_met: b.reserve_met,
    }))
    return bids;
  }

  @action
  placeBid(store: AuctionPageStore, bid: number) {
    // store.bids = [bid, ...store.bids];
  }
}
