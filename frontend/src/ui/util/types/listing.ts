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
  id: number;
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
  highest_bid: number | null;
  reserve_met: boolean;
  user_bid?: number;
};

export type ListingSummary = {
  id: number;
  street: string;
  suburb: string;
  postcode: string;
  state: string;
  images: string[];
  starred: boolean;
  num_bedrooms?: number;
  num_bathrooms?: number;
  num_car_spaces?: number;
  auction_start?: Date;
  auction_end?: Date;
  reserve_met?: boolean;
  highest_bid?: number | null;
  user_bid?: number;
};
