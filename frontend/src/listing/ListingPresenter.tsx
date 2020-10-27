import { action, makeObservable, observable, runInAction } from "mobx";

export class ListingPresenter {
  // Need function to upload Store Information (for the first time)
  // ^ I think there's a separate endpoint for initial creation and editing
  // I'm also not sure how the listing ID is made, I'm assuming that it's returned when the we all the endpoint to publish the listing
  // In that case we might want to add a field in ListingStore called id or sth
  //
  // Need function to upload images (Annisa said we could do multiple at a time)
  // Uploading Images, I'm not sure waht type she used...
  //
  // Currently it's stored as "ImageListType"
  //   export interface ImageType {
  //   dataURL?: string;
  //   file?: File;
  //   [key: string]: any;
  // }
  // export type ImageListType = Array<ImageType>;
  //
  // Later on, need a function for updating listing (not for the first time)
  // Later on, need a function for fetchListingData (by ID) i suppose.. which will be passed in as a prop
  // Refer to Teresa's Presenters :)
}
