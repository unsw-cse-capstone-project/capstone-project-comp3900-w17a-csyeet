import { action, observable, runInAction, makeObservable } from "mobx";
import { ListingActual } from "../ui/util/types/listing";
import { getListingFromResult, resizeFile } from "../ui/util/helper";
import { ImageType } from "react-images-uploading";

export class ProfileStore {
  @observable name: string = "";
  @observable tmpName: string = "";
  @observable email: string = "";
  @observable phone_number: string = "";
  @observable tmpPhoneNumber: string = "";
  @observable street: string = "";
  @observable suburb: string = "";
  @observable postcode: string = "";
  @observable state: string = "";
  @observable country: string = "";

  @observable blurb: string = "Update your bio";
  @observable avatar: string;

  @observable old_password: string = "";
  @observable new_password: string = "";
  @observable new_password_confirm: string = "";

  @observable
  myBidsResults: ListingActual[] = [];

  @observable
  myListingsResults: ListingActual[] = [];

  @observable
  starredResults: ListingActual[] = [];

  @observable
  loadingState?: "loading" | "loaded" | "error" | "updating" | "success";

  constructor(id: number) {
    this.avatar = `/users/${id}/avatar`;
    makeObservable(this);
  }
}

export class ProfilePresenter {
  @action
  async getProfileInfo(store: ProfileStore) {
    store.loadingState = "loading";
    try {
      const response = await fetch(`/users/profile`);
      const content = await response.json();
      if ("detail" in content) {
        runInAction(() => {
          store.loadingState = "error";
        });
      } else {
        const ListingResults: ListingActual[] = content.listings.map(
          (result: any) => getListingFromResult(result)
        );
        const BidsResults: ListingActual[] = content.registrations.map(
          (result: any) => getListingFromResult(result)
        );
        const StarredResults: ListingActual[] = content.starred_listings.map(
          (result: any) => getListingFromResult(result)
        );

        runInAction(() => {
          store.loadingState = "loaded";
          store.name = content.name;
          store.tmpName = content.name;
          store.email = content.email;
          store.phone_number = content.phone_number;
          store.tmpPhoneNumber = content.phone_number;
          store.street = content.street;
          store.suburb = content.suburb;
          store.postcode = content.postcode;
          store.state = content.state;
          store.country = content.country;
          store.blurb = !!content["blurb"]
            ? content["blurb"]
            : "Update your bio";
          store.myBidsResults = BidsResults.sort(
            (a, b) => b.auction_start.getTime() - a.auction_start.getTime()
          );
          store.myListingsResults = ListingResults.sort(
            (a, b) => b.auction_start.getTime() - a.auction_start.getTime()
          );
          store.starredResults = StarredResults.sort(
            (a, b) => b.auction_start.getTime() - a.auction_start.getTime()
          );
        });
      }
    } catch {
      runInAction(() => {
        store.loadingState = "error";
      });
    }
  }

  @action
  async updateUserDetails(store: ProfileStore) {
    store.loadingState = "updating";
    try {
      const response = await fetch(`users/profile`, {
        method: "post",
        body: JSON.stringify({
          name: store.tmpName,
          phone_number: store.tmpPhoneNumber,
          street: store.street,
          suburb: store.suburb,
          postcode: store.postcode,
          state: store.state,
          country: store.country,
        }),
      });
      const result = await response.json();
      if ("detail" in result)
        runInAction(() => {
          store.loadingState = "error";
        });
      else {
        runInAction(() => {
          store.loadingState = "success";
          store.name = result.name;
          store.tmpName = result.name;
          store.phone_number = result.phone_number;
          store.tmpPhoneNumber = result.phone_number;
          store.street = result.street;
          store.suburb = result.suburb;
          store.postcode = result.postcode;
          store.state = result.state;
          store.country = result.country;
        });
        // window.location.reload();
      }
    } catch {
      runInAction(() => {
        store.loadingState = "error";
        window.location.reload();
      });
    }
  }

  @action
  async updateUserPassword(
    store: ProfileStore,
    onPasswordIncorrect: () => void
  ) {
    store.loadingState = "updating";
    try {
      const response = await fetch(`users/profile`, {
        method: "post",
        body: JSON.stringify({
          old_password: store.old_password,
          new_password: store.new_password,
        }),
      });
      const result = await response.json();
      if ("detail" in result) onPasswordIncorrect();
      else runInAction(() => (store.loadingState = "success"));
    } catch {
      runInAction(() => {
        store.loadingState = "error";
        window.location.reload();
      });
    }
  }

  @action
  async updateBlurb(blurb: string, store: ProfileStore) {
    store.loadingState = "updating";
    try {
      const response = await fetch(`users/profile`, {
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
      runInAction(() => (store.loadingState = "error"));
    }
  }

  @action
  async updateAvatar(image: File, img_url: string, store: ProfileStore) {
    runInAction(() => (store.loadingState = "updating"));
    let form = new FormData();
    const resized = await resizeFile(image as File);
    let data = await (resized as Blob).arrayBuffer();
    form.append("file", new Blob([data], { type: image.type }));
    try {
      const response = await fetch(`/users/avatar`, {
        method: "post",
        body: form,
      });
      if (response.status !== 200) {
        runInAction(() => (store.loadingState = "error"));
        return;
      }
      runInAction(() => {
        store.loadingState = "success";
        store.avatar = "/users/avatar";
        window.location.reload();
      });
    } catch (e) {
      runInAction(() => (store.loadingState = "error"));
    }
  }
}
