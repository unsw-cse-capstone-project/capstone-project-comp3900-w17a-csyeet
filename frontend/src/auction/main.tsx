import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuctionPageStore, AuctionPagePresenter } from "./AuctionPagePresenter";
import { AuctionPage as AuctionPageBase } from "./AuctionPage";
import { observer } from "mobx-react";
import { auctionPageStyle } from "./AuctionPage.css";
import { Button, Typography, useTheme } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import { BiddingBox, BiddingBoxStore } from "./bidding_box/BiddingBox";
import { BidderTag } from "../ui/base/bidder_tag/BidderTag";
import { useStore } from "../AuthContext";
import { Bid } from "../ui/util/types/bid";
import { BiddersList } from "./bidders_list/BiddersList";
import { BidsList } from "./bids_list/BidsList";

export const AuctionPage = () => {
  const { id } = useParams<{ id: string }>();
  const store = new AuctionPageStore();
  const presenter = new AuctionPagePresenter();
  presenter.loadInformation(store, parseInt(id));
  return (
    <AuctionPageWrapper
      store={store}
      id={parseInt(id)}
      onPlaceBid={(bid: Bid) => presenter.placeBid(store, bid)}
    />
  );
};

export const AuctionPageWrapper = observer(
  ({
    store,
    id,
    onPlaceBid,
  }: {
    store: AuctionPageStore;
    id: number;
    onPlaceBid(bid: Bid): void;
  }) => {
    if (!store.loadingState) {
      return null;
    }

    const userStore = useStore();
    const Container = ({ Content }: { Content: React.ComponentType }) => {
      const classes = auctionPageStyle();
      const history = useHistory();
      return (
        <div className={classes.page} style={{ paddingBottom: "200px" }}>
          <Button
            className={classes.backButton}
            onClick={() => history.push(`/listing/${id}`)}
          >
            <ArrowBackIos />
            Back to Listing
          </Button>
          <Content />
        </div>
      );
    };

    if (store.loadingState === "loading") {
      const Content = () => <Typography>Loading...</Typography>;
      return <Container Content={Content} />;
    }

    if (store.loadingState === "error" || !store.listing) {
      const theme = useTheme();
      const Content = () => (
        <Typography
          style={{ textAlign: "center", color: theme.palette.error.main }}
        >
          Error loading the auction
        </Typography>
      );
      return <Container Content={Content} />;
    }
    const biddingBoxStore = new BiddingBoxStore();
    const { bids } = store;
    const BiddingBoxWrapper = observer(() => {
      const { listing, bids } = store;
      if (!listing || !bids) {
        return null;
      }
      return (
        <BiddingBox
          store={biddingBoxStore}
          currentBid={bids.length !== 0 ? bids[0].bid : undefined}
          enableBidding={
            new Date().getTime() >= listing.auction_start.getTime() &&
            userStore?.user !== undefined
          } // TODO add a check
          isAuctionClosed={
            listing.auction_end.getTime() <= new Date().getTime()
          }
          bidState={
            bids.length !== 0
              ? bids[0].bid >= 5000000
                ? "reserve_met"
                : "reserve_not_met"
              : "current"
          }
          BidderTag={() => <BidderTag bidderNumber={1234} />}
          onPlaceBid={(price: number) =>
            onPlaceBid({
              bid: price,
              bidder_id: userStore?.user?.id as number,
              listing_id: id,
              submitted: new Date(),
            })
          }
        />
      );
    });
    const {
      street,
      postcode,
      state,
      country,
      suburb,
      auction_start,
      auction_end,
      images,
    } = store.listing;
    const Content = () => {
      return (
        <AuctionPageBase
          address={{ street, postcode, state, country, suburb }}
          auction_start={auction_start}
          auction_end={auction_end}
          mainImage={images[0]}
          BiddingBox={BiddingBoxWrapper}
          BidsList={() => (
            <BidsList bids={bids} reserve_price={5000000} />
          )}
          BiddersList={() => (
            <BiddersList
              bidders={Array.from(new Set(bids.map((bid) => bid.bidder_id)))}
              currentUser={userStore?.user?.id as number}
            />
          )}
        />
      );
    };

    return <Container Content={Content} />;
  }
);
