import { Property } from "../types/property";
export const createFakeProperty = (opts?: Partial<Property>) => ({
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
  auction_start: new Date("October 17, 2020 11:00:00"),
  auction_end: new Date("October 27, 2020 11:00:00"),
  reserve_price: 2000000,
  images: [
    "https://i2.au.reastatic.net/1000x750-format=webp/8779b210bb43515a6968f04d7c86cbddaffd81d4dd96b2640ca68379fdff8636/image.jpg",
    "https://i2.au.reastatic.net/1340x824-resize,extend,r=33,g=40,b=46/10784f34dc9c093688c1c137dff1aad545ad5000ebf653ca90e0793569231fe9/image.jpg",
    "https://i2.au.reastatic.net/1340x824-resize,extend,r=33,g=40,b=46/45efa7d514e314b49996d38460b3f1f7dc3160958a43b84211346b1a9b854032/image.jpg",
  ],
  ...opts,
});
