import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuctionPageStore, AuctionPagePresenter } from "./AuctionPagePresenter";
import { AuctionPage as AuctionPageBase } from "./AuctionPage";
import { observer } from "mobx-react";
import { auctionPageStyle } from "./AuctionPage.css";
import { Snackbar } from "@material-ui/core";
import { BiddingBox, BiddingBoxStore } from "./bidding_box/BiddingBox";
import { BidderTag } from "../ui/base/bidder_tag/BidderTag";
import { useStore } from "../AuthContext";
import { BiddersList } from "./bidders_list/BiddersList";
import { BidsList } from "./bids_list/BidsList";
import { computed, action } from "mobx";
import MuiAlert from "@material-ui/lab/Alert";
import { BackButton } from "../ui/base/back_button/BackButton";
import { ErrorPage } from "../error/main";
import { AuctionPagePlaceholder } from "./AuctionPagePlaceholder";

/**
 * Auction Page where users can view information about an auction like
 * viewing bidding history and make bids
 */
export const AuctionPage = () => {
  const { id } = useParams<{ id: string }>();
  const store = new AuctionPageStore();
  const presenter = new AuctionPagePresenter();
  presenter.loadInformation(store, parseInt(id));
  return (
    <AuctionPageWrapper
      store={store}
      id={parseInt(id)}
      onPlaceBid={(bid: number, onSuccess: () => void) =>
        presenter.placeBid(store, bid, onSuccess)
      }
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
    onPlaceBid(bid: number, onSuccess: () => void): void;
  }) => {
    if (!store.loadingState) {
      return null;
    }
    const userStore = useStore();
    const Container = observer(
      ({ Content }: { Content: React.ComponentType }) => {
        const classes = auctionPageStyle();
        const history = useHistory();
        return (
          <div className={classes.page} style={{ paddingBottom: "200px" }}>
            <BackButton
              onClick={() => history.push(`/listing/${id}`)}
              text="Back to Listing"
            />
            <Content />
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={store.bidMakingStatus === "error"}
              autoHideDuration={2000}
              onClose={action(() => (store.bidMakingStatus = undefined))}
            >
              <MuiAlert elevation={6} severity="error">
                Error occurred while placing bid, please try again
              </MuiAlert>
            </Snackbar>
          </div>
        );
      }
    );

    if (store.loadingState === "loading") {
      const Content = () => <AuctionPagePlaceholder />;
      return <Container Content={Content} />;
    }

    if (store.loadingState === "error" || !store.listing) {
      return <ErrorPage />;
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
          shouldDisableBiddingButton={computed(
            () => store.bidMakingStatus === "submitting"
          )}
          enableBidding={
            new Date().getTime() >= listing.auction_start.getTime() &&
              listing.registered_bidder &&
              userStore ?.user !== undefined
          }
          isAuctionClosed={
            listing.auction_end.getTime() <= new Date().getTime()
          }
          bidState={
            bids.length !== 0
              ? bids[0].reserve_met
                ? "reserve_met"
                : "reserve_not_met"
              : "current"
          }
          BidderTag={
            bids.length !== 0
              ? () => <BidderTag bidderNumber={bids[0].bidder_id} />
              : undefined
          }
          onPlaceBid={onPlaceBid}
          style={{ height: "100%" }}
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

    const BiddersListWrapper = observer(() => (
      <BiddersList
        bidders={Array.from(new Set(bids.map((bid) => bid.bidder_id)))}
        currentUser={userStore ?.user ?.id}
      />
    ));

    const Content = () => {
      return (
        <AuctionPageBase
          address={{ street, postcode, state, country, suburb }}
          auction_start={auction_start}
          auction_end={auction_end}
          mainImage={images[0]}
          BiddingBox={BiddingBoxWrapper}
          BidsList={() => <BidsList bids={bids} />}
          BiddersList={BiddersListWrapper}
        />
      );
    };

    return <Container Content={Content} />;
  }
);
