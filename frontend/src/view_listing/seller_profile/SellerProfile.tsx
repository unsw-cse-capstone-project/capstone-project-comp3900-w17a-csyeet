import * as React from "react";
import {
  Typography,
  Divider,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Grid,
} from "@material-ui/core";
import { sellerProfileStyle } from "./SellerProfile.css";
import { ListingActual } from "../../ui/util/types/listing";
import { getListingFromResult, toCapitaliseCase } from "../../ui/util/helper";
import { ListingCardSmall } from "../../ui/base/listing_card_sm/ListingCardSmall";
import { ListingCardSmallLoadingRow } from "../../ui/base/loading_state/ListingCardSmallLoadingRow";

/**
 * Seller profile details information about a specific seller including
 * their name, blurb and list of their listings
 */
export const SellerProfile = ({
  id,
  name,
  children,
  avatar,
}: {
  id: number;
  name: string;
  email: string;
  children?: JSX.Element;
  avatar: string;
}) => {
  const classes = sellerProfileStyle();
  const [open, setOpen] = React.useState(false);
  const [blurb, setBlurb] = React.useState<string | undefined>(undefined);
  const [listings, setListings] = React.useState<ListingActual[] | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (open !== false) {
      getInfoFromProfile(id).then((r) => {
        setBlurb(r.blurb);
        setListings(r.listings);
      });
    }
  }, [id, open]);

  return (
    <div>
      <Typography variant="h5" className={classes.header}>
        Seller
      </Typography>
      <Divider className={classes.divider} />
      <div className={classes.summaryInfo}>
        <div className={classes.avatarContainer}>
          <Avatar className={classes.largeAvatar} src={avatar} />
        </div>
        <Typography variant="h6" className={classes.displayname}>
          <Link onClick={() => setOpen(true)}>{name}</Link>
        </Typography>
        {children}
      </div>
      <ProfileDialog
        blurb={blurb}
        listings={listings}
        name={name}
        open={open}
        onClose={() => setOpen(false)}
        avatar={avatar}
      />
    </div>
  );
};

const ProfileDialog = (props: {
  listings: ListingActual[] | undefined;
  name: string;
  blurb: string | undefined;
  open: boolean;
  onClose: () => void;
  avatar: string;
}) => {
  const classes = sellerProfileStyle();
  const capitalName = toCapitaliseCase(props.name);
  return (
    <Dialog fullWidth maxWidth={"lg"} onClose={props.onClose} open={props.open}>
      <DialogTitle>Seller Profile</DialogTitle>
      <DialogContent dividers>
        <div className={classes.about}>
          <Avatar src={props.avatar} className={classes.modalImage} />
          <Typography className={classes.name} variant="h4" align="center">
            {capitalName}
          </Typography>
          {!!props.blurb && (
            <Typography variant="body1" color="textSecondary" align="center">
              {props.blurb}
            </Typography>
          )}
        </div>
        <Typography variant="h6" className={classes.listingTitle}>
          {capitalName}
          {"'s"} Listings:
        </Typography>
        <div className={classes.listings}>
          {!props.listings ? (
            <ListingCardSmallLoadingRow />
          ) : (
            <Grid container spacing={3}>
              {props.listings.map((listing, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
                  <ListingCardSmall listing={listing} />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const getInfoFromProfile = async (user_id: number) => {
  try {
    const response = await fetch(`/users/${user_id}/profile`);
    const result = await response.json();

    if ("detail" in result) {
      return {
        blurb: "",
        listings: [],
      };
    }

    return {
      blurb: result.blurb,
      listings: result.listings.map((result: any) =>
        getListingFromResult(result)
      ),
    };
  } catch {
    return {
      blurb: "",
      listings: [],
    };
  }
};
