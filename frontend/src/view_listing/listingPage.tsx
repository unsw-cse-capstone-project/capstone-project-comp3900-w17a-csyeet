import * as React from "react";
import { listingPageStyle } from "./listingPage.css";
import {
  Grid,
  Typography,
  Modal,
  Paper,
  Badge,
  Button,
} from "@material-ui/core";
import { ListingActual } from "../ui/util/types/listing";
import { ListingFeatureIcon } from "../ui/base/listing_result_card/ListingResultCard";
import { DriveEta, KingBed, Bathtub } from "@material-ui/icons";
import Slider from "react-slick";
import { FacilitiesPanel } from "./facilities_panel/facilitiesPanel";
import { FeaturesPanel } from "./features_panel/featuresPanel";
import { SuburbPanel } from "./suburb_panel/suburbPanel";
import { SellerProfile } from "./seller_profile/sellerProfile";
import { Map } from "./map/map";
import { AuctionDetails } from "./auction_details/auctionDetails";
import { AddressHeading } from "../ui/base/address_heading/AddressHeading";
import { Star } from "../ui/base/star/Star";
import { useStore } from "../AuthContext";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";

export const ListingPage = observer(
  ({
    disableActions = false,
    listing,
    SuburbPanelContent,
  }: {
    disableActions?: boolean;
    listing: ListingActual;
    SuburbPanelContent: React.ComponentType;
  }) => {
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
      type,
      title,
      description,
      features,
      starred,
      registered_bidder,
      landmarks,
      owner,
    } = listing;

    const classes = listingPageStyle();
    const [open, setOpen] = React.useState(false);
    const userStore = useStore();
    const history = useHistory();

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    return (
      <div style={{ paddingBottom: "200px" }}>
        <AddressHeading
          street={street}
          suburb={suburb}
          state={state}
          postcode={postcode}
        />
        {/* first three images */}
        <Paper elevation={0} className={classes.greyBackground}>
          {userStore?.user && userStore?.user.id !== owner.id && (
            <div className={classes.starContainer}>
              <Star id={id} starred={starred} />
            </div>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Badge
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                className={classes.badge}
                badgeContent={
                  <Typography variant="body1">
                    {type[0].toUpperCase() + type.slice(1)}
                  </Typography>
                }
                color="secondary"
              >
                <img
                  src={listing.images[0]}
                  onClick={handleOpen}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt={`Property view 1`}
                />
              </Badge>
            </Grid>
            <Grid item xs={12} md={4} className={classes.photoGrid}>
              <img
                src={listing.images[1]}
                onClick={handleOpen}
                alt={`Property view 2`}
              />
              <img
                src={listing.images[2]}
                onClick={handleOpen}
                alt={`Property view 3`}
              />
            </Grid>
          </Grid>
        </Paper>
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
              {listing.images.map((image, i) => (
                <img
                  className={classes.imageContainer}
                  src={image}
                  key={i}
                  alt={`Property view ${i}`}
                />
              ))}
            </Slider>
          </div>
        </Modal>

        {/* image slideshow*/}
        <div className={classes.detailBar}>
          <ListingFeatureIcon
            size="large"
            value={num_bedrooms}
            Icon={KingBed}
          />
          <ListingFeatureIcon
            size="large"
            value={num_bathrooms}
            Icon={Bathtub}
          />
          <ListingFeatureIcon
            size="large"
            value={num_car_spaces}
            Icon={DriveEta}
          />
        </div>
        <Grid container spacing={2}>
          {/* left column */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" className={classes.title}>
              {title}
            </Typography>
            <Typography variant="body2" className={classes.description}>
              {description}
            </Typography>

            <FeaturesPanel features={features} />
            <FacilitiesPanel
              facilities={landmarks}
              isPreview={disableActions}
            />
            <SuburbPanel listing={listing} Content={SuburbPanelContent} />
          </Grid>
          {/* right column */}
          <Grid item xs={12} md={4}>
            <AuctionDetails
              auction_start={auction_start}
              auction_end={auction_end}
              id={id}
              disableAction={disableActions}
              registered_bidder={registered_bidder}
              isUser={userStore?.user !== undefined}
            />
            <Map listing={listing}></Map>
            <SellerProfile id={owner.id} name={owner.name} email={owner.email}>
              {userStore?.user?.id !== owner.id ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    history.push(
                      `/messages?to=${owner.id}&name=${owner.name}&email=${owner.email}&listing=${id}`
                    )
                  }
                >
                  Send Message
                </Button>
              ) : undefined}
            </SellerProfile>
          </Grid>
        </Grid>
      </div>
    );
  }
);
