import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, Grid, Card, Link } from "@material-ui/core";
import Slider from "react-slick";
import { ListingSummary } from "../../util/types/listing";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import BathtubOutlinedIcon from "@material-ui/icons/BathtubOutlined";
import DriveEtaOutlinedIcon from "@material-ui/icons/DriveEtaOutlined";
import { AuctionTag } from "../auction_tag/AuctionTag";
import { ListingCardSmallStyles } from "./ListingCardSmall.css";

export const ListingCardSmall: React.FC<{
  data: ListingSummary;
  style?: React.CSSProperties;
}> = ({ data, style }) => {
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
  } = data;
  const history = useHistory();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const classes = ListingCardSmallStyles();
  return (
    <Card className={classes.card} elevation={2}>
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
        <Link
          onClick={() => history.push(`/listing/${id}`)}
          style={{ textDecoration: "none" }}
        >
          <Typography variant="body1" style={{ textTransform: "capitalize" }}>
            {street}
            {", "}
          </Typography>
          <Typography variant="body2" style={{ textTransform: "capitalize" }}>
            {suburb} <span style={{ textTransform: "uppercase" }}>{state}</span>{" "}
            {postcode}
          </Typography>
        </Link>
        <AuctionTag
          start={auction_start}
          end={auction_end}
          style={{ marginTop: "2px", marginBottom: "2px" }}
        />
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
