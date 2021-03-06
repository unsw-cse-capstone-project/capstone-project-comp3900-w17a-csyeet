import Button from "@material-ui/core/Button/Button";
import * as React from "react";
import { useHistory } from "react-router-dom";

/**
 * Component that determines what action can be done
 * given auction_start and registered_bidder
 * @param id
 * @param auction_start
 * @param registered_bidder
 * @param isUser
 * @param isOwner
 */
export const AuctionActionButton = ({
  id,
  auction_start,
  registered_bidder,
  isUser,
  isOwner,
}: {
  id: number;
  auction_start: Date;
  registered_bidder: boolean;
  isUser: boolean;
  isOwner: boolean;
}) => {
  const history = useHistory();
  const viewAuctionButton = (
    <Button
      variant="outlined"
      color="primary"
      style={{ marginTop: "8px" }}
      onClick={() => history.push(`/listing/${id}/auction`)}
    >
      View Auction
    </Button>
  );
  const registerButton = (
    <Button
      variant="outlined"
      color="primary"
      style={{ marginTop: "8px" }}
      onClick={() => history.push(`/listing/${id}/register`)}
    >
      Register to Bid
    </Button>
  );
  if (new Date().getTime() < auction_start.getTime() && !isOwner) {
    if (isUser && registered_bidder) {
      return viewAuctionButton;
    } else {
      return registerButton;
    }
  } else {
    return viewAuctionButton;
  }
};
