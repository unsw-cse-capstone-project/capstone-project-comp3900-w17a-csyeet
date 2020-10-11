import { type } from "os";

export type Listing = {
  id: number;
  owner_id: number;
  title: string;
  description: string;
  street: string;
  suburb: string;
  postcode: string;
  state: string;
  country: string;
  type: string;
  num_bedrooms: number;
  num_bathrooms: number;
  num_car_spaces: number;
  auction_start: Date;
  auction_end: Date;
  reserve_price: number;
  images: string[];
};
