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
import { priceFormatter } from "../../util/helper";
import { formatAddress } from "../../util/helper";
import { Bid } from "../../util/types/bid";

export const ListingCardAuction = ({
  listing,
  onStar,
  onUnstar,
  style,
}: {
  listing: ListingActual;
  style?: React.CSSProperties;
  onStar?: () => void;
  onUnstar?: () => void;
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
    if (highest_bid === null) return "current";
    if (reserve_met) return "reserve_met";
    else return "reserve_not_met";
  };

  const { streetAddress, remainingAddress } = formatAddress({
    street,
    suburb,
    state,
    postcode,
  });

  const [userBid, setUserBid] = React.useState<number | undefined>(undefined);

  // Get user bid
  React.useEffect(() => {
    const user_id = userStore?.user?.id || 0;
    getBidFromAuction(id, user_id).then((r) => {
      setUserBid(r);
    });
  }, [id, userStore]);
  const classes = ListingCardAuctionStyles();
  return (
    <Card className={classes.card} style={style}>
      <div className={classes.cardContent}>
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
        <AuctionTag
          className={classes.auctionTagStyle}
          start={auction_start as Date}
          end={auction_end as Date}
          style={{ marginTop: "2px", marginBottom: "2px" }}
        />
        <div className={classes.cardContent}>
          {userStore?.user && (
            <div className={classes.starContainer}>
              <Star
                id={id}
                starred={starred}
                onStar={onStar}
                onUnstar={onUnstar}
              />
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
          </Link>
          <div className={classes.bidPriceContent}>
            <BidPrice
              className={classes.bidPriceStyle}
              bid={highest_bid as number}
              state={getState()}
              textType={"h6"}
              style={{ marginTop: "5px" }}
            />
            {getState() !== "current" && (
              <Typography
                style={{
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                {!userBid
                  ? "Loading..."
                  : `Your Bid: ${priceFormatter.format(userBid)}`}
              </Typography>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

async function getBidFromAuction(auction_id: Number, user_id: Number) {
  const response = await fetch(`/listings/${auction_id}/auction`);
  const content = await response.json();

  if ("detail" in content) {
    return -1;
  } else {
    let bids = content.bids;
    let return_bid = -1;
    bids.forEach((bid: Bid) => {
      if (bid.bidder_id === user_id) {
        console.log("returning bid:", bid.bid);
        return_bid = bid.bid;
      }
    });
    return return_bid;
  }
}
