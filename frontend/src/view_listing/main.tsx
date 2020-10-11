import * as React from "react";
import { useParams } from "react-router-dom";

export const ViewListingPage = () => {
  const { id } = useParams<{ id: string }>();
  return <div>Listing #{id}</div>;
};
