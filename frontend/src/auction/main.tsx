import * as React from "react";
import { useParams } from "react-router-dom";

export const AuctionPage = () => {
  const { id } = useParams<{ id: string }>();
  return <div>Auction Page for listing {id}</div>;
};
