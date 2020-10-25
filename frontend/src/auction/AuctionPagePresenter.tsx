import { observable, makeObservable, action, runInAction } from "mobx";
import { createFakeBid } from "../ui/util/fakes/bid";
import {
  fetchListing,
  createFakeActualListing,
  createFakeListing,
} from "../ui/util/fakes/listing";
import { delay, getListingFromResult } from '../ui/util/helper';
import { Bid } from "../ui/util/types/bid";
import { ListingActual } from "../ui/util/types/listing";

export class AuctionPageStore {
  @observable
  loadingState?: "loading" | "loaded" | "error";

  @observable
  listing?: ListingActual;

  @observable
  bids: Bid[] = [];

  @observable
  bidMakingStatus?: "submitting" | "error" | "success";

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
        runInAction(() => (store.loadingState = "error"));
        return;
      }
      runInAction(() => {
        store.listing = listing;
        store.bids = bids;
        store.loadingState = "loaded";
      });
    } catch (e) {
      console.log(e);
      runInAction(() => (store.loadingState = "error"));
    }
  }

  private async fetchListing(
    listingId: number
  ): Promise<ListingActual | undefined> {
    const response = await fetch(`/listings/${listingId}`);
    const result = await response.json();
    if ("detail" in result) {
      return undefined;
    }
    const listing: ListingActual = getListingFromResult(result);
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
    }));
    return bids;
  }

  @action
  async placeBid(store: AuctionPageStore, bid: number, onSuccess: () => void) {
    store.bidMakingStatus = "submitting";
    try {
      const response = await fetch(
        `/listings/${store.listing?.id}/auction/bid`,
        {
          method: "post",
          body: JSON.stringify({ bid: bid }),
        }
      );
      const result = await response.json();
      if ("detail" in result) {
        runInAction(() => (store.bidMakingStatus = "error"));
        return;
      }
      if (!store.listing || store.listing === undefined) {
        return;
      }
      const newBid: Bid = {
        bid: bid,
        bidder_id: result.bidder_id,
        placed_at: new Date(result.placed_at),
        reserve_met: result.reserve_met,
      };
      runInAction(() => {
        store.bidMakingStatus = "success";
        store.bids = [newBid, ...store.bids];
        (store.listing as ListingActual).auction_end = new Date(
          result.auction_end
        );
        onSuccess();
      });
    } catch {
      runInAction(() => (store.bidMakingStatus = "error"));
    }
  }
}
