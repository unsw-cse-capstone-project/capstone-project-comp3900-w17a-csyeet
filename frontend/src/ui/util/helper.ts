import Resizer from "react-image-file-resizer";
import { Address } from "../../auction/AuctionPage";
import { createFakeListing } from "./fakes/listing";

export const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "numeric",
  minute: "numeric",
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

export const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const toCamelCase = (str: string) => {
  return str
    .replace(/(?:^.|[A-Z]|\b.)/g, function (letter, index) {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, "");
};

export const toSentenceCase = (str: string) =>
  str.replace(/([A-Z])/g, " $1")[0].toUpperCase() +
  str.replace(/([A-Z])/g, " $1").slice(1);

export const toCapitaliseCase = (str: string) => {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

export const getListingFromResult = (result: any) => ({
  type: result.type,
  id: parseInt(result.id),
  owner: {
    email: result.owner.email,
    name: result.owner.name,
    id: parseInt(result.owner.id),
  },
  title: result.title,
  description: result.description,
  street: result.street,
  suburb: result.suburb,
  postcode: result.postcode,
  state: result.state,
  country: result.country,
  num_bedrooms: parseInt(result.num_bedrooms),
  num_bathrooms: parseInt(result.num_bathrooms),
  num_car_spaces: parseInt(result.num_car_spaces),
  auction_start: new Date(result.auction_start),
  auction_end: new Date("2020-11-14T22:00:00"), //new Date(result.auction_end),
  images:
    result["image_ids"].length !== 0
      ? result["image_ids"].map(
          (id: any) => `/listings/${result.id}/images/${id}`
        )
      : createFakeListing().images,
  landmarks: result.landmarks,
  features: result.features,
  starred: result.starred,
  registered_bidder: result.registered_bidder,
  highest_bid: result.highest_bid,
  reserve_met: result.reserve_met,
});

export const formatAddress = ({
  street,
  suburb,
  state,
  postcode,
}: {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
}) => {
  return {
    streetAddress: street.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
    remainingAddress:
      suburb.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()) +
      " " +
      state.toUpperCase() +
      " " +
      postcode,
  };
};

export const getNumCards = (width: string) => {
  switch (width) {
    case "xs":
      return 1;
    case "sm":
      return 2;
    case "md":
      return 3;
    case "lg":
      return 4;
    case "xl":
      return 5;
    default:
      return 3;
  }
};

export const isValidEmail = (email: string) => {
  if (
    !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return false;
  }
  return true;
};

export const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file as Blob,
      1000,
      1000,
      (file as any).type.slice(6),
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob"
    );
  });
