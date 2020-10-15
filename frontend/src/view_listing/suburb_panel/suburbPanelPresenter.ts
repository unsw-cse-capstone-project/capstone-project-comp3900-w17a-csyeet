import { action, observable, runInAction, makeObservable } from "mobx";
import { SuburbProfileInfo } from "../../ui/util/types/suburbProfileInfo";
import { delay } from '../../ui/util/helper';
export class SuburbPanelStore {
  @observable
  results: SuburbProfileInfo[] = [];

  @observable
  loadingState?: "loading" | "loaded" | "error" = "loading";

  constructor() {
    makeObservable(this);
  }
}

export class SuburbPanelPresenter {
  @action
  async loadSuburbInformation(
    store: SuburbPanelStore,
    suburb: string,
    state: string,
    postcode: string,
    num_bedrooms: number
  ) {
    store.loadingState = "loading";
    try {
      const response = await fetch(
        `https://api.domain.com.au/v2/suburbPerformanceStatistics/${state}/${suburb}/${postcode}?propertyCategory=House&bedrooms=${num_bedrooms}&periodSize=Years&startingPeriodRelativeToCurrent=1&totalPeriods=5`,
        {
          headers: {
            "X-API-Key": "key_1203b794ddf83096bd3c39bfd141e9ad",
          },
        }
      );
      const content = await response.json();
      await delay(400);
      if ("message" in content) {
        runInAction(() => (store.loadingState = "error"));
      } else {
        const results: SuburbProfileInfo[] = content.series.seriesInfo.map(
          (result: any) => ({
            year: result.year,
            medianSoldPrice: result.values.MedianSoldPrice,
            highestSoldPrice: result.values.HighestSoldPrice,
            lowestSoldPrice: result.values.LowestSoldPrice,
            numberAuctioned: result.values.AuctionNumberAuctioned,
            numberOfAuctionsSold: result.values.AuctionNumberSold,
            numberOfAuctionWithdrawn: result.values.AuctionNumberWithdrawn,
          })
        );
        results.sort(
          (a: SuburbProfileInfo, b: SuburbProfileInfo) => b.year - a.year
        );
        runInAction(() => {
          store.results = results;
          store.loadingState = "loaded";
        });
      }
    } catch {
      runInAction(() => (store.loadingState = "error"));
    }
  }
}
