import { action, observable, runInAction, makeObservable } from "mobx";
import { ListingActual } from "../ui/util/types/listing";
import { getListingFromResult, resizeFile } from "../ui/util/helper";
import { AuthenticationService, currentUser } from '../backend/authentication/authentication_service';
import { UsersService } from '../backend/users/users_services';

export class ProfileStore {
  @observable name: string = "";
  @observable tmpName: string = "";
  @observable email: string = "";
  @observable phone_number: string = "";
  @observable tmpPhoneNumber: string = "";
  @observable tmpAddress = {
    street: "",
    suburb: "",
    postcode: "",
    state: "NSW",
    country: "Australia",
  };
  @observable street: string = "";
  @observable suburb: string = "";
  @observable postcode: string = "";
  @observable state: string = "";
  @observable country: string = "";

  @observable blurb: string = "";
  @observable tmpBlurb: string = "";
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
  private readonly usersService: UsersService = new UsersService();
  /**
   * Fetch users profile information from the backend
   * @param store
   */
  @action
  async getProfileInfo(store: ProfileStore) {
    store.loadingState = "loading";
    if (!currentUser) {
      store.loadingState = "error";
      return;
    }
    try {
      const content = this.usersService.getProfile(currentUser.id);
      
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
        store.phone_number = content.phoneNumber;
        store.tmpPhoneNumber = content.phoneNumber;
        store.street = content.street;
        store.suburb = content.suburb;
        store.postcode = content.postcode;
        store.state = content.state;
        store.country = content.country;
        store.blurb = !!content["blurb"]
          ? content["blurb"]
          : "Update your bio";
        store.tmpBlurb = !!content["blurb"]
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
    } catch {
      runInAction(() => {
        store.loadingState = "error";
      });
    }
  }

  /**
   * Update user info on the backend to reflect changes made by users
   * @param store
   */
  @action
  async updateUserDetails(store: ProfileStore) {
    store.loadingState = "updating";
    const updateGeneral = store.tmpName === "";
    try {
      const result = this.usersService.updateProfile({
        name: !updateGeneral ? store.tmpName : store.name,
        phoneNumber: !updateGeneral
          ? store.tmpPhoneNumber
          : store.phone_number,
        street: !updateGeneral ? store.tmpAddress.street : store.street,
        suburb: !updateGeneral ? store.tmpAddress.suburb : store.suburb,
        postcode: !updateGeneral ? store.tmpAddress.postcode : store.postcode,
        state: !updateGeneral ? store.tmpAddress.state : store.state,
        country: !updateGeneral ? store.tmpAddress.country : store.country,
      });
      runInAction(() => {
        store.loadingState = "success";
        store.name = result.name;
        store.tmpName = result.name;
        store.phone_number = result.phoneNumber;
        store.tmpPhoneNumber = result.phoneNumber;
        store.street = result.street;
        store.suburb = result.suburb;
        store.postcode = result.postcode;
        store.state = result.state;
        store.country = result.country;
      });
    } catch {
      runInAction(() => {
        store.loadingState = "error";
        window.location.reload();
      });
    }
  }

  /**
   * Update user password on the backend
   * @param store
   * @param onPasswordIncorrect
   */
  @action
  async updateUserPassword(
    store: ProfileStore,
    onPasswordIncorrect: () => void
  ) {
    store.loadingState = "updating";
    try {
      this.usersService.updateProfile({
        oldPassword: store.old_password,
        newPassword: store.new_password,
      });
      runInAction(() => (store.loadingState = "success"));
    } catch {
      runInAction(() => {
        store.loadingState = "error";
        onPasswordIncorrect();
      });
    }
  }

  /**
   * Update blurb on the backend
   * @param store
   */
  @action
  async updateBlurb(store: ProfileStore) {
    store.loadingState = "updating";
    try {
      this.usersService.updateProfile({
        blurb: store.tmpBlurb,
      });
      runInAction(() => {
        store.loadingState = "success";
        store.blurb = store.tmpBlurb;
      });
    } catch {
      runInAction(() => (store.loadingState = "error"));
    }
  }

  /**
   * Update user's profile avatar on the backend
   * @param image
   * @param img_url
   * @param store
   */
  @action
  async updateAvatar(image: File, img_url: string, store: ProfileStore) {
    console.log(image)
    runInAction(() => (store.loadingState = "updating"));
    const resized = await resizeFile(image as File);
    let data = await (resized as Blob).arrayBuffer();
    const blob = new Blob([data], { type: image.type });

    const reader = new window.FileReader();
    await readData(blob, reader);
    console.log(typeof(reader.result));
    try {
      const result = this.usersService.updateAvatar(reader.result as string);
      runInAction(() => {
        store.loadingState = "success";
        store.avatar = result;
        window.location.reload();
      });
    } catch (e) {
      runInAction(() => (store.loadingState = "error"));
    }
  }
}

function readData(blob: Blob, fileReader: FileReader){
  return new Promise((resolve, reject) => {
    fileReader.readAsDataURL(blob);
    fileReader.onloadend = resolve;
  });
}
