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

  constructor(
    query?: string,
    type?: string,
    beds?: number,
    baths?: number,
    cars?: number,
    start?: string,
    end?: string,
    features?: string[]
  ) {
    makeObservable(this);
    this.input = query ? query : "";
    this.filters.type = type ? type : "";
    this.filters.beds = beds ? beds : 1;
    this.filters.baths = baths ? baths : 1;
    this.filters.cars = cars ? cars : 1;
    this.filters.start_date = start ? new Date(start) : new Date();
    this.filters.end_date = end ? new Date(end) : new Date();
    this.filters.features = features ? features : [];
  }
}

export class SearchPresenter {
  @action
  async search(store: SearchStore) {
    store.searchState = "loading";

    // Parse through filters and format into a query string
    let searchQuery = `?location=${store.input}`;
    if (store.filters.type !== "") searchQuery += `&type=${store.filters.type}`;
    searchQuery += `&num_bedrooms=${store.filters.beds}`;
    searchQuery += `&num_bathrooms=${store.filters.baths}`;
    searchQuery += `&num_car_spaces=${store.filters.cars}`;
    if (store.filters.start_date !== new Date())
      searchQuery += `&auction_start=${store.filters.start_date.toISOString()}`;
    if (store.filters.end_date !== new Date())
      searchQuery += `&auction_end=${store.filters.end_date.toISOString()}`;

    for (let feature of store.filters.features) {
      searchQuery += `&features=${feature}`;
    }

    console.log("value of start date in store", store.filters.start_date);
    console.log("value of new Date()", new Date());

    console.log("in seachpresenter: search");
    console.log(JSON.parse(JSON.stringify(store.filters)));
    console.log("search query:", searchQuery);
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
