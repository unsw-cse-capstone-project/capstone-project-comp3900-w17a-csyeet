import { action, observable, runInAction } from "mobx";
import { ListingActual } from "../ui/util/types/listing";
import { getListingFromResult } from "../ui/util/helper";

export class ProfileStore {
  @observable blurb: string = "Tell other users something about yourself!"; // Tempporary
  @observable avatar: string =
    "https://avatarfiles.alphacoders.com/791/79102.png";

  @observable
  myBidsResults: ListingActual[] = [];

  @observable
  myListingsResults: ListingActual[] = [];

  @observable
  starredResults: ListingActual[] = [];

  @observable
  loadingState?: "loading" | "loaded" | "error" | "updating" | "success";
}

export class ProfilePresenter {
  @action
  async getProfileInfo(store: ProfileStore) {
    runInAction(() => (store.loadingState = "loading"));
    try {
      const response = await fetch(`/users/profile`);
      const result = await response.json();
      if ("detail" in result) {
        runInAction(() => (store.loadingState = "error"));
        return;
      }
      // Sort out the listings/starred/bids
      const ListingResults: ListingActual[] = result["listings"].map(
        (listing: any) => {
          getListingFromResult(listing);
        }
      );
      const BidsResults: ListingActual[] = result["registrations"].map(
        (listing: any) => {
          getListingFromResult(listing);
        }
      );
      const StarredResults: ListingActual[] = result["starred_listings"].map(
        (listing: any) => {
          getListingFromResult(listing);
        }
      );

      if (result["blurb"] === "") {
        result["blurb"] = "Update your bio";
      }
      runInAction(() => {
        store.blurb = result["blurb"];
        store.myListingsResults = ListingResults;
        store.myBidsResults = BidsResults;
        store.starredResults = StarredResults;
      });
    } catch {
      console.log("error :(");
      runInAction(() => (store.loadingState = "error"));
    }
  }

  @action
  async updateBlurb(blurb: string, store: ProfileStore) {
    store.loadingState = "updating";
    try {
      // ENDPOINT NOT UP YET
      const response = await fetch(`users/update`, {
        method: "post",
        body: JSON.stringify({
          blurb: blurb,
        }),
      });
      const result = await response.json();
      if ("detail" in result) runInAction(() => (store.loadingState = "error"));
      else {
        runInAction(() => {
          store.loadingState = "success";
          store.blurb = blurb;
        });
      }
    } catch {
      console.log("Error updating about me");
      runInAction(() => (store.loadingState = "error"));
    }
  }

  @action
  async updateAvatar(image: File, img_url: string, store: ProfileStore) {
    store.loadingState = "updating";
    let form = new FormData();
    form.append("avatar", image);
    try {
      const response = await fetch(`/users/avatar`, {
        method: "post",
        body: form,
      });
      const result = await response.json();
      if ("detail" in result) runInAction(() => (store.loadingState = "error"));
      else {
        runInAction(() => {
          store.loadingState = "success";
          store.avatar = img_url;
        });
      }
    } catch {
      console.log("Error :( ");
    }
  }
}
