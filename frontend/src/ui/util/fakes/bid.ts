import { Bid } from "../types/bid";
export const createFakeBid = (opts?: Partial<Bid>) => ({
  reserve_met: false,
  bidder_id: 1,
  bid: 1000000,
  placed_at: new Date("October 9, 2020 11:00:00"),
  ...opts,
});

export const createFakeBidsList = (numBids: number): Bid[] =>
  Array.from(Array(numBids)).map((_, i) =>
    createFakeBid({
      bidder_id: i,
      bid: 1000000 - i * 10000,
      placed_at: new Date("October 9, 2020 " + (12 - i) + ":00:00"),
    })
  );
