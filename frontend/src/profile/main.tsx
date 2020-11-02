import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Avatar, Typography, Tab, Tabs } from "@material-ui/core";
import { ProfilePageStyles } from "./ProfilePage.css";
import { AboutMePage as AboutMe } from "./about/AboutMePage";
import { MyBidsPage as MyBids } from "./bids/MyBidsPage";
import { MyDetailsPage as MyDetails } from "./details/MyDetailsPage";
import { MyListingsPage as MyListings } from "./listings/MyListingsPage";
import { StarredPropertiesPage as StarredProperties } from "./starred/StarredPropertiesPage";

export function ProfilePage() {
  const classes = ProfilePageStyles();
  return (
    <div>
      <div className={classes.userInfo}>
        <Avatar
          src="https://miro.medium.com/max/2560/1*gBQxShAkxBp_YPb14CN0Nw.jpeg"
          className={classes.avatar}
        ></Avatar>
        <Typography variant="h4">Jennifer Xu</Typography>
        <Typography variant="body1">jennifer@example.com</Typography>
      </div>
      <div>
        <ScrollableTabsButtonAuto />
      </div>
    </div>
  );
}

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

function ScrollableTabsButtonAuto() {
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
          <Tab label="About Me" {...a11yProps(0)} />
          <Tab label="My Bids" {...a11yProps(1)} />
          <Tab label="My Listings" {...a11yProps(2)} />
          <Tab label="Starred Properties" {...a11yProps(3)} />
          <Tab label="My Details" {...a11yProps(4)} />
        </Tabs>
      </div>

      <TabPanel value={value} index={0}>
        <AboutMe />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyBids />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MyListings />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <StarredProperties />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <MyDetails />
      </TabPanel>
    </div>
  );
}
