import { ListingActual } from "../../ui/util/types/listing";
import * as React from "react";
import { SuburbPanelContent } from "./SuburbPanelContent";
import { observer } from "mobx-react";
import { SuburbPanelStore, SuburbPanelPresenter } from "./SuburbPanelPresenter";

export const createSuburbPanelContent = (listing: ListingActual) => {
  const suburbPanelStore = new SuburbPanelStore();
  const suburbPanelPresenter = new SuburbPanelPresenter();
  suburbPanelPresenter.loadSuburbInformation(
    suburbPanelStore,
    listing.suburb,
    listing.state,
    listing.postcode,
    listing.num_bedrooms
  );

  return observer(() => <SuburbPanelContent store={suburbPanelStore} />);
};
