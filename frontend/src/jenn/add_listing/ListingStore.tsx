import React from "react";
import { observable } from "mobx";

type Features = {
  has_ensuite: boolean;
  has_built_in_wardrobe: boolean;
  has_bathtub: boolean;
  is_furnished: boolean;
  has_open_kitchen: boolean;
  has_separate_kitchen: boolean;
  has_island_kitchen: boolean;
  has_gas_stove: boolean;
  has_electric_stove: boolean;
  has_induction_stove: boolean;
  has_balcony: boolean;
  has_ocean_view: boolean;
  has_bbq: boolean;
  has_porch: boolean;
  has_pool: boolean;
  has_gym: boolean;
};
export class ListingStore {
  @observable address: string = "";
  @observable type: string = "";
  @observable nBedrooms: string = "";
  @observable nBathrooms: string = "";
  @observable nGarages: string = "";
  @observable features: Features = {
    has_ensuite: false,
    has_built_in_wardrobe: false,
    has_bathtub: false,
    is_furnished: false,
    has_open_kitchen: false,
    has_separate_kitchen: false,
    has_island_kitchen: false,
    has_gas_stove: false,
    has_electric_stove: false,
    has_induction_stove: false,
    has_balcony: false,
    has_ocean_view: false,
    has_bbq: false,
    has_porch: false,
    has_pool: false,
    has_gym: false,
  };
}
