import * as React from "react";
import { observer } from "mobx-react";
import { Typography, Tab, Tabs } from "@material-ui/core";
import { ProfilePageStyles } from "./ProfilePage.css";
import { MyBidsPage as MyBids } from "./bids/MyBidsPage";
import { DetailsPage as MyDetails } from "./details/DetailsPage";
import { MyListingsPage as MyListings } from "./listings/MyListingsPage";
import { StarredPropertiesPage as StarredProperties } from "./starred/StarredPropertiesPage";
import { Blurb } from "./about/Blurb";
import { ProfileAvatar } from "./about/ProfileAvatar";
import { ProfileStore, ProfilePresenter } from "./ProfilePresenter";
import { useStore } from "../AuthContext";

export const ProfilePage = () => {
  const userStore = useStore();
  if (!userStore || !userStore.user) {
    return null;
  }
  const store = new ProfileStore(userStore.user.id);
  const presenter = new ProfilePresenter();
  presenter.getProfileInfo(store);
  return (
    <ProfilePageWrapper
      store={store}
      onEditBlurb={() => presenter.updateBlurb(store)}
      onEditAvatar={(image: File, img_url: string) =>
        presenter.updateAvatar(image, img_url, store)
      }
      onUpdateUserDetails={() => presenter.updateUserDetails(store)}
      onChangePassword={(onPasswordIncorrect: () => void) =>
        presenter.updateUserPassword(store, onPasswordIncorrect)
      }
    />
  );
};

export const ProfilePageWrapper = observer(
  ({
    store,
    onEditBlurb,
    onEditAvatar,
    onUpdateUserDetails,
    onChangePassword,
  }: {
    store: ProfileStore;
    onEditBlurb: () => void;
    onEditAvatar: (image: File, img_url: string) => void;
    onUpdateUserDetails: () => void;
    onChangePassword: (onPasswordIncorrect: () => void) => void;
  }) => {
    const classes = ProfilePageStyles();
    const userStore = useStore();
    if (!userStore || !userStore.user) {
      return null;
    }
    const [value, setValue] = React.useState(0);
    const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };
    return (
      <div>
        <div className={classes.userInfo}>
          <ProfileAvatar onUpload={onEditAvatar} avatar={store.avatar} />
          <Typography variant="h4">{store.name}</Typography>
          <Typography variant="body1" color="textSecondary">
            {userStore.user.email}
          </Typography>
          <Blurb
            className={classes.blurbStyle}
            store={store}
            onEdit={onEditBlurb}
          />
        </div>
        <div className={classes.root}>
          <div className={classes.tabBar}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="My Bids" />
              <Tab label="My Listings" />
              <Tab label="Starred Properties" />
              <Tab label="My Details" />
            </Tabs>
          </div>

          <div className={classes.tabPanel}>
            <div hidden={value !== 0}>
              <MyBids store={store} />
            </div>
            <div hidden={value !== 1}>
              <MyListings store={store} />
            </div>
            <div hidden={value !== 2}>
              <StarredProperties store={store} />
            </div>
            <div hidden={value !== 3}>
              <MyDetails
                store={store}
                onUpdateUserDetails={onUpdateUserDetails}
                onChangePassword={onChangePassword}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
