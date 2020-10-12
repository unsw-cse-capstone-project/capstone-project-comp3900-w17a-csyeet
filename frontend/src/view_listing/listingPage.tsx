import * as React from "react";
import { listingPageStyle } from "./listingPage.css";
import { Grid, Typography } from "@material-ui/core";
import { Listing } from "../ui/util/types/listing";
import { ListingFeatureIcon } from "../ui/base/listing_result_card/ListingResultCard";
import { DriveEta, KingBed, Bathtub } from "@material-ui/icons";
import Slider from "react-slick";
import { FacilitiesPanel } from "./facilities_panel/facilitiesPanel";
import { FeaturesPanel } from "./features_panel/featuresPanel";
import { SuburbPanel } from "./suburb_panel/suburbPanel";
import { SellerProfile } from "./seller_profile/sellerProfile";
import { Map } from "./map/map";
import { AuctionDetails } from "./auction_details/auctionDetails";

export const ListingPage = (props: { listing: Listing }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const {
    street,
    suburb,
    postcode,
    state,
    auction_start,
    auction_end,
    num_bathrooms,
    num_bedrooms,
    num_car_spaces,
    type,
    title,
    description
  } = props.listing;

  const classes = listingPageStyle();
  return (
    <div className={classes.page}>
      {/* image */}
      <div className={classes.sliderContainer}>
        <Slider {...settings}>
          {props.listing.images.map((image, i) => (
            <img className={classes.imageContainer} src={image} key={i} />
          ))}
        </Slider>
      </div>
      <Grid container spacing={2}>
        {/* left column */}
        <Grid item xs={8}>
          <Typography
            variant="h4"
            className={classes.street}
            style={{ textTransform: "capitalize" }}
          >
            {street}
          </Typography>
          <Typography variant="h5" style={{ textTransform: "capitalize" }}>
            {suburb}
            {", "}
            <span style={{ textTransform: "uppercase" }}>{state}</span>{" "}
            {postcode}
          </Typography>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="body2" className={classes.description}>
            {description}
          </Typography>

          <FeaturesPanel features={"test features"}></FeaturesPanel>
          <FacilitiesPanel facilities={"test facilities"}></FacilitiesPanel>
          <SuburbPanel suburb={props.listing.suburb}></SuburbPanel>
        </Grid>
        {/* right column */}
        <Grid item xs={4}>
          <div className={classes.detailBar}>
            <ListingFeatureIcon value={num_bedrooms} Icon={KingBed} />
            <ListingFeatureIcon value={num_bathrooms} Icon={Bathtub} />
            <ListingFeatureIcon value={num_car_spaces} Icon={DriveEta} />
          </div>

          <AuctionDetails
            auction_start={props.listing.auction_start}
            auction_end={props.listing.auction_end}
          ></AuctionDetails>

          <Map
            image={
              "https://i0.wp.com/www.cssscript.com/wp-content/uploads/2018/03/Simple-Location-Picker.png?fit=561%2C421&ssl=1"
            }
          ></Map>
          <SellerProfile seller={"Jen Xu"}></SellerProfile>
        </Grid>
      </Grid>
    </div>
  );
};
