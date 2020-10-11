import { Button, Card, CardContent, Typography } from "@material-ui/core";
import * as React from "react";
import Slider from "react-slick";
import { Listing } from "../../util/types/listing";
import {
  ListingResultCardStyles,
  ListingFeatureIconStyles,
} from "./ListingResultCard.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./test.css";
import { AuctionTag } from "../auction_tag/AuctionTag";
import { DriveEta, LocalHotel, Bathtub } from "@material-ui/icons";
import { RectShape, TextBlock } from "react-placeholder/lib/placeholders";
import ReactPlaceholder from "react-placeholder/lib/ReactPlaceholder";
import "react-placeholder/lib/reactPlaceholder.css";
import classNames from "classnames";

export const ListingResultCard = (props: {
  listing: Listing;
  style?: React.CSSProperties;
  className?: string;
}) => {
  const classes = ListingResultCardStyles();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
    description,
  } = props.listing;
  return (
    <Card
      style={props.style}
      className={classNames(classes.card, props.className)}
      elevation={4}
    >
      <div className={classes.sliderContainer}>
        <Slider {...settings}>
          {props.listing.images.map((image, i) => (
            <img className={classes.imageContainer} src={image} key={i} />
          ))}
        </Slider>
      </div>
      <CardContent style={{ width: "100%", boxSizing: "border-box" }}>
        <Typography variant="h4" style={{ textTransform: "capitalize" }}>
          {street}
        </Typography>
        <Typography variant="h6" style={{ textTransform: "capitalize" }}>
          {suburb}
          {", "}
          <span style={{ textTransform: "uppercase" }}>{state}</span> {postcode}
        </Typography>
        <div className={classes.detailBar}>
          <AuctionTag start={auction_start} end={auction_end} />
          <ListingFeatureIcon value={num_bedrooms} Icon={LocalHotel} />
          <ListingFeatureIcon value={num_bathrooms} Icon={Bathtub} />
          <ListingFeatureIcon value={num_car_spaces} Icon={DriveEta} />
          <Typography
            variant="body1"
            style={{ textTransform: "capitalize", marginLeft: "12px" }}
          >
            {type}
          </Typography>
        </div>
        <Typography variant="body2" className={classes.description}>
          {description}
        </Typography>
        {/* TODO(Teresa): add auth check when user context is done */}
        {new Date().getTime() < auction_start.getTime() ? (
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: "15px" }}
          >
            Register to Bid
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: "15px" }}
          >
            View Auction
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export const ListingResultCardLoading = (props: {
  style?: React.CSSProperties;
  className?: string;
}) => {
  const classes = ListingResultCardStyles();
  return (
    <Card
      className={classNames(classes.card, props.className)}
      style={props.style}
    >
      <ReactPlaceholder
        showLoadingAnimation={true}
        type="rect"
        color="#E0E0E0"
        ready={false}
        style={{ width: "100%", height: "300px" }}
        // eslint-disable-next-line react/no-children-prop
        children={null}
      />
      <CardContent style={{ width: "100%", boxSizing: "border-box" }}>
        <ReactPlaceholder
          showLoadingAnimation={true}
          type="text"
          color="#E0E0E0"
          ready={false}
          style={{ width: "100%" }}
          // eslint-disable-next-line react/no-children-prop
          children={null}
          rows={4}
        />
      </CardContent>
    </Card>
  );
};

export const ListingFeatureIcon = ({
  value,
  Icon,
  style,
}: {
  value: number;
  Icon: React.ComponentType;
  style?: React.CSSProperties;
}) => {
  const classes = ListingFeatureIconStyles();
  return (
    <div className={classes.container} style={style}>
      <Typography variant="body1" className={classes.text}>
        {value}
      </Typography>
      <Icon />
    </div>
  );
};
