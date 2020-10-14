import * as React from "react";
import { listingPageStyle } from "./listingPage.css";
import { Grid, Typography, Modal } from "@material-ui/core";
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
    slidesToScroll: 1,
  };
  const {
    id,
    street,
    suburb,
    postcode,
    state,
    auction_start,
    auction_end,
    num_bathrooms,
    num_bedrooms,
    num_car_spaces,
    // type, (Jenn) Commented out to get rid of warning
    title,
    description,
  } = props.listing;

  const classes = listingPageStyle();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.page} style={{ paddingBottom: "200px" }}>
      {/* first three images */}
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <img
            alt="prop-img-0"
            src={props.listing.images[0]}
            onClick={handleOpen}
            style={{ width: "100%", height: "100%" }}
          ></img>
        </Grid>
        <Grid item xs={5}>
          <img
            alt="prop-img-1"
            src={props.listing.images[1]}
            onClick={handleOpen}
            style={{ width: "100%", height: "50%" }}
          ></img>
          <img
            alt="prop-img-2"
            src={props.listing.images[2]}
            onClick={handleOpen}
            style={{ width: "100%", height: "50%" }}
          ></img>
        </Grid>
      </Grid>

      {/* image slideshow */}
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.sliderContainer}>
          <Slider {...settings}>
            {props.listing.images.map((image, i) => (
              <img
                alt="slider-prop-img"
                className={classes.imageContainer}
                src={image}
                key={i}
              />
            ))}
          </Slider>
        </div>
      </Modal>

      {/* image slideshow*/}

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
            auction_start={auction_start}
            auction_end={auction_end}
            id={id}
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
