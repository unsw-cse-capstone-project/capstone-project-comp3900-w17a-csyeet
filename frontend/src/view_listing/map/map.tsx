import * as React from "react";
import { Typography, Divider } from "@material-ui/core";
import { mapStyle } from "./map.css";
import { ListingActual } from "../../ui/util/types/listing";

const googleAPIKey = "AIzaSyDS3k251uCtXDMWqcyD2wA9vkIg40sd9Lg";

/**
 * Map generated from Google using the listing's address
 */
export const Map = ({ listing }: { listing: ListingActual }) => {
  const classes = mapStyle();
  return (
    <div>
      <Typography variant="h5" className={classes.header}>
        Map
      </Typography>
      <Divider className={classes.divider} />
      <div className={classes.mapContainer}>
        <iframe
          title="map"
          frameBorder="0"
          className={classes.map}
          src={`https://www.google.com/maps/embed/v1/place?key=${googleAPIKey}&q=${listing.street.replace(
            /[ ]/g,
            "+"
          )},+${listing.suburb}+${listing.state}`}
        />
      </div>
    </div>
  );
};
