import { Listing, ListingActual } from '../types/listing';
export const createFakeListing = (opts?: Partial<Listing>) => ({
  id: 1,
  owner_id: 1,
  title: "Immaculately presented family home",
  description: `This charming Federation style family home ensures a blissful family lifestyle of modern comfort and flexibility. Spacious interiors reveal a beautiful array of period features, complemented by a stylish renovation throughout, it is ready for you to move in and enjoy. The property is set in one of the best streets with a sun-drenched level block of 663.9sqm (approx).
  Within walking distance of Chatswood station, express buses, shopping, restaurants and schools this is an ideal location allowing you to enjoy the tranquillity of the suburb while still being close to all amenities.`,
  street: "8 Holland Street",
  suburb: "Chatswood",
  postcode: "2067",
  state: "NSW",
  country: "Australia",
  type: "House",
  num_bedrooms: 5,
  num_bathrooms: 3,
  num_car_spaces: 2,
  auction_start: new Date("October 30, 2020 11:00:00"),
  auction_end: new Date("October 31, 2020 11:00:00"),
  reserve_price: 2000000,
  images: [
    "https://i2.au.reastatic.net/1000x750-format=webp/8779b210bb43515a6968f04d7c86cbddaffd81d4dd96b2640ca68379fdff8636/image.jpg",
    "https://i2.au.reastatic.net/1340x824-resize,extend,r=33,g=40,b=46/10784f34dc9c093688c1c137dff1aad545ad5000ebf653ca90e0793569231fe9/image.jpg",
    "https://i2.au.reastatic.net/1340x824-resize,extend,r=33,g=40,b=46/45efa7d514e314b49996d38460b3f1f7dc3160958a43b84211346b1a9b854032/image.jpg",
  ],
  features: ['ensuite', 'bathtub'],
  starred: false,
  registered_bidder: false,
  ...opts,
});
export const createFakeActualListing = (opts?: Partial<ListingActual>) => ({
  id: 1,
  owner: {
    email: "jeremy@example.com",
    name: "Jeremy",
    id: 1,
  },
  title: "Immaculately presented family home",
  description: `This charming Federation style family home ensures a blissful family lifestyle of modern comfort and flexibility. Spacious interiors reveal a beautiful array of period features, complemented by a stylish renovation throughout, it is ready for you to move in and enjoy. The property is set in one of the best streets with a sun-drenched level block of 663.9sqm (approx).
  Within walking distance of Chatswood station, express buses, shopping, restaurants and schools this is an ideal location allowing you to enjoy the tranquillity of the suburb while still being close to all amenities.`,
  street: "8 Holland Street",
  suburb: "Chatswood",
  postcode: "2067",
  state: "NSW",
  country: "Australia",
  type: "House",
  num_bedrooms: 5,
  num_bathrooms: 3,
  num_car_spaces: 2,
  auction_start: new Date("October 30, 2020 11:00:00"),
  auction_end: new Date("October 31, 2020 11:00:00"),
  images: [
    "https://i2.au.reastatic.net/1000x750-format=webp/8779b210bb43515a6968f04d7c86cbddaffd81d4dd96b2640ca68379fdff8636/image.jpg",
    "https://i2.au.reastatic.net/1340x824-resize,extend,r=33,g=40,b=46/10784f34dc9c093688c1c137dff1aad545ad5000ebf653ca90e0793569231fe9/image.jpg",
    "https://i2.au.reastatic.net/1340x824-resize,extend,r=33,g=40,b=46/45efa7d514e314b49996d38460b3f1f7dc3160958a43b84211346b1a9b854032/image.jpg",
  ],
  landmarks: [
    {
      name: "Primary School 1",
      type: "primarySchool",
      distance: 0.5,
    },
    {
      name: "Primary School 2",
      type: "primarySchool",
      distance: 0.9,
    },
    {
      name: "Primary School 3",
      type: "primarySchool",
      distance: 1.2,
    },
    {
      name: "Secondary School 1",
      type: "secondarySchool",
      distance: 0.5,
    },
    {
      name: "Secondary School 2",
      type: "secondarySchool",
      distance: 0.9,
    },
    {
      name: "Secondary School 3",
      type: "secondarySchool",
      distance: 1.2,
    },
    {
      name: "Park 1",
      type: "park",
      distance: 0.2,
    },
    {
      name: "Park 2",
      type: "park",
      distance: 0.7,
    },
    {
      name: "Park 3",
      type: "park",
      distance: 1.2,
    },
    {
      name: "Park 4",
      type: "park",
      distance: 2.6,
    },
    {
      name: "Train Station 1",
      type: "trainStation",
      distance: 0.2,
    },
  ],
  features: ['ensuite', 'bathtub'],
  starred: false,
  registered_bidder: false,
  highest_bid: 0,
  reserve_met: false,
  ...opts,
});

export const createFakeListingPreAuction = createFakeListing;
export const createFakeListingDuringAuction = () =>
  createFakeListing({
    id: 2,
    street: "50 Levey St",
    auction_start: new Date("October 4, 2020 11:00:00"),
  });
export const createFakeListingClosedAuction = () =>
  createFakeListing({
    id: 3,
    street: "102/42 Floss St",
    auction_start: new Date("October 4, 2020 11:00:00"),
    auction_end: new Date("October 5, 2020 11:00:00"),
  });

export const fetchListing = (id: number) => {
  switch (id) {
    case 1:
      return createFakeListingPreAuction();
    case 2:
      return createFakeListingDuringAuction();
    case 3:
      return createFakeListingClosedAuction();
    case 6:
      return createFakeListing({
        id: 6,
        street: "47 Little Riley Street",
        suburb: "Zetland",
        postcode: "2017",
        state: "NSW",
        country: "Australia",
      });
    case 7:
      return createFakeListing({
        id: 7,
        street: "38/679 Bourke Street",
        suburb: "Zetland",
        postcode: "2017",
        state: "NSW",
        country: "Australia",
        auction_start: new Date("2020-10-09T14:50:14.672000"),
        auction_end: new Date("2020-10-25T14:50:14.672000"),
      });
    case 8:
      return createFakeListing({
        id: 8,
        street: "12 Mary Street",
        suburb: "Zetland",
        postcode: "2017",
        state: "NSW",
        country: "Australia",
        auction_start: new Date("2020-10-09T14:50:14.672000"),
        auction_end: new Date("2020-10-12T14:50:14.672000"),
      });
    default:
      return createFakeListing();
  }
};
