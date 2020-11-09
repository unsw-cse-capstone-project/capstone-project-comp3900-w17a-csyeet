import * as React from "react";
import { listingPageStyle } from "./ListingPage.css";
import {
  Grid,
  Typography,
  Modal,
  Paper,
  Badge,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { ListingActual } from "../ui/util/types/listing";
import { ListingFeatureIcon } from "../ui/base/listing_result_card/ListingResultCard";
import { DriveEta, KingBed, Bathtub } from "@material-ui/icons";
import { LandmarksPanel } from "./facilities_panel/LandmarksPanel";
import { SuburbPanel } from "./suburb_panel/SuburbPanel";
import { SellerProfile } from "./seller_profile/SellerProfile";
import { Map } from "./map/map";
import { AuctionDetails } from "./auction_details/AuctionDetails";
import { AddressHeading } from "../ui/base/address_heading/AddressHeading";
import { Star } from "../ui/base/star/Star";
import { useStore } from "../AuthContext";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { FeaturesPanel } from "./features_panel/FeaturesPanel";
import { Carousel } from "../ui/base/carousel/Carousel";

/**
 * Listing Page Content
 */
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
      images,
      registered_bidder,
      landmarks,
      owner,
    } = listing;

    const classes = listingPageStyle();
    const [open, setOpen] = React.useState(false);
    const userStore = useStore();
    const history = useHistory();

    return (
      <div className={classes.content}>
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
          <ImageSection
            images={images}
            onClick={() => setOpen(true)}
            type={type}
          />
        </Paper>
        {/* image slideshow */}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          className={classes.modal}
        >
          <div className={classes.sliderContainer}>
            <Carousel
              images={listing.images}
              imageClass={classes.imageContainer}
            />
          </div>
        </Modal>

        {/* image slideshow */}
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
            <Typography variant="h4" className={classes.title}>
              {title}
            </Typography>
            <Typography variant="body1" className={classes.description}>
              {description}
            </Typography>
            <FeaturesPanel features={features} />
            <LandmarksPanel facilities={landmarks} isPreview={disableActions} />
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
            <Map listing={listing} />
            <SellerProfile
              id={owner.id}
              name={owner.name}
              email={owner.email}
              avatar={`/users/${owner.id}/avatar`}
            >
              {userStore?.user?.id !== owner.id &&
              new Date().getTime() < auction_end.getTime() ? (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                  onClick={() =>
                    history.push(`/messages?to=${id}`)
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

/**
 * Image grid
 */
const ImageSection = ({
  images,
  type,
  onClick,
}: {
  images: string[];
  type: string;
  onClick: () => void;
}) => {
  const classes = makeStyles((theme: Theme) =>
    createStyles({
      badge: {
        "& span": {
          padding: theme.spacing(2),
          borderRadius: "10000px",
          transform: "translate(10%, 40%)",
          boxShadow: theme.shadows[1],
        },
        width: "100%",
        height: "100%",
      },
      photoGrid: {
        [theme.breakpoints.up("md")]: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
        [theme.breakpoints.down("sm")]: {
          display: "flex",
          justifyContent: "space-between",
        },
        "& img": {
          objectFit: "cover",
          [theme.breakpoints.up("md")]: {
            width: "100%",
            height: "49%",
          },
          [theme.breakpoints.down("sm")]: {
            width: "49%",
          },
        },
      },
      bigImage: { width: "100%", height: "100%", objectFit: "cover" },
    })
  )();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={images.length > 2 ? 8 : 12}>
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
            src={images[0]}
            onClick={onClick}
            className={classes.bigImage}
            alt={`Property view 1`}
          />
        </Badge>
      </Grid>
      {images.length > 2 && (
        <Grid item xs={12} md={4} className={classes.photoGrid}>
          <img src={images[1]} onClick={onClick} alt={`Property view 2`} />
          <img src={images[2]} onClick={onClick} alt={`Property view 3`} />
        </Grid>
      )}
    </Grid>
  );
};
