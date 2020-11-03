import * as React from "react";
import { observer } from "mobx-react";
import { Avatar, Typography, Tab, Tabs, Grid } from "@material-ui/core";
import { ProfilePageStyles } from "./ProfilePage.css";
import { MyBidsPage as MyBids } from "./bids/MyBidsPage";
import { DetailsPage as MyDetails } from "./details/DetailsPage";
import { MyListingsPage as MyListings } from "./listings/MyListingsPage";
import { StarredPropertiesPage as StarredProperties } from "./starred/StarredPropertiesPage";
import { Blurb } from "./about/Blurb";
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
    />
  );
};

export const ProfilePageWrapper = observer(
  ({
    store,
    onEditBlurb,
  }: {
    store: ProfileStore;
    onEditBlurb: (blurb: string) => void;
  }) => {
    const classes = ProfilePageStyles();
    const userStore = useStore();
    if (!userStore || !userStore.user) {
      return null;
    }

    return (
      <div>
        <div className={classes.userInfoContainer}>
          {/* (jenn) Grid is half half, can adjust later :) */}
          <Grid
            container
            spacing={1}
            direction={"row"}
            justify={"flex-start"}
            alignItems={"center"}
          >
            <Grid item>
              <Avatar
                src="https://miro.medium.com/max/2560/1*gBQxShAkxBp_YPb14CN0Nw.jpeg"
                className={classes.avatar}
              ></Avatar>
              <Typography variant="h4">{userStore.user.name}</Typography>
              <Typography variant="body1">{userStore.user.email}</Typography>
            </Grid>
            <Grid item xs={7}>
              <Blurb
                className={classes.blurbStyle}
                blurb={store.blurb}
                onEdit={onEditBlurb}
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <ProfileTabs store={store} />
        </div>
      </div>
    );
  }
);

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

function ProfileTabs({ store }: { store: ProfileStore }) {
  const classes = ProfilePageStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
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
          <Tab label="My Bids" {...a11yProps(1)} />
          <Tab label="My Listings" {...a11yProps(2)} />
          <Tab label="Starred Properties" {...a11yProps(3)} />
          <Tab label="My Details" {...a11yProps(4)} />
        </Tabs>
      </div>

      <TabPanel value={value} index={1}>
        <MyBids store={store} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MyListings store={store} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <StarredProperties store={store} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <MyDetails />
      </TabPanel>
    </div>
  );
}
