import { Card, CardContent, Typography, Link } from "@material-ui/core";
import * as React from "react";
import Slider from "react-slick";
import { ListingActual } from "../../util/types/listing";
import {
  ListingResultCardStyles,
  ListingFeatureIconStyles,
} from "./ListingResultCard.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./test.css";
import { AuctionTag } from "../auction_tag/AuctionTag";
import { DriveEta, LocalHotel, Bathtub } from "@material-ui/icons";
import ReactPlaceholder from "react-placeholder/lib/ReactPlaceholder";
import "react-placeholder/lib/reactPlaceholder.css";
import classNames from "classnames";
import { useHistory, useLocation } from "react-router-dom";
import { Star } from "../star/Star";
import { useStore } from "../../../AuthContext";
import { observer } from "mobx-react";
import { priceFormatter } from "../../util/helper";
import { AuctionActionButton } from "../auction_action_button/AuctionActionButton";

/**
 * Component to display listing results on search
 * @param listing
 * @param style
 * @param className
 */
export const ListingResultCard = observer(
  (props: {
    listing: ListingActual;
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
      description,
      starred,
      registered_bidder,
      highest_bid,
      owner,
      reserve_met,
    } = props.listing;
    const history = useHistory();
    const userStore = useStore();
    const location = useLocation();

    const BidStatus = () => {
      if (
        new Date().getTime() < auction_start.getTime() ||
        highest_bid === null
      ) {
        return null;
      }
      return (
        <Typography variant="body2">
          {new Date().getTime() >= auction_end.getTime()
            ? "Final Bid: "
            : "Current Bid: "}
          <span
            className={classNames(classes.reserve_not_met, {
              [classes["reserve_met"]]: reserve_met,
            })}
          >
            {priceFormatter.format(highest_bid)}
          </span>
        </Typography>
      );
    };
    return (
      <Card
        style={props.style}
        className={classNames(classes.card, props.className)}
        elevation={4}
      >
        <div className={classes.sliderContainer}>
          <Slider {...settings}>
            {props.listing.images.map((image, i) => (
              <img
                className={classes.imageContainer}
                src={image}
                key={i}
                alt={"Property images " + i}
              />
            ))}
          </Slider>
        </div>
        <CardContent className={classes.cardContent}>
          {userStore?.user && (
            <div className={classes.starContainer}>
              <Star id={id} starred={starred} />
            </div>
          )}
          <Link
            onClick={() =>
              history.push({
                pathname: `/listing/${id}`,
                state: { from: location.pathname + location.search },
              })
            }
            style={{ textDecoration: "none" }}
            className={classes.link}
          >
            <Typography
              variant="h4"
              style={{ textTransform: "capitalize" }}
              color="textPrimary"
            >
              {street}
            </Typography>
            <Typography
              variant="h6"
              style={{ textTransform: "capitalize" }}
              color="textSecondary"
            >
              {suburb}
              {", "}
              <span style={{ textTransform: "uppercase" }}>{state}</span>{" "}
              {postcode}
            </Typography>
          </Link>
          <div className={classes.detailBar}>
            <AuctionTag start={auction_start} end={auction_end} />
            <div className={classes.icons}>
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
          </div>
          <Typography variant="body2" className={classes.description}>
            {description}
          </Typography>
          <div style={{ marginTop: "15px" }}>
            <AuctionActionButton
              id={id}
              auction_start={auction_start}
              registered_bidder={registered_bidder}
              isUser={userStore?.user !== undefined}
              isOwner={!!userStore?.user && userStore?.user.id === owner.id}
            />
            <BidStatus />
            {registered_bidder && userStore && userStore.user && (
              <Typography variant="body2">You are registered to bid</Typography>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

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
  size = "small",
}: {
  value: number;
  Icon: React.ComponentType<{
    fontSize?: "small" | "large";
    className?: string;
  }>;
  style?: React.CSSProperties;
  size?: "small" | "large";
}) => {
  const classes = ListingFeatureIconStyles();
  return (
    <div className={classes.container} style={style}>
      <Typography
        variant={size === "large" ? "h6" : "body1"}
        className={classes.text}
      >
        {value}
      </Typography>
      <Icon fontSize={size} className={classes.icon} />
    </div>
  );
};
