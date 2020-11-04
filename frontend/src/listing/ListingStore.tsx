import { observable, makeObservable } from 'mobx';
import { ImageListType } from "react-images-uploading";

export type Feature =
  | "ensuite"
  | "builtInWardrobe"
  | "bathtub"
  | "furnished"
  | "openKitchen"
  | "separateKitchen"
  | "islandKitchen"
  | "gasStove"
  | "electricStove"
  | "inductionStove"
  | "balcony"
  | "oceanView"
  | "bbq"
  | "porch"
  | "pool"
  | "gym";

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

  constructor() {
    makeObservable(this);
  }
}
