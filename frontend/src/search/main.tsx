import * as React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { createSearchPage } from "./create";
import { Filters } from "../ui/util/types/filters";

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const SearchPage = () => {
  const query = useQuery().get("query");
  const type = useQuery().get("type");
  let beds = useQuery().get("beds");
  let baths = useQuery().get("baths");
  let cars = useQuery().get("cars");
  const start = useQuery().get("start");
  const end = useQuery().get("end");
  const features = useQuery().get("features");
  let featureList = features?.split("_");
  featureList = featureList?.filter((value) => {
    return value !== "";
  });

  if (query === null || query === "") {
    return <Redirect to="/" />;
  }

  if (type === null || type === "") {
    const Page = createSearchPage(query);
    return <Page />;
  }
  if (beds === null || beds === "") {
    return <Redirect to="/" />;
  }
  if (baths === null || baths === "") {
    return <Redirect to="/" />;
  }
  if (cars === null || cars === "") {
    return <Redirect to="/" />;
  }
  if (start === null || start === "") {
    return <Redirect to="/" />;
  }
  if (end === null || end === "") {
    return <Redirect to="/" />;
  }
  if (features === null || features === "") {
    return <Redirect to="/" />;
  }

  let bedsNum = parseInt(beds);
  let bathsNum = parseInt(baths);
  let carsNum = parseInt(cars);

  console.log(query);

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
