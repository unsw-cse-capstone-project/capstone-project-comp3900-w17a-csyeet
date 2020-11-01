import { action, makeObservable, observable, runInAction } from "mobx";
import { ListingActual } from "../ui/util/types/listing";
import { Filters } from "../ui/util/types/filters";
import { getListingFromResult } from '../ui/util/helper';

export class SearchStore {
  @observable
  input: string = "";

  @observable
  filters: Filters = {
    type: undefined,
    beds: undefined,
    baths: undefined,
    cars: undefined,
    features: undefined,
    start_date: undefined,
    end_date: undefined,
    landmarks: undefined,
  };

  @observable
  searchResults: ListingActual[] = [];

  @observable
  searchState?: "loading" | "loaded" | "error";

  constructor(
    query?: string,
    type?: string,
    beds?: number,
    baths?: number,
    cars?: number,
    start?: string,
    end?: string,
    features?: string[],
    landmarks?: string[],
  ) {
    makeObservable(this);
    this.input = query ? query : "";
    this.filters = {
      type,
      beds,
      baths,
      cars,
      start_date: start ? new Date(start) : undefined,
      end_date: end ? new Date(end) : undefined,
      features,
      landmarks,
    };
  }
}

export class SearchPresenter {
  @action
  async search(store: SearchStore) {
    store.searchState = "loading";

    const { type, beds, baths, cars, start_date, end_date, features, landmarks } = store.filters;
    // Parse through filters and format into a query string
    let searchQuery = `?location=${store.input}`;
    searchQuery += type ? `&type=${type}` : "";
    searchQuery += beds ? `&num_bedrooms=${beds}` : "";
    searchQuery += baths ? `&num_bathrooms=${baths}` : "";
    searchQuery += cars ? `&num_car_spaces=${cars}` : "";
    searchQuery += start_date ? `&auction_start=${start_date.toISOString()}` : "";
    searchQuery += end_date ? `&auction_end=${end_date.toISOString()}` : "";
    features && features.map(feature => searchQuery += `&features=${feature}`);
    landmarks && landmarks.map(landmark => searchQuery += `&landmarks=${landmark}`);
    // future to add:
    // - include closed auctions
    // - limit
    // - continuation
    console.log(searchQuery);


    try {
      // Change this to add the filters
      const response = await fetch(`/listings/${searchQuery}`);
      const content = await response.json();
      if ("detail" in content) {
        console.log("error", content.detail);
        runInAction(() => {
          store.searchState = "loaded";
        });
      } else {
        const results: ListingActual[] = content.results.map((result: any) => getListingFromResult(result));
        runInAction(() => {
          store.searchResults = results;
          store.searchState = "loaded";
        });
      }
    } catch {
      console.log("aww error");
    }
  }
}
