import { action, makeObservable, observable, runInAction } from "mobx";
import { ListingActual } from "../ui/util/types/listing";
import { Filters } from "../ui/util/types/filters";
import { createFakeListing } from "../ui/util/fakes/listing";

export class SearchStore {
  @observable
  input: string = "";

  @observable
  filters: Filters = {
    type: "",
    beds: 1,
    baths: 1,
    cars: 1,
    features: [],
    start_date: new Date(),
    end_date: new Date(),
    landmarks: [],
  };

  @observable
  searchResults: ListingActual[] = [];

  @observable
  searchState?: "loading" | "loaded" | "error";

  constructor(query?: string) {
    makeObservable(this);
    this.input = query ? query : "";
  }
}

export class SearchPresenter {
  @action
  async search(store: SearchStore) {
    store.searchState = "loading";
    // Parse through filters and format into a query string?
    try {
      // Change this to add the filters
      const response = await fetch(`/listings/?location=${store.input}`);
      const content = await response.json();
      if ("detail" in content) {
        console.log("error", content.detail);
        runInAction(() => {
          store.searchState = "loaded";
        });
      } else {
        const results: ListingActual[] = content.results.map((result: any) => ({
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
        }));
        console.log(results);
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
