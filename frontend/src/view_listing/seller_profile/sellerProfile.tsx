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
import { sellerProfileStyle } from "./sellerProfile.css";
import { ListingActual } from "../../ui/util/types/listing";
import { getListingFromResult, toCapitaliseCase } from "../../ui/util/helper";
import { ListingCardSmall, ListingCardSmallPlaceholder } from '../../ui/base/listing_card_sm/ListingCardSmall';

export const SellerProfile = ({
  id,
  name,
  email,
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
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [blurb, setBlurb] = React.useState<string | undefined>(undefined);
  const [listings, setListings] = React.useState<ListingActual[] | undefined>(
    undefined
  );

  React.useEffect(() => {
    getInfoFromProfile(id).then((r) => {
      // console.log("r.listings", r.listings);
      // setBlurb(r.blurb);
      // setListings(r.listings);
    });
  }, [id]);

  return (
    <div>
      <Typography variant="h5" className={classes.header}>
        Seller
      </Typography>
      <Divider className={classes.divider} />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar src={avatar} />
        <Typography variant="body1" style={{ paddingLeft: "10px" }}>
          <Link onClick={handleClickOpen}>{name}</Link>
        </Typography>
      </div>
      {children}
      <ProfileDialog
        blurb={blurb}
        listings={listings}
        name={name}
        open={open}
        onClose={handleClose}
        avatar={avatar}
      />
    </div>
  );
};

function ProfileDialog(props: {
  listings: ListingActual[] | undefined;
  name: string;
  blurb: string | undefined;
  open: boolean;
  onClose: () => void;
  avatar: string;
}) {
  const classes = sellerProfileStyle();
  const capitalName = toCapitaliseCase(props.name);
  return (
    <Dialog
      fullWidth={true}
      maxWidth={"lg"}
      onClose={props.onClose}
      aria-labelledby="profile-dialog-title"
      open={props.open}
    >
      <DialogTitle id="profoile-dialog-title">Seller Profile</DialogTitle>
      <DialogContent dividers>
        <div className={classes.about}>
          <Avatar src={props.avatar} className={classes.modalImage} />
          <div className={classes.meta}>
            <Typography className={classes.name} variant="h3">
              {capitalName}
            </Typography>
            <Typography variant="body1">
              {!props.blurb ? "I love houses!" : props.blurb}
            </Typography>
          </div>
        </div>
        <div className={classes.listingTitle}>
          <Typography variant="h5">{capitalName}{"'s"} Listings:</Typography>
        </div>
        <div className={classes.listings}>
          {!props.listings ? (
            <div style={{ textAlign: "center" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <ListingCardSmallPlaceholder />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <ListingCardSmallPlaceholder />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <ListingCardSmallPlaceholder />
                </Grid>
              </Grid>
            </div>
          ) : (
              <div>
                <Grid container spacing={3}>
                  {props.listings.map((listing, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
                      <ListingCardSmall listing={listing} />
                    </Grid>
                  ))}
                </Grid>
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const getInfoFromProfile = async (user_id: number) => {
  const response = await fetch(`/users/${user_id}/profile`);
  const result = await response.json();

  type Info = {
    blurb: string;
    listings: ListingActual[];
  };

  const obj: Info = {
    blurb: "",
    listings: [],
  };

  if ("detail" in result) {
    return obj;
  }

  const profileInfo: Info = {
    blurb: result.blurb,
    listings: result.listings.map((result: any) =>
      getListingFromResult(result)
    ),
  };

  return profileInfo;
};
