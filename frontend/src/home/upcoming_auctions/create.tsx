import {
  UpcomingAuctionsStore,
  UpcomingAuctionPresenter,
} from "./UpcomingAuctionsPresenter";
import * as React from "react";
import { UpcomingAuctions } from "./UpcomingAuctions";

export const createUpcomingAuction = () => {
  const store = new UpcomingAuctionsStore();
  const presenter = new UpcomingAuctionPresenter();
  // eslint-disable-next-line react/display-name
  return () => <UpcomingAuctions store={store} presenter={presenter}/>;
};
