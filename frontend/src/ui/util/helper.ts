import { Address } from "../../teresa/auction/AuctionPage";

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
  street: "111/544 pacific highway",
  suburb: "chatswood",
  state: "nsw",
  postcode: "2067",
  country: "australia",
});

export function delay(timeout: number): Promise<void> {
  return new Promise((res) => setTimeout(res, timeout));
}
