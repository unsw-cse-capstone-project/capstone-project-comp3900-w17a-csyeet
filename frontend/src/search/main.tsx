import * as React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { createSearchPage } from "./create";
import { Filters } from "../ui/util/types/filters";

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const SearchPage = () => {
  const query = useQuery().get("query");
  const type = useQuery().get("type") || undefined;
  let beds = useQuery().get("beds") || undefined;
  let baths = useQuery().get("baths") || undefined;
  let cars = useQuery().get("cars") || undefined;
  const start = useQuery().get("start") || undefined;
  const end = useQuery().get("end") || undefined;
  const features = useQuery().get("features") || undefined;
  let featureList = features?.split("_");

  if (query === null || query === "") {
    return <Redirect to="/" />;
  }

  let bedsNum = beds? parseInt(beds): undefined;
  let bathsNum = baths? parseInt(baths): undefined;
  let carsNum = cars? parseInt(cars): undefined;

  const Page = createSearchPage(
    query,
    type,
    bedsNum,
    bathsNum,
    carsNum,
    start,
    end,
    featureList
  );
  return <Page />;
};
