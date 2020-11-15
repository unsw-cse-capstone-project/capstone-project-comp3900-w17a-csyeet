import {
  UpcomingAuctionsStore,
  UpcomingAuctionPresenter,
} from "./UpcomingAuctionsPresenter";
import * as React from "react";
import { UpcomingAuctions } from "./UpcomingAuctions";
import { ErrorBoundaryComponent } from "../../ui/base/error_boundary/ErrorBoundary";

export const createUpcomingAuction = () => {
  const store = new UpcomingAuctionsStore();
  const presenter = new UpcomingAuctionPresenter();
  // eslint-disable-next-line react/display-name
  return () => (
    <ErrorBoundaryComponent>
      <UpcomingAuctions store={store} presenter={presenter} />
    </ErrorBoundaryComponent>
  );
};
