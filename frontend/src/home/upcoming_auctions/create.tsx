import {
  UpcomingAuctionsStore,
  UpcomingAuctionPresenter,
} from "./UpcomingAuctionsPresenter";
import { observer } from "mobx-react";
import * as React from "react";
import { UpcomingAuctions } from "./UpcomingAuctions";
export const createUpcomingAuction = () => {
  const store = new UpcomingAuctionsStore();
  const presenter = new UpcomingAuctionPresenter();
  presenter.loadUpcomingAuctions(store);
  return observer(() => <UpcomingAuctions store={store} presenter={presenter}/>);
};
