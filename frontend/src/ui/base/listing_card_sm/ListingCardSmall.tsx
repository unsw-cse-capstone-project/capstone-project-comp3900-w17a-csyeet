import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, Card, Link } from "@material-ui/core";
import Slider from "react-slick";
import { ListingActual } from "../../util/types/listing";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import BathtubOutlinedIcon from "@material-ui/icons/BathtubOutlined";
import DriveEtaOutlinedIcon from "@material-ui/icons/DriveEtaOutlined";
import { AuctionTag } from "../auction_tag/AuctionTag";
import { Star } from "../star/Star";
import { ListingCardSmallStyles } from "./ListingCardSmall.css";
import { useStore } from "../../../AuthContext";
import { formatAddress } from "../../util/helper";

export const ListingCardSmall = ({
  listing,
  style,
}: {
  listing: ListingActual;
  style?: React.CSSProperties;
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
    starred,
    images,
  } = listing;
  const history = useHistory();
  const userStore = useStore();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { streetAddress, remainingAddress } = formatAddress({
    street,
    suburb,
    state,
    postcode,
  });

  const classes = ListingCardSmallStyles();
  return (
    <Card className={classes.card} elevation={2} style={style}>
      <div className={classes.sliderContainer}>
        <Slider {...settings}>
          {images.map((image, i) => (
            <img
              className={classes.imageContainer}
              src={image}
              key={i}
              alt={"sm-img-" + i}
            />
          ))}
        </Slider>
      </div>
      <div className={classes.cardContent}>
        {userStore?.user && (
          <div className={classes.starContainer}>
            <Star id={id} starred={starred} />
          </div>
        )}
        <Link
          onClick={() => history.push(`/listing/${id}`)}
          className={classes.link}
          color="textPrimary"
        >
          <Typography variant="h6">{streetAddress}</Typography>
          <Typography variant="body1" color="textSecondary">
            {remainingAddress}
          </Typography>
          <AuctionTag
            start={auction_start}
            end={auction_end}
            style={{ marginTop: "2px", marginBottom: "2px" }}
          />
        </Link>
        <div className={classes.panelContainer}>
          <div className={classes.panelContent}>
            <HotelOutlinedIcon className={classes.iconStyle} />
            <Typography>{num_bedrooms}</Typography>
          </div>
          <div className={classes.panelContent}>
            <BathtubOutlinedIcon className={classes.iconStyle} />
            <Typography>{num_bathrooms}</Typography>
          </div>
          <div className={classes.panelContent}>
            <DriveEtaOutlinedIcon className={classes.iconStyle} />
            <Typography>{num_car_spaces}</Typography>
          </div>
        </div>
      </div>
    </Card>
  );
};
