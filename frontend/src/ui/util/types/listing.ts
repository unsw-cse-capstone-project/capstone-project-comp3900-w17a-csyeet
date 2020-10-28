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

export type Owner = {
  email: string;
  name: string;
};

export type Landmark = {
  name: string;
  type: string;
  distance: number;
};

export type ListingActual = {
  id: number;
  owner: Owner;
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
  // reserve_price: number;
  images: string[];
  features: string[];
  starred: boolean;
  registered_bidder: boolean;
  landmarks: Landmark[];
  highest_bid: number;
  reserve_met: boolean;
};

export type ListingSummary = {
  id: number;
  street: string;
  suburb: string;
  postcode: string;
  state: string;
  images: string[];
  num_bedrooms: number;
  num_bathrooms: number;
  num_car_spaces: number;
  auction_start: Date;
  auction_end: Date;
  starred: boolean;
};
