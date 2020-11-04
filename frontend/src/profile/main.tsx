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
  const store = new ProfileStore();
  const presenter = new ProfilePresenter();
  presenter.getProfileInfo(store);
  return (
    <ProfilePageWrapper
      store={store}
      onEditBlurb={(blurb: string) => presenter.updateBlurb(blurb, store)}
      onEditAvatar={(image: File, img_url: string) =>
        presenter.updateAvatar(image, img_url, store)
      }
    />
  );
};

export const ProfilePageWrapper = observer(
  ({
    store,
    onEditBlurb,
    onEditAvatar,
  }: {
    store: ProfileStore;
    onEditBlurb: (blurb: string) => void;
    onEditAvatar: (image: File, img_url: string) => void;
  }) => {
    const classes = ProfilePageStyles();
    const userStore = useStore();
    if (!userStore || !userStore.user) {
      return null;
    }

    return (
      <div>
        <div className={classes.userInfo}>
          <ProfileAvatar onUpload={onEditAvatar} avatar={store.avatar} />
          <Typography variant="h4">{userStore.user.name}</Typography>
          <Typography variant="body1">{userStore.user.email}</Typography>
          <Blurb
            className={classes.blurbStyle}
            blurb={store.blurb}
            onEdit={onEditBlurb}
          />
        </div>
        <div>
          <ProfileTabs store={store} />
        </div>
      </div>
      <ProfileTabs store={store} />
    </div>
  );
};

function TabPanel(props: {
  children?: React.ReactNode;
  index: any;
  value: any;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const ProfileTabs = ({ store }: { store: ProfileStore }) => {
  const classes = ProfilePageStyles();
  const [value, setValue] = React.useState(0);
  // const [localStore, setStore] = React.useState(store);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    // presenter.getProfileInfo(localStore);
    setValue(newValue);
    console.log("setting Store");
    // setStore(localStore);
  };

  return (
    <div style={{ paddingBottom: "200px" }}>
      <div className={classes.tabBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="My Bids" {...a11yProps(0)} />
          <Tab label="My Listings" {...a11yProps(1)} />
          <Tab label="Starred Properties" {...a11yProps(2)} />
          <Tab label="My Details" {...a11yProps(3)} />
        </Tabs>
      </div>

      <TabPanel value={value} index={0}>
        <MyBids store={store} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyListings store={store} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <StarredProperties store={store} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MyDetails />
      </TabPanel>
    </div>
  );
};
