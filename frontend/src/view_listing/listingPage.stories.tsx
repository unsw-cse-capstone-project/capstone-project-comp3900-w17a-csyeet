import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { ListingPage } from "./listingPage";
import { createFakeActualListing } from "../ui/util/fakes/listing";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { ListingActual } from '../ui/util/types/listing';

export default {
  title: "view_listing/listingPage",
  component: ListingPage,
  argTypes: {
    listing: {
      defaultValue: createFakeActualListing(),
    },
    auction_start: {
      control: {
        type: "date",
      },
      defaultValue: createFakeActualListing().auction_start,
    },
    auction_end: {
      control: {
        type: "date",
      },
      defaultValue: createFakeActualListing().auction_end,
    },
  },
} as Meta;

const listingPageStyle = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      padding: theme.spacing(2, "15%", 0, "15%"),
      display: "flex",
      flexDirection: "column",
    },
  }));

export const Overview = (props: {
  auction_start: string;
  auction_end: string;
  listing: ListingActual;
}) => {
  const classes = listingPageStyle();
  props.listing.auction_start = new Date(props.auction_start);
  props.listing.auction_end = new Date(props.auction_end);
  return <div className={classes.page}>
    <ListingPage
      listing={props.listing}
      SuburbPanelContent={() => <div>hello</div>}
    />
  </div>
};
