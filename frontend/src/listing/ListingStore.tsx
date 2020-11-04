import { observable } from "mobx";
import { ImageListType } from "react-images-uploading";

export type Feature =
  | "has_ensuite"
  | "has_built_in_wardrobe"
  | "has_bathtub"
  | "is_furnished"
  | "has_open_kitchen"
  | "has_separate_kitchen"
  | "has_island_kitchen"
  | "has_gas_stove"
  | "has_electric_stove"
  | "has_induction_stove"
  | "has_balcony"
  | "has_ocean_view"
  | "has_bbq"
  | "has_porch"
  | "has_pool"
  | "has_gym";

export class ListingStore {
  @observable canPreview: boolean = true;
  @observable id: number | null = null;

  @observable street: string = "";
  @observable suburb: string = "";
  @observable postcode: string = "";
  @observable state: string = "NSW";
  @observable country: string = "Australia";

  @observable type: string = "";
  @observable nBedrooms: string = "";
  @observable nBathrooms: string = "";
  @observable nGarages: string = "";

  @observable features: Array<Feature> = [];

  @observable descTitle: string = "";
  @observable desc: string = "";

  @observable auctionStart: Date | null = null;
  @observable auctionEnd: Date | null = null;
  @observable reservePrice: number = 0;

  @observable accName: string = "";
  @observable bsb: string = "";
  @observable accNumber: string = "";

  @observable images: ImageListType = [];
}
