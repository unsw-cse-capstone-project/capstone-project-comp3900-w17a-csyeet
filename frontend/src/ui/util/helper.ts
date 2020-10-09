import { Address } from "../../auction/AuctionPage";

export const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "long",
  day: "2-digit",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "Australia/Sydney",
  hour12: true,
});

export const createFakeAddress = (): Address => ({
  streetAddress: "111/544 pacific highway",
  suburb: "chatswood",
  state: "nsw",
  postcode: 2067,
});