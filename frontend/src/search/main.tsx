import * as React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { createSearchPage } from "./create";

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

/**
 * Populate search store with information about seach queries from URL
 */
export const SearchPage = () => {
  const query = useQuery().get("query");
  const type = useQuery().get("type") || undefined;
  let beds = useQuery().get("beds") || undefined;
  let baths = useQuery().get("baths") || undefined;
  let cars = useQuery().get("cars") || undefined;
  const start = useQuery().get("start") || undefined;
  const end = useQuery().get("end") || undefined;
  const features = useQuery().get("features") || undefined;
  const landmarks = useQuery().get("landmarks") || undefined;
  let featureList = features ?.split("_");
  let landmarkList = landmarks ?.split("_");
  let closed_auction = useQuery().get("include_closed_auctions") || undefined;

  if (query === null || query === "") {
    return <Redirect to="/" />;
  }

  let bedsNum = beds ? parseInt(beds) : undefined;
  let bathsNum = baths ? parseInt(baths) : undefined;
  let carsNum = cars ? parseInt(cars) : undefined;

  const Page = createSearchPage(
    query,
    type,
    bedsNum,
    bathsNum,
    carsNum,
    start,
    end,
    featureList,
    landmarkList,
    closed_auction,
  );
  return <Page />;
};
