import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, Card, Link } from "@material-ui/core";
import Slider from "react-slick";
import { ListingActual } from "../../util/types/listing";
import { AuctionTag } from "../auction_tag/AuctionTag";
import { Star } from "../star/Star";
import { useStore } from "../../../AuthContext";
import { ListingCardAuctionStyles } from "./ListingCardAuction.css";
import { BidPrice } from "../bid_price/BidPrice";
import { formatAddress, priceFormatter } from "../../util/helper";

export const ListingCardAuction = ({
  listing,
  user_bid,
}: {
  listing: ListingActual;
  user_bid: number;
}) => {
  const {
    id,
    street,
    suburb,
    postcode,
    state,
    starred,
    images,
    auction_start,
    auction_end,
    reserve_met,
    highest_bid,
  } = listing;
  const history = useHistory();
  const userStore = useStore();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getState = () => {
    if (highest_bid === 0) return "current";
    if (reserve_met) return "reserve_met";
    return "reserve_not_met";
  };
  const { streetAddress, remainingAddress } = formatAddress({
    street,
    suburb,
    state,
    postcode,
  });

  const classes = ListingCardAuctionStyles();
  return (
    <Card className={classes.card}>
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
      {userStore?.user && (
        <div className={classes.starContainer}>
          <Star id={id} starred={starred} />
        </div>
      )}
      <AuctionTag
        className={classes.auctionTagStyle}
        start={auction_start}
        end={auction_end}
      />
      <div className={classes.cardContent}>
        <Link
          onClick={() => history.push(`/listing/${id}`)}
          className={classes.link}
          color="textPrimary"
        >
          <Typography variant="h6">{streetAddress}</Typography>
          <Typography variant="body1" color="textSecondary">
            {remainingAddress}
          </Typography>
        </Link>
        <div className={classes.bidPriceContent}>
          <BidPrice
            className={classes.bidPriceStyle}
            bid={highest_bid}
            state={getState()}
            textType="h6"
            size="small"
          />
          <Typography>Your bid: {priceFormatter.format(user_bid)}</Typography>
        </div>
      </div>
    </Card>
  );
};
