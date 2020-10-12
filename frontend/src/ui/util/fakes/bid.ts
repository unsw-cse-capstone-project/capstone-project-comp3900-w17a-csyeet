import { Bid } from "../types/bid";
export const createFakeBid = (opts?: Partial<Bid>) => ({
  listing_id: 1,
  bidder_id: 1,
  bid: 1000000,
  submitted: new Date("October 9, 2020 11:00:00"),
  ...opts,
});
